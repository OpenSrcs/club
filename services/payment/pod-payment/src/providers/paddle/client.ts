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

import { MeasureContext } from '@opensrcs/core'
import {
  Environment,
  Paddle,
  type Subscription as PaddleSubscription,
  type Transaction as PaddleTransaction
} from '@paddle/paddle-node-sdk'
import type { CheckoutResult, CreateCheckoutParams } from './types'

/**
 * Thin wrapper over the Paddle Billing API.
 * Documentation: https://developer.paddle.com/api-reference/overview
 */
export class PaddleClient {
  private readonly paddle: Paddle

  constructor (apiKey: string, useSandbox = false) {
    this.paddle = new Paddle(apiKey, {
      environment: useSandbox ? Environment.sandbox : Environment.production
    })
  }

  /**
   * Create a checkout for a subscription.
   *
   * Paddle has no "checkout session" object like Stripe. You create a
   * transaction, and Paddle attaches a hosted checkout URL to it - but only if
   * a default payment link is configured for the seller account under
   * Checkout > Settings in the Paddle dashboard. Without that,
   * `transaction.checkout.url` comes back null and the only way to complete
   * payment is Paddle.js in the browser, which this server-side contract cannot
   * express. Fail loudly in that case rather than returning an empty URL.
   */
  async createCheckout (ctx: MeasureContext, params: CreateCheckoutParams): Promise<CheckoutResult> {
    return await ctx.with('paddle-create-checkout', {}, async () => {
      // Paddle calls metadata customData, and only accepts string values.
      const customData: Record<string, string> = {
        workspaceUuid: params.metadata.workspaceUuid,
        subscriptionType: params.metadata.subscriptionType,
        subscriptionPlan: params.metadata.subscriptionPlan
      }

      if (params.metadata.accountUuid != null) {
        customData.accountUuid = params.metadata.accountUuid
      }

      const transaction = await this.paddle.transactions.create({
        items: [{ priceId: params.priceId, quantity: 1 }],
        // Set on the transaction AND mirrored onto the subscription Paddle
        // creates from it, which is what the webhook and reconciliation read.
        customData,
        ...(params.customerId !== undefined ? { customerId: params.customerId } : {}),
        checkout: { url: params.successUrl }
      })

      const url = transaction.checkout?.url

      if (url == null || url === '') {
        throw new Error(
          `Paddle returned no checkout URL for transaction ${transaction.id}. ` +
            'Configure a default payment link under Checkout > Settings in the Paddle dashboard.'
        )
      }

      return {
        checkoutId: transaction.id,
        url
      }
    })
  }

  /**
   * Get a transaction by ID. Paddle's transaction is the closest analogue to a
   * Stripe checkout session, and carries the subscription it created.
   */
  async getTransaction (ctx: MeasureContext, transactionId: string): Promise<PaddleTransaction> {
    return await ctx.with('paddle-get-transaction', {}, async () => {
      return await this.paddle.transactions.get(transactionId)
    })
  }

  /**
   * Get a subscription by ID.
   */
  async getSubscription (ctx: MeasureContext, subscriptionId: string): Promise<PaddleSubscription> {
    return await ctx.with('paddle-get-subscription', {}, async () => {
      return await this.paddle.subscriptions.get(subscriptionId)
    })
  }

  /**
   * Get all active (and trialing) subscriptions, following pagination.
   * Used by reconciliation.
   */
  async getActiveSubscriptions (ctx: MeasureContext, customerId?: string): Promise<PaddleSubscription[]> {
    return await ctx.with('paddle-get-active-subscriptions', {}, async () => {
      const collection = this.paddle.subscriptions.list({
        status: ['active', 'trialing'],
        perPage: 100,
        ...(customerId !== undefined ? { customerId: [customerId] } : {})
      })

      const subscriptions: PaddleSubscription[] = []

      // The SDK's Collection is AsyncIterable and handles paging internally,
      // which is safer than driving next() off hasMore - that flag is not
      // meaningful until the first page has been fetched.
      for await (const subscription of collection) {
        subscriptions.push(subscription)
      }

      return subscriptions
    })
  }

  /**
   * Cancel a subscription.
   * `effectiveFrom` is Paddle's choice of immediate vs end-of-period; see the
   * note on PaddleProvider.cancelSubscription for why this is configurable.
   */
  async cancelSubscription (
    ctx: MeasureContext,
    subscriptionId: string,
    effectiveFrom: 'immediately' | 'next_billing_period'
  ): Promise<PaddleSubscription> {
    return await ctx.with('paddle-cancel-subscription', {}, async () => {
      return await this.paddle.subscriptions.cancel(subscriptionId, { effectiveFrom })
    })
  }

  /**
   * Reactivate a subscription that is scheduled to cancel.
   *
   * Paddle has no "uncancel" endpoint. A pending cancellation is represented as
   * a scheduledChange on the subscription, and clearing that change is what
   * reactivates it. This only works while the cancellation is still scheduled -
   * once it takes effect the subscription is terminal and must be recreated.
   */
  async uncancelSubscription (ctx: MeasureContext, subscriptionId: string): Promise<PaddleSubscription> {
    return await ctx.with('paddle-uncancel-subscription', {}, async () => {
      return await this.paddle.subscriptions.update(subscriptionId, { scheduledChange: null })
    })
  }

  /**
   * Move a subscription onto a different price, prorating immediately so the
   * change matches the Stripe provider's behaviour.
   */
  async updateSubscription (
    ctx: MeasureContext,
    subscriptionId: string,
    priceId: string
  ): Promise<PaddleSubscription> {
    return await ctx.with('paddle-update-subscription', {}, async () => {
      return await this.paddle.subscriptions.update(subscriptionId, {
        items: [{ priceId, quantity: 1 }],
        prorationBillingMode: 'prorated_immediately'
      })
    })
  }

  /**
   * Verify a webhook signature and parse the event.
   * Returns null when the signature does not validate.
   */
  async unmarshalWebhook (rawBody: string, secretKey: string, signature: string): Promise<any> {
    return await this.paddle.webhooks.unmarshal(rawBody, secretKey, signature)
  }
}
