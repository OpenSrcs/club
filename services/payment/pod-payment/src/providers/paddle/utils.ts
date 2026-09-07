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

import { type AccountUuid, type WorkspaceUuid, type MeasureContext } from '@opensrcs/core'
import type { SubscriptionData } from '@opensrcs/account-client'
import { SubscriptionStatus, SubscriptionType } from '@opensrcs/account-client'
import type { Subscription as PaddleSubscription } from '@paddle/paddle-node-sdk'

/**
 * Map a Paddle subscription status to our SubscriptionStatus.
 * Paddle has no 'unpaid'/'incomplete' equivalents - a failed first payment
 * leaves the subscription in 'past_due' - so the mapping is total apart from
 * statuses we deliberately ignore.
 */
function mapPaddleStatus (paddleStatus: string): SubscriptionStatus | null {
  switch (paddleStatus) {
    case 'active':
      return SubscriptionStatus.Active
    case 'trialing':
      return SubscriptionStatus.Trialing
    case 'past_due':
      return SubscriptionStatus.PastDue
    case 'canceled':
      return SubscriptionStatus.Canceled
    case 'paused':
      return SubscriptionStatus.Paused
    default:
      return null
  }
}

/**
 * Paddle returns timestamps as ISO 8601 strings, not Unix seconds.
 * Returns undefined rather than NaN for absent or unparseable values.
 */
function toMillis (value: string | null | undefined): number | undefined {
  if (value == null) return undefined
  const parsed = Date.parse(value)
  return isNaN(parsed) ? undefined : parsed
}

/**
 * Paddle returns monetary amounts as strings in the currency's minor unit
 * ("9999" for $99.99), matching the cents convention SubscriptionData expects.
 */
function toMinorUnits (value: string | null | undefined): number | undefined {
  if (value == null) return undefined
  const parsed = Number.parseInt(value, 10)
  return isNaN(parsed) ? undefined : parsed
}

/**
 * Transform a Paddle subscription into our SubscriptionData format.
 * Returns null when the subscription is in a state we do not track, or is
 * missing the customData we need to attribute it to a workspace.
 */
export function transformPaddleSubscriptionToData (
  ctx: MeasureContext,
  subscription: PaddleSubscription
): SubscriptionData | null {
  // Paddle's equivalent of Stripe metadata. Set on the transaction at checkout
  // creation, and inherited by the subscription Paddle creates from it.
  const customData = (subscription.customData ?? {}) as Record<string, string | undefined>
  const workspaceUuid = customData.workspaceUuid as WorkspaceUuid | undefined
  const subscriptionType = customData.subscriptionType as SubscriptionType | undefined
  const subscriptionPlan = customData.subscriptionPlan
  const accountUuid = customData.accountUuid as AccountUuid | undefined

  if (
    accountUuid === undefined ||
    workspaceUuid === undefined ||
    subscriptionType === undefined ||
    subscriptionPlan === undefined
  ) {
    const missing: string[] = []
    if (accountUuid === undefined) missing.push('accountUuid')
    if (workspaceUuid === undefined) missing.push('workspaceUuid')
    if (subscriptionType === undefined) missing.push('subscriptionType')
    if (subscriptionPlan === undefined) missing.push('subscriptionPlan')

    ctx.warn('Paddle subscription missing required customData, ignoring update', {
      subscriptionId: subscription.id,
      status: subscription.status,
      missingFields: missing
    })

    return null
  }

  const status = mapPaddleStatus(subscription.status)

  if (status === null) {
    ctx.warn('Paddle subscription status is not tracked', {
      subscriptionId: subscription.id,
      status: subscription.status
    })
    return null
  }

  const firstItem = subscription.items?.[0]
  const amount = toMinorUnits(firstItem?.price?.unitPrice?.amount)

  // Paddle records a pending cancellation as a scheduledChange rather than a
  // boolean flag, so cancelAtPeriodEnd is derived from it.
  const scheduledChange = subscription.scheduledChange
  const cancelAtPeriodEnd = scheduledChange?.action === 'cancel'

  const periodStart = toMillis(subscription.currentBillingPeriod?.startsAt) ?? toMillis(subscription.startedAt) ?? 0

  const subscriptionData: SubscriptionData = {
    id: `paddle_${subscription.id}`, // Composite ID with provider prefix to avoid conflicts
    workspaceUuid,
    accountUuid,
    provider: 'paddle',
    providerSubscriptionId: subscription.id,
    // Paddle's Subscription carries no reference back to the transaction that
    // created it, so there is no checkout id to record here. Lookups in the
    // other direction (checkout -> subscription) go through the transaction.
    providerCheckoutId: undefined,
    type: subscriptionType,
    status,
    plan: subscriptionPlan,
    amount, // Minor units, e.g. 9999 for $99.99
    periodStart,
    periodEnd: toMillis(subscription.currentBillingPeriod?.endsAt) ?? toMillis(subscription.nextBilledAt),
    trialEnd: toMillis(firstItem?.trialDates?.endsAt),
    canceledAt: toMillis(subscription.canceledAt),
    providerData: {
      modifiedAt: toMillis(subscription.updatedAt) ?? toMillis(subscription.createdAt),
      customerId: subscription.customerId,
      status: subscription.status,
      cancelAtPeriodEnd,
      endedAt: toMillis(subscription.canceledAt),
      // Paddle does not report a cancellation reason or comment on the
      // subscription, so those SubscriptionData fields stay unset.
      scheduledChangeAction: scheduledChange?.action,
      scheduledChangeEffectiveAt: toMillis(scheduledChange?.effectiveAt)
    }
  }

  return subscriptionData
}
