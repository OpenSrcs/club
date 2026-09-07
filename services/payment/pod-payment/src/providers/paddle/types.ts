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

/**
 * Paddle Billing integration types
 * Uses @paddle/paddle-node-sdk for API interactions
 * Documentation: https://developer.paddle.com/api-reference/overview
 *
 * Two Paddle traits shape everything below:
 *  - Paddle calls metadata `customData`, and it lives on both the transaction
 *    and the subscription it creates.
 *  - Monetary amounts come back as strings in the currency's minor unit
 *    ("9999"), and timestamps as ISO 8601 strings, not Unix seconds.
 */

/**
 * Metadata we attach to every transaction and subscription, so a webhook or a
 * reconciliation pass can map a Paddle object back to a club workspace.
 * Paddle stores this as `customData`.
 */
export interface CreateCheckoutMetadata {
  workspaceUuid: string
  subscriptionType: string
  subscriptionPlan: string
  accountUuid?: string
  [key: string]: string | number | boolean | undefined
}

/**
 * Internal params for creating a checkout.
 * Note: Paddle uses 'priceId' on a transaction item, like Stripe's price ID.
 */
export interface CreateCheckoutParams {
  priceId: string
  successUrl: string
  customerId?: string
  customerEmail?: string
  customerName?: string
  metadata: CreateCheckoutMetadata
}

export interface CheckoutResult {
  checkoutId: string
  url: string
}
