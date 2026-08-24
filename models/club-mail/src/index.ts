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

import { clubMailIntegrationKind } from '@opensrcs/club-mail'
import { type Builder } from '@opensrcs/model'
import core from '@opensrcs/model-core'
import setting from '@opensrcs/setting'

import clubMail from './plugin'

export { clubMailId } from '@opensrcs/club-mail'
export { default } from './plugin'

export function createModel (builder: Builder): void {
  builder.createDoc(
    setting.class.IntegrationType,
    core.space.Model,
    {
      label: clubMail.string.IntegrationLabel,
      description: clubMail.string.IntegrationDescription,
      icon: clubMail.component.IconClubMail,
      allowMultiple: true,
      createComponent: clubMail.component.Connect,
      onDisconnect: clubMail.handler.DisconnectHandler,
      onDisconnectAll: clubMail.handler.DisconnectAllHandler,
      reconnectComponent: clubMail.component.Connect,
      configureComponent: clubMail.component.Configure,
      stateComponent: clubMail.component.IntegrationState,
      kind: clubMailIntegrationKind
    },
    clubMail.integrationType.ClubMail
  )
}
