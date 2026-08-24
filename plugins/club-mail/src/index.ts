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

import type { Ref, IntegrationKind } from '@opensrcs/core'
import { type Plugin, plugin } from '@opensrcs/club'
import type { Handler, IntegrationType } from '@opensrcs/setting'
import type { AnyComponent } from '@opensrcs/ui'

/**
 * @public
 */
export const clubMailIntegrationKind = 'club-mail' as IntegrationKind

/**
 * @public
 */
export const clubMailId = 'club-mail' as Plugin

export default plugin(clubMailId, {
  component: {
    Connect: '' as AnyComponent,
    IconClubMail: '' as AnyComponent,
    Configure: '' as AnyComponent,
    IntegrationState: '' as AnyComponent
  },
  integrationType: {
    ClubMail: '' as Ref<IntegrationType>
  },
  handler: {
    DisconnectHandler: '' as Handler,
    DisconnectAllHandler: '' as Handler
  }
})
