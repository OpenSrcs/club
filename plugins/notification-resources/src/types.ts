import type { Ref } from '@opensrcs/core'
import type { DisplayInboxNotification, DocNotifyContext } from '@opensrcs/notification'
import type { IntlString } from '@opensrcs/club'

export type InboxNotificationsFilter = 'all' | 'unread'

export type InboxData = Map<Ref<DocNotifyContext>, DisplayInboxNotification[]>

export interface SettingItem {
  id: string
  on: boolean
  label: IntlString
  onToggle: () => void
}
