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

import type { Request, Response } from 'express'
import { type MeasureContext } from '@opensrcs/core'
import type { Subscription as PaddleSubscription } from '@paddle/paddle-node-sdk'

import { getAccountClient } from '../../utils'
import { PaddleClient } from './client'
import { transformPaddleSubscriptionToData } from './utils'

/**
 * Handle Paddle Billing webhook events.
 * Signature verification is delegated to the SDK's webhooks.unmarshal, which
 * both validates the `paddle-signature` header and parses the payload.
 * Documentation: https://developer.paddle.com/webhooks/overview
 */
export async function handlePaddleWebhook (
  ctx: MeasureContext,
  accountsUrl: string,
  serviceToken: string,
  webhookSecret: string,
  paddle: PaddleClient,
  req: Request,
  res: Response
): Promise<void> {
  try {
    // Body is a Buffer from express.raw() middleware. Paddle's unmarshal takes
    // the raw body as a string.
    const rawBody = req.body as Buffer
    const signature = req.headers['paddle-signature'] as string | undefined

    if (!(rawBody instanceof Buffer) || rawBody.length === 0) {
      ctx.error('Invalid webhook body')
      res.status(400).json({ error: 'Invalid body' })
      return
    }

    if (signature === undefined) {
      ctx.error('Missing Paddle signature header')
      res.status(400).json({ error: 'Missing signature' })
      return
    }

    let event: any
    try {
      event = await paddle.unmarshalWebhook(rawBody.toString('utf8'), webhookSecret, signature)
    } catch (err: any) {
      ctx.error('Invalid Paddle webhook signature', { err })
      res.status(403).json({ error: 'Invalid signature' })
      return
    }

    if (event == null) {
      ctx.error('Paddle webhook did not validate')
      res.status(403).json({ error: 'Invalid signature' })
      return
    }

    switch (event.eventType) {
      // Paddle splits what Stripe reports as customer.subscription.updated into
      // several lifecycle events; they all carry a full subscription payload.
      case 'subscription.created':
      case 'subscription.updated':
      case 'subscription.activated':
      case 'subscription.canceled':
      case 'subscription.paused':
      case 'subscription.resumed':
      case 'subscription.trialing': {
        void handleSubscriptionUpdated(ctx, accountsUrl, serviceToken, event.data as PaddleSubscription).catch(
          (err) => {
            ctx.error('Failed to process Paddle webhook event', { eventType: event.eventType, err })
          }
        )
        break
      }
      // Payment outcomes arrive on the transaction, not the subscription, so we
      // reload the subscription the transaction belongs to.
      case 'transaction.completed':
      case 'transaction.payment_failed': {
        void (async () => {
          try {
            const subscriptionId = (event.data as { subscriptionId?: string | null }).subscriptionId
            if (subscriptionId == null) {
              ctx.info('Transaction event without subscription, skipping', { eventType: event.eventType })
              return
            }
            const subscription = await paddle.getSubscription(ctx, subscriptionId)
            await handleSubscriptionUpdated(ctx, accountsUrl, serviceToken, subscription)
          } catch (err) {
            ctx.error('Failed to process Paddle transaction event', { eventType: event.eventType, err })
          }
        })()
        break
      }
      default: {
        ctx.info('Unhandled Paddle webhook event type', { type: event.eventType })
      }
    }

    res.status(200).json({ received: true })
  } catch (err) {
    ctx.error('Failed to process Paddle webhook', { err })
    res.status(500).json({ error: 'Internal server error' })
  }
}

/**
 * Upsert the subscription carried by a webhook event.
 */
async function handleSubscriptionUpdated (
  ctx: MeasureContext,
  accountsUrl: string,
  serviceToken: string,
  subscription: PaddleSubscription
): Promise<void> {
  if (subscription == null) {
    ctx.error('Missing subscription data in Paddle event')
    throw new Error('Missing subscription data')
  }

  const subscriptionData = transformPaddleSubscriptionToData(ctx, subscription)

  if (subscriptionData === null) {
    ctx.warn('Ignoring Paddle subscription in irrelevant state', {
      subscriptionId: subscription.id,
      status: subscription.status
    })
    return
  }

  const accountClient = getAccountClient(accountsUrl, serviceToken)
  await accountClient.upsertSubscription(subscriptionData)

  ctx.info('Subscription upserted', { subscriptionId: subscription.id, status: subscriptionData.status })
}
