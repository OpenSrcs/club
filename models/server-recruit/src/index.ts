//
// Copyright © 2022 OpenSrcs.
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

import { type Builder } from '@opensrcs/model'

import contact from '@opensrcs/contact'
import core from '@opensrcs/core'
import recruit from '@opensrcs/model-recruit'
import notification from '@opensrcs/notification'
import serverCore from '@opensrcs/server-core'
import serverNotification from '@opensrcs/server-notification'
import serverRecruit from '@opensrcs/server-recruit'
import serverView from '@opensrcs/server-view'
import serverContact from '@opensrcs/server-contact'

export { serverRecruitId } from '@opensrcs/server-recruit'

export function createModel (builder: Builder): void {
  builder.mixin(recruit.class.Applicant, core.class.Class, serverNotification.mixin.HTMLPresenter, {
    presenter: serverRecruit.function.ApplicationHTMLPresenter
  })

  builder.mixin(recruit.class.Applicant, core.class.Class, serverNotification.mixin.TextPresenter, {
    presenter: serverRecruit.function.ApplicationTextPresenter
  })

  builder.mixin(recruit.class.Vacancy, core.class.Class, serverNotification.mixin.HTMLPresenter, {
    presenter: serverRecruit.function.VacancyHTMLPresenter
  })

  builder.mixin(recruit.class.Vacancy, core.class.Class, serverNotification.mixin.TextPresenter, {
    presenter: serverRecruit.function.VacancyTextPresenter
  })

  builder.mixin(recruit.class.Applicant, core.class.Class, serverView.mixin.ServerLinkIdProvider, {
    encode: serverRecruit.function.LinkIdProvider
  })

  builder.mixin(recruit.class.Opinion, core.class.Class, serverView.mixin.ServerLinkIdProvider, {
    encode: serverRecruit.function.LinkIdProvider
  })

  builder.mixin(recruit.class.Review, core.class.Class, serverView.mixin.ServerLinkIdProvider, {
    encode: serverRecruit.function.LinkIdProvider
  })

  builder.mixin(recruit.class.Vacancy, core.class.Class, serverView.mixin.ServerLinkIdProvider, {
    encode: serverRecruit.function.LinkIdProvider
  })

  builder.createDoc(serverCore.class.Trigger, core.space.Model, {
    trigger: serverRecruit.trigger.OnRecruitUpdate,
    txMatch: {
      objectClass: recruit.class.Vacancy
    }
  })

  builder.mixin(recruit.class.Vacancy, core.class.Class, serverCore.mixin.SearchPresenter, {
    searchIcon: recruit.icon.Vacancy,
    title: [['name']]
  })

  builder.mixin(recruit.class.Applicant, core.class.Class, serverCore.mixin.SearchPresenter, {
    iconConfig: {
      component: contact.component.AvatarRef,
      fields: [['attachedTo']]
    },
    shortTitle: [['identifier']],
    title: {
      component: recruit.component.ApplicantNamePresenter, // Will present on UI.
      fields: [
        ['parent', 'name'],
        ['space', 'name']
      ],
      template: [
        ['func', serverContact.function.ContactNameProvider, 'true'],
        ['space', 'name']
      ],
      extraFields: [
        [
          ['func', serverContact.function.ContactNameProvider, 'false'],
          ['space', 'name']
        ]
      ]
    }
  })

  builder.mixin(
    recruit.ids.AssigneeNotification,
    notification.class.NotificationType,
    serverNotification.mixin.TypeMatch,
    {
      func: serverNotification.function.IsUserEmployeeInFieldValueTypeMatch
    }
  )
}
