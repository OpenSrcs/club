import type { MeasureContext } from '@opensrcs/core'
import { SubscriptionStatus, SubscriptionType } from '@opensrcs/account-client'
import type { Subscription as PaddleSubscription } from '@paddle/paddle-node-sdk'

import { transformPaddleSubscriptionToData } from '../utils'

/**
 * Builds a Paddle subscription shaped like the SDK entity. Only the fields the
 * transform reads are populated; the rest are irrelevant to these tests.
 */
function makeSubscription (overrides: Record<string, any> = {}): PaddleSubscription {
  return {
    id: 'sub_01hpaddle',
    status: 'active',
    customerId: 'ctm_01hcustomer',
    createdAt: '2026-01-01T00:00:00.000Z',
    updatedAt: '2026-02-01T00:00:00.000Z',
    startedAt: '2026-01-01T00:00:00.000Z',
    nextBilledAt: '2026-03-01T00:00:00.000Z',
    canceledAt: null,
    scheduledChange: null,
    currentBillingPeriod: {
      startsAt: '2026-02-01T00:00:00.000Z',
      endsAt: '2026-03-01T00:00:00.000Z'
    },
    items: [
      {
        quantity: 1,
        trialDates: null,
        price: {
          id: 'pri_01hprice',
          unitPrice: { amount: '9999', currencyCode: 'USD' }
        }
      }
    ],
    customData: {
      workspaceUuid: 'ws-uuid-1',
      subscriptionType: SubscriptionType.Tier,
      subscriptionPlan: 'epic',
      accountUuid: 'acct-uuid-1'
    },
    ...overrides
  } as unknown as PaddleSubscription
}

describe('Paddle utils - transformPaddleSubscriptionToData', () => {
  let ctx: MeasureContext

  beforeEach(() => {
    ctx = {
      info: jest.fn(),
      warn: jest.fn(),
      error: jest.fn()
    } as any
  })

  test('maps a fully populated active subscription', () => {
    const result = transformPaddleSubscriptionToData(ctx, makeSubscription())

    expect(result).not.toBeNull()
    expect(result?.id).toBe('paddle_sub_01hpaddle')
    expect(result?.provider).toBe('paddle')
    expect(result?.providerSubscriptionId).toBe('sub_01hpaddle')
    expect(result?.workspaceUuid).toBe('ws-uuid-1')
    expect(result?.accountUuid).toBe('acct-uuid-1')
    expect(result?.plan).toBe('epic')
    expect(result?.status).toBe(SubscriptionStatus.Active)
  })

  test('parses the minor-unit amount string into a number', () => {
    // Paddle returns amounts as strings, unlike Stripe's numeric unit_amount.
    const result = transformPaddleSubscriptionToData(ctx, makeSubscription())

    expect(result?.amount).toBe(9999)
    expect(typeof result?.amount).toBe('number')
  })

  test('converts ISO 8601 timestamps to epoch milliseconds', () => {
    const result = transformPaddleSubscriptionToData(ctx, makeSubscription())

    expect(result?.periodStart).toBe(Date.parse('2026-02-01T00:00:00.000Z'))
    expect(result?.periodEnd).toBe(Date.parse('2026-03-01T00:00:00.000Z'))
  })

  test('falls back to nextBilledAt when there is no current billing period', () => {
    const result = transformPaddleSubscriptionToData(
      ctx,
      makeSubscription({ currentBillingPeriod: null })
    )

    expect(result?.periodStart).toBe(Date.parse('2026-01-01T00:00:00.000Z'))
    expect(result?.periodEnd).toBe(Date.parse('2026-03-01T00:00:00.000Z'))
  })

  test('derives cancelAtPeriodEnd from a scheduled cancel change', () => {
    const result = transformPaddleSubscriptionToData(
      ctx,
      makeSubscription({
        scheduledChange: { action: 'cancel', effectiveAt: '2026-03-01T00:00:00.000Z', resumeAt: null }
      })
    )

    expect(result?.providerData?.cancelAtPeriodEnd).toBe(true)
    expect(result?.providerData?.scheduledChangeAction).toBe('cancel')
  })

  test('does not treat a scheduled pause as a pending cancellation', () => {
    const result = transformPaddleSubscriptionToData(
      ctx,
      makeSubscription({
        scheduledChange: { action: 'pause', effectiveAt: '2026-03-01T00:00:00.000Z', resumeAt: null }
      })
    )

    expect(result?.providerData?.cancelAtPeriodEnd).toBe(false)
  })

  test('reads the trial end from the subscription item', () => {
    const result = transformPaddleSubscriptionToData(
      ctx,
      makeSubscription({
        status: 'trialing',
        items: [
          {
            quantity: 1,
            trialDates: { startsAt: '2026-01-01T00:00:00.000Z', endsAt: '2026-01-15T00:00:00.000Z' },
            price: { id: 'pri_01hprice', unitPrice: { amount: '0', currencyCode: 'USD' } }
          }
        ]
      })
    )

    expect(result?.status).toBe(SubscriptionStatus.Trialing)
    expect(result?.trialEnd).toBe(Date.parse('2026-01-15T00:00:00.000Z'))
  })

  test.each([
    ['active', SubscriptionStatus.Active],
    ['trialing', SubscriptionStatus.Trialing],
    ['past_due', SubscriptionStatus.PastDue],
    ['canceled', SubscriptionStatus.Canceled],
    ['paused', SubscriptionStatus.Paused]
  ])('maps Paddle status %s', (paddleStatus, expected) => {
    const result = transformPaddleSubscriptionToData(ctx, makeSubscription({ status: paddleStatus }))

    expect(result?.status).toBe(expected)
  })

  test('returns null for an untracked status', () => {
    const result = transformPaddleSubscriptionToData(ctx, makeSubscription({ status: 'something_new' }))

    expect(result).toBeNull()
    expect(ctx.warn).toHaveBeenCalled()
  })

  test.each(['workspaceUuid', 'subscriptionType', 'subscriptionPlan', 'accountUuid'])(
    'returns null and warns when customData is missing %s',
    (field) => {
      const customData: Record<string, string> = {
        workspaceUuid: 'ws-uuid-1',
        subscriptionType: SubscriptionType.Tier,
        subscriptionPlan: 'epic',
        accountUuid: 'acct-uuid-1'
      }
      delete customData[field]

      const result = transformPaddleSubscriptionToData(ctx, makeSubscription({ customData }))

      expect(result).toBeNull()
      expect(ctx.warn).toHaveBeenCalledWith(
        'Paddle subscription missing required customData, ignoring update',
        expect.objectContaining({ missingFields: [field] })
      )
    }
  )

  test('returns null when customData is absent entirely', () => {
    const result = transformPaddleSubscriptionToData(ctx, makeSubscription({ customData: null }))

    expect(result).toBeNull()
  })

  test('leaves amount undefined when the subscription has no items', () => {
    const result = transformPaddleSubscriptionToData(ctx, makeSubscription({ items: [] }))

    expect(result?.amount).toBeUndefined()
  })
})
