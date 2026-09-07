//
// Copyright © 2026 OpenSrcs.
//
// Licensed under the Eclipse Public License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License. You may
// obtain a copy of the License at https://www.eclipse.org/legal/epl-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//
// See the License for the specific language governing permissions and
// limitations under the License.
//

import type { MeasureContext, WorkspaceUuid } from '@opensrcs/core'
import type { Express, Request, Response } from 'express'
import type { Subscription as PaddleSubscription } from '@paddle/paddle-node-sdk'

import { AccountClient, SubscriptionType, type Subscription, type SubscriptionData } from '@opensrcs/account-client'
import type { PaymentProvider, SubscribeRequest, CheckoutResponse } from '../index'
import { PaddleClient } from './client'
import { handlePaddleWebhook } from './webhook'
import { transformPaddleSubscriptionToData } from './utils'
import { getPlanKey } from '../../utils'

/**
 * When a cancellation takes effect.
 *
 * Defaults to 'next_billing_period' rather than 'immediately' because the
 * PaymentProvider interface requires uncancelSubscription, and Paddle can only
 * reverse a cancellation while it is still *scheduled*. Cancelling immediately
 * moves the subscription to a terminal state that cannot be reactivated, which
 * would leave uncancelSubscription permanently broken. It also means the
 * customer keeps the access they have already paid for.
 *
 * Set PADDLE_CANCEL_EFFECTIVE_FROM=immediately to cancel and refund at once,
 * accepting that uncancel then fails for those subscriptions.
 */
export type CancelEffectiveFrom = 'immediately' | 'next_billing_period'

/**
 * Check if a subscription has changed by comparing modifiedAt timestamps
 * Returns true if the provider's version is newer than what we have stored
 */
function hasSubscriptionChanged (ourSub: SubscriptionData, newData: SubscriptionData): boolean {
  const ourModifiedAt = ourSub.providerData?.modifiedAt
  const newModifiedAt = newData.providerData?.modifiedAt

  if (newModifiedAt === undefined) {
    return false
  }

  if (ourModifiedAt === undefined) {
    return true
  }

  return newModifiedAt > ourModifiedAt
}

/**
 * Paddle Billing implementation of PaymentProvider
 */
export class PaddleProvider implements PaymentProvider {
  readonly providerName = 'paddle'
  private readonly paddle: PaddleClient
  private readonly webhookSecret: string
  // Map: plan@type (club) -> priceId (Paddle, 'pri_...')
  private readonly subscriptionPlans: Record<string, string>
  private readonly frontUrl: string
  private readonly accountClient: AccountClient
  private readonly cancelEffectiveFrom: CancelEffectiveFrom

  constructor (
    apiKey: string,
    webhookSecret: string,
    subscriptionPlans: string,
    frontUrl: string,
    accountClient: AccountClient,
    useSandbox = false,
    cancelEffectiveFrom: CancelEffectiveFrom = 'next_billing_period'
  ) {
    this.paddle = new PaddleClient(apiKey, useSandbox)
    this.webhookSecret = webhookSecret
    // TODO: support branding
    this.frontUrl = frontUrl.replace(/\/+$/, '')
    this.subscriptionPlans = {}
    this.accountClient = accountClient
    this.cancelEffectiveFrom = cancelEffectiveFrom
    const plans = subscriptionPlans.split(';')
    for (const plan of plans) {
      const [type, priceId] = plan.split(':')
      this.subscriptionPlans[type] = priceId
    }
    // TODO: verify all plans are present in the config - take them from model?
    // hardcoded check for now
    const mustHave = ['common@tier', 'rare@tier', 'epic@tier', 'legendary@tier']
    for (const plan of mustHave) {
      if (this.subscriptionPlans[plan] === undefined) {
        throw new Error(`Missing plan in config: ${plan}`)
      }
    }
  }

  async createSubscription (
    ctx: MeasureContext,
    request: SubscribeRequest,
    workspaceUuid: WorkspaceUuid,
    workspaceUrl: string,
    accountUuid: string
  ): Promise<CheckoutResponse> {
    ctx.info('Creating Paddle subscription', { type: request.type, plan: request.plan })

    const planKey = getPlanKey(request.type, request.plan)
    const priceId = this.subscriptionPlans[planKey]
    if (priceId === undefined) {
      throw new Error(`Missing priceId for plan: ${planKey}`)
    }

    // Paddle appends its own query parameters to the return URL and has no
    // Stripe-style {CHECKOUT_SESSION_ID} placeholder, so the checkout id is
    // carried back through _ptxn, which Paddle sets on redirect.
    const successUrl = `${this.frontUrl}/workbench/${workspaceUrl}/setting/setting/billing/subscriptions?payment=success`

    const response = await this.paddle.createCheckout(ctx, {
      priceId,
      successUrl,
      customerEmail: request.customerEmail,
      customerName: request.customerName,
      metadata: {
        workspaceUuid,
        subscriptionType: request.type,
        subscriptionPlan: request.plan,
        accountUuid
      }
    })

    return {
      checkoutId: response.checkoutId,
      checkoutUrl: response.url
    }
  }

  async getSubscription (ctx: MeasureContext, subscriptionId: string): Promise<SubscriptionData | null> {
    const paddleSubscription = await this.paddle.getSubscription(ctx, subscriptionId)
    return transformPaddleSubscriptionToData(ctx, paddleSubscription)
  }

  async getSubscriptionByCheckout (ctx: MeasureContext, checkoutId: string): Promise<SubscriptionData | null> {
    try {
      // For Paddle the checkout id is a transaction id.
      const transaction = await this.paddle.getTransaction(ctx, checkoutId)

      // A transaction only yields a subscription once it has been paid.
      if (transaction.status !== 'completed' && transaction.status !== 'paid' && transaction.status !== 'billed') {
        ctx.info('Cannot get subscription by checkout: transaction is not complete', {
          checkoutId,
          status: transaction.status
        })
        return null
      }

      const subscriptionId = transaction.subscriptionId
      if (subscriptionId == null) {
        ctx.error('Cannot get subscription by checkout: transaction has no subscription', { checkoutId })
        return null
      }

      const subscription = await this.paddle.getSubscription(ctx, subscriptionId)
      const subscriptionData = transformPaddleSubscriptionToData(ctx, subscription)

      if (subscriptionData === null) {
        ctx.error('Cannot get subscription by checkout: subscription is in irrelevant state', {
          checkoutId,
          subscriptionId
        })
        return null
      }

      ctx.info('Found subscription by checkout', { checkoutId, subscriptionId })
      return subscriptionData
    } catch (err) {
      ctx.error('Failed to get subscription by checkout', { checkoutId, err })
      return null
    }
  }

  async reconcileActiveSubscriptions (ctx: MeasureContext, accountsUrl: string, serviceToken: string): Promise<void> {
    try {
      ctx.info('Starting Paddle active subscription reconciliation')

      const paddleActiveSubscriptions = await this.paddle.getActiveSubscriptions(ctx)
      const ourActiveSubscriptions = await this.accountClient.getSubscriptions()

      const ourSubsByProviderId = new Map(
        ourActiveSubscriptions.map((sub: Subscription) => [sub.providerSubscriptionId, sub])
      )

      const paddleActiveIds = new Set(paddleActiveSubscriptions.map((sub: PaddleSubscription) => sub.id))

      // Step 1: Update subscriptions that exist in Paddle and have changed
      let upsertCount = 0
      for (const paddleSub of paddleActiveSubscriptions) {
        try {
          const subscriptionData = transformPaddleSubscriptionToData(ctx, paddleSub)
          if (subscriptionData === null) {
            continue
          }

          const ourSub = ourSubsByProviderId.get(paddleSub.id)

          // Only upsert if subscription doesn't exist locally or if key fields have changed
          if (ourSub === undefined || hasSubscriptionChanged(ourSub, subscriptionData)) {
            await this.accountClient.upsertSubscription(subscriptionData)
            upsertCount++
          }
        } catch (err) {
          ctx.error('Failed to upsert active subscription', {
            providerSubId: paddleSub.id,
            err
          })
        }
      }

      // Step 2: Check for subscriptions we think are active but Paddle says aren't
      let staleCount = 0
      for (const ourSub of ourActiveSubscriptions) {
        const paddleSubId = ourSub.providerSubscriptionId
        if (!paddleActiveIds.has(paddleSubId)) {
          try {
            const currentState = await this.paddle.getSubscription(ctx, paddleSubId)
            const subscriptionData = transformPaddleSubscriptionToData(ctx, currentState)

            if (subscriptionData !== null) {
              await this.accountClient.upsertSubscription(subscriptionData)
              staleCount++
            }
          } catch (err) {
            ctx.error('Failed to reconcile subscription status', {
              subscriptionId: paddleSubId,
              err
            })
          }
        }
      }

      ctx.info('Paddle subscription reconciliation completed', {
        paddleActiveCount: paddleActiveSubscriptions.length,
        ourActiveCount: ourActiveSubscriptions.length,
        upsertedCount: upsertCount,
        staleUpdatedCount: staleCount
      })
    } catch (err) {
      ctx.error('Paddle subscription reconciliation failed', { err })
      throw err
    }
  }

  async cancelSubscription (ctx: MeasureContext, providerSubscriptionId: string): Promise<SubscriptionData> {
    const paddleSubscription = await this.paddle.cancelSubscription(
      ctx,
      providerSubscriptionId,
      this.cancelEffectiveFrom
    )
    const subscriptionData = transformPaddleSubscriptionToData(ctx, paddleSubscription)

    if (subscriptionData == null) {
      throw new Error(`Failed to cancel subscription ${providerSubscriptionId}`)
    }

    return subscriptionData
  }

  async uncancelSubscription (ctx: MeasureContext, providerSubscriptionId: string): Promise<SubscriptionData> {
    const paddleSubscription = await this.paddle.uncancelSubscription(ctx, providerSubscriptionId)
    const subscriptionData = transformPaddleSubscriptionToData(ctx, paddleSubscription)

    if (subscriptionData == null) {
      throw new Error(`Failed to uncancel subscription ${providerSubscriptionId}`)
    }

    return subscriptionData
  }

  async updateSubscriptionPlan (
    ctx: MeasureContext,
    subscriptionId: string,
    newPlan: string,
    workspaceUrl: string,
    accountUuid: string
  ): Promise<SubscriptionData | CheckoutResponse | null> {
    const currentSub = await this.paddle.getSubscription(ctx, subscriptionId)

    // A free subscription has no card on file, so a plan change has to go
    // through checkout rather than a direct update, as with Stripe.
    const unitAmount = currentSub.items?.[0]?.price?.unitPrice?.amount
    const isFreeSubscription = unitAmount === undefined || Number.parseInt(unitAmount, 10) === 0

    // Subscription updates are always tier type
    const planKey = getPlanKey(SubscriptionType.Tier, newPlan)
    const priceId = this.subscriptionPlans[planKey]
    if (priceId === undefined) {
      throw new Error(`No price configured for plan: ${planKey}`)
    }

    if (isFreeSubscription) {
      const successUrl = `${this.frontUrl}/workbench/${workspaceUrl}/setting/setting/billing/subscriptions?payment=success`
      const customData = (currentSub.customData ?? {}) as Record<string, string | undefined>

      const response = await this.paddle.createCheckout(ctx, {
        priceId,
        successUrl,
        customerId: currentSub.customerId,
        metadata: {
          workspaceUuid: customData.workspaceUuid ?? '',
          subscriptionType: SubscriptionType.Tier,
          subscriptionPlan: newPlan,
          accountUuid
        }
      })

      return {
        checkoutId: response.checkoutId,
        checkoutUrl: response.url
      }
    }

    const updatedSub = await this.paddle.updateSubscription(ctx, subscriptionId, priceId)

    return transformPaddleSubscriptionToData(ctx, updatedSub)
  }

  registerWebhookEndpoints (app: Express, ctx: MeasureContext, accountsUrl: string, serviceToken: string): void {
    ctx.info('Registering Paddle webhook endpoints')

    // Body parsing handled by server middleware (express.raw for /api/v1/webhooks/*)
    app.post('/api/v1/webhooks/paddle', (req: Request, res: Response) => {
      void handlePaddleWebhook(ctx, accountsUrl, serviceToken, this.webhookSecret, this.paddle, req, res)
    })
  }
}
