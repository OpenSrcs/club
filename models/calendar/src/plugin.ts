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

import { type DocUpdateMessageViewlet } from '@opensrcs/activity'
import { calendarId } from '@opensrcs/calendar'
import calendar from '@opensrcs/calendar-resources/src/plugin'
import { type Doc, type Ref } from '@opensrcs/core'
import { type NotificationGroup } from '@opensrcs/notification'
import type { IntlString } from '@opensrcs/club'
import { mergeIds } from '@opensrcs/club'
import { type AnyComponent } from '@opensrcs/ui/src/types'
import {
  type Action,
  type ActionCategory,
  type ViewAction,
  type Viewlet,
  type ViewletDescriptor
} from '@opensrcs/view'
import { type Widget } from '@opensrcs/workbench'

export default mergeIds(calendarId, calendar, {
  component: {
    IntegrationConnect: '' as AnyComponent,
    CreateCalendar: '' as AnyComponent,
    EventPresenter: '' as AnyComponent,
    CalendarIntegrationIcon: '' as AnyComponent,
    CalendarEventPresenter: '' as AnyComponent,
    IntegrationConfigure: '' as AnyComponent,
    CalendarWidget: '' as AnyComponent,
    CalendarSettings: '' as AnyComponent
  },
  action: {
    SaveEventReminder: '' as Ref<Action>,
    DeleteRecEvent: '' as Ref<Action>
  },
  category: {
    Calendar: '' as Ref<ActionCategory>
  },
  actionImpl: {
    SaveEventReminder: '' as ViewAction,
    DeleteRecEvent: '' as ViewAction
  },
  string: {
    ApplicationLabelCalendar: '' as IntlString,
    Event: '' as IntlString,
    Shift: '' as IntlString,
    State: '' as IntlString,
    CreatedReminder: '' as IntlString,
    ConfigLabel: '' as IntlString,
    ConfigDescription: '' as IntlString,
    IntegrationDescr: '' as IntlString
  },
  viewlet: {
    Calendar: '' as Ref<ViewletDescriptor>,
    CalendarEvent: '' as Ref<Viewlet>
  },
  ids: {
    UpdateRemainderActivityViewlet: '' as Ref<DocUpdateMessageViewlet>,
    CalendarNotificationGroup: '' as Ref<NotificationGroup>,
    CalendarWidget: '' as Ref<Widget>,
    Settings: '' as Ref<Doc>
  }
})
