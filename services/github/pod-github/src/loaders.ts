import { coreId } from '@opensrcs/core'

import { activityId } from '@opensrcs/activity'
import { attachmentId } from '@opensrcs/attachment'
import { bitrixId } from '@opensrcs/bitrix'
import { boardId } from '@opensrcs/board'
import { calendarId } from '@opensrcs/calendar'
import { chunterId } from '@opensrcs/chunter'
import { contactId } from '@opensrcs/contact'
import { driveId } from '@opensrcs/drive'
import { gmailId } from '@opensrcs/gmail'
import { hrId } from '@opensrcs/hr'
import { inventoryId } from '@opensrcs/inventory'
import { leadId } from '@opensrcs/lead'
import { loginId } from '@opensrcs/login'
import { notificationId } from '@opensrcs/notification'
import { preferenceId } from '@opensrcs/preference'
import { recruitId } from '@opensrcs/recruit'
import { requestId } from '@opensrcs/request'
import { settingId } from '@opensrcs/setting'
import { supportId } from '@opensrcs/support'
import { tagsId } from '@opensrcs/tags'
import { taskId } from '@opensrcs/task'
import { telegramId } from '@opensrcs/telegram'
import { templatesId } from '@opensrcs/templates'
import { trackerId } from '@opensrcs/tracker'
import { viewId } from '@opensrcs/view'
import { workbenchId } from '@opensrcs/workbench'
import { documentId } from '@opensrcs/document'
import { githubId } from '@opensrcs/github'

import activityEn from '@opensrcs/activity-assets/lang/en.json'
import attachmentEn from '@opensrcs/attachment-assets/lang/en.json'
import bitrixEn from '@opensrcs/bitrix-assets/lang/en.json'
import boardEn from '@opensrcs/board-assets/lang/en.json'
import calendarEn from '@opensrcs/calendar-assets/lang/en.json'
import chunterEn from '@opensrcs/chunter-assets/lang/en.json'
import contactEn from '@opensrcs/contact-assets/lang/en.json'
import coreEng from '@opensrcs/core/lang/en.json'
import driveEn from '@opensrcs/drive-assets/lang/en.json'
import gmailEn from '@opensrcs/gmail-assets/lang/en.json'
import hrEn from '@opensrcs/hr-assets/lang/en.json'
import inventoryEn from '@opensrcs/inventory-assets/lang/en.json'
import leadEn from '@opensrcs/lead-assets/lang/en.json'
import loginEng from '@opensrcs/login-assets/lang/en.json'
import platformEng from '@opensrcs/club/lang/en.json'
import notificationEn from '@opensrcs/notification-assets/lang/en.json'
import { addStringsLoader, platformId } from '@opensrcs/club'
import preferenceEn from '@opensrcs/preference-assets/lang/en.json'
import recruitEn from '@opensrcs/recruit-assets/lang/en.json'
import requestEn from '@opensrcs/request-assets/lang/en.json'
import settingEn from '@opensrcs/setting-assets/lang/en.json'
import supportEn from '@opensrcs/support-assets/lang/en.json'
import tagsEn from '@opensrcs/tags-assets/lang/en.json'
import taskEn from '@opensrcs/task-assets/lang/en.json'
import telegramEn from '@opensrcs/telegram-assets/lang/en.json'
import templatesEn from '@opensrcs/templates-assets/lang/en.json'
import trackerEn from '@opensrcs/tracker-assets/lang/en.json'
import viewEn from '@opensrcs/view-assets/lang/en.json'
import workbenchEn from '@opensrcs/workbench-assets/lang/en.json'
import documentEn from '@opensrcs/document-assets/lang/en.json'
import githubEn from '@opensrcs/github-assets/lang/en.json'

export function registerLoaders (): void {
  addStringsLoader(coreId, async (lang: string) => coreEng)
  addStringsLoader(loginId, async (lang: string) => loginEng)
  addStringsLoader(platformId, async (lang: string) => platformEng)

  addStringsLoader(taskId, async (lang: string) => taskEn)
  addStringsLoader(viewId, async (lang: string) => viewEn)
  addStringsLoader(chunterId, async (lang: string) => chunterEn)
  addStringsLoader(attachmentId, async (lang: string) => attachmentEn)
  addStringsLoader(contactId, async (lang: string) => contactEn)
  addStringsLoader(recruitId, async (lang: string) => recruitEn)
  addStringsLoader(activityId, async (lang: string) => activityEn)
  addStringsLoader(settingId, async (lang: string) => settingEn)
  addStringsLoader(telegramId, async (lang: string) => telegramEn)
  addStringsLoader(leadId, async (lang: string) => leadEn)
  addStringsLoader(gmailId, async (lang: string) => gmailEn)
  addStringsLoader(workbenchId, async (lang: string) => workbenchEn)
  addStringsLoader(inventoryId, async (lang: string) => inventoryEn)
  addStringsLoader(templatesId, async (lang: string) => templatesEn)
  addStringsLoader(notificationId, async (lang: string) => notificationEn)
  addStringsLoader(tagsId, async (lang: string) => tagsEn)
  addStringsLoader(calendarId, async (lang: string) => calendarEn)
  addStringsLoader(trackerId, async (lang: string) => trackerEn)
  addStringsLoader(boardId, async (lang: string) => boardEn)
  addStringsLoader(preferenceId, async (lang: string) => preferenceEn)
  addStringsLoader(hrId, async (lang: string) => hrEn)
  addStringsLoader(documentId, async (lang: string) => documentEn)
  addStringsLoader(bitrixId, async (lang: string) => bitrixEn)
  addStringsLoader(requestId, async (lang: string) => requestEn)
  addStringsLoader(supportId, async (lang: string) => supportEn)
  addStringsLoader(githubId, async (lang: string) => githubEn)
  addStringsLoader(driveId, async (lang: string) => driveEn)
}
