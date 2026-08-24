import { coreId } from '@opensrcs/core'
import { addStringsLoader, platformId } from '@opensrcs/club'
import { activityId } from '@opensrcs/activity'
import { attachmentId } from '@opensrcs/attachment'
import { boardId } from '@opensrcs/board'
import { calendarId } from '@opensrcs/calendar'
import { chunterId } from '@opensrcs/chunter'
import { contactId } from '@opensrcs/contact'
import { documentsId } from '@opensrcs/controlled-documents'
import { documentId } from '@opensrcs/document'
import { exportId } from '@opensrcs/export'
import { driveId } from '@opensrcs/drive'
import { githubId } from '@opensrcs/github'
import { gmailId } from '@opensrcs/gmail'
import { hrId } from '@opensrcs/hr'
import { inventoryId } from '@opensrcs/inventory'
import { leadId } from '@opensrcs/lead'
import { loginId } from '@opensrcs/login'
import { loveId } from '@opensrcs/love'
import { notificationId } from '@opensrcs/notification'
import { onboardId } from '@opensrcs/onboard'
import { preferenceId } from '@opensrcs/preference'
import { productsId } from '@opensrcs/products'
import { recruitId } from '@opensrcs/recruit'
import { requestId } from '@opensrcs/request'
import { settingId } from '@opensrcs/setting'
import { supportId } from '@opensrcs/support'
import { tagsId } from '@opensrcs/tags'
import { taskId } from '@opensrcs/task'
import { telegramId } from '@opensrcs/telegram'
import { templatesId } from '@opensrcs/templates'
import { trackerId } from '@opensrcs/tracker'
import { trainingId } from '@opensrcs/training'
import { viewId } from '@opensrcs/view'
import { workbenchId } from '@opensrcs/workbench'
import { timeId } from '@opensrcs/time'
import { surveyId } from '@opensrcs/survey'
import { chatId } from '@opensrcs/chat'
import { cardId } from '@opensrcs/card'
import { mailId } from '@opensrcs/mail'
import { communicationId } from '@opensrcs/communication'

import coreEng from '@opensrcs/core/lang/en.json'
import loginEng from '@opensrcs/login-assets/lang/en.json'
import platformEng from '@opensrcs/club/lang/en.json'
import activityEn from '@opensrcs/activity-assets/lang/en.json'
import attachmentEn from '@opensrcs/attachment-assets/lang/en.json'
import boardEn from '@opensrcs/board-assets/lang/en.json'
import calendarEn from '@opensrcs/calendar-assets/lang/en.json'
import chunterEn from '@opensrcs/chunter-assets/lang/en.json'
import contactEn from '@opensrcs/contact-assets/lang/en.json'
import documentsEn from '@opensrcs/controlled-documents-assets/lang/en.json'
import documentEn from '@opensrcs/document-assets/lang/en.json'
import exportEn from '@opensrcs/export-assets/lang/en.json'
import driveEn from '@opensrcs/drive-assets/lang/en.json'
import githubEn from '@opensrcs/github-assets/lang/en.json'
import gmailEn from '@opensrcs/gmail-assets/lang/en.json'
import hrEn from '@opensrcs/hr-assets/lang/en.json'
import inventoryEn from '@opensrcs/inventory-assets/lang/en.json'
import leadEn from '@opensrcs/lead-assets/lang/en.json'
import loveEn from '@opensrcs/love-assets/lang/en.json'
import notificationEn from '@opensrcs/notification-assets/lang/en.json'
import onboardEn from '@opensrcs/onboard-assets/lang/en.json'
import preferenceEn from '@opensrcs/preference-assets/lang/en.json'
import productsEn from '@opensrcs/products-assets/lang/en.json'
import recruitEn from '@opensrcs/recruit-assets/lang/en.json'
import requestEn from '@opensrcs/request-assets/lang/en.json'
import settingEn from '@opensrcs/setting-assets/lang/en.json'
import supportEn from '@opensrcs/support-assets/lang/en.json'
import tagsEn from '@opensrcs/tags-assets/lang/en.json'
import taskEn from '@opensrcs/task-assets/lang/en.json'
import telegramEn from '@opensrcs/telegram-assets/lang/en.json'
import templatesEn from '@opensrcs/templates-assets/lang/en.json'
import trackerEn from '@opensrcs/tracker-assets/lang/en.json'
import trainingEn from '@opensrcs/training-assets/lang/en.json'
import viewEn from '@opensrcs/view-assets/lang/en.json'
import workbenchEn from '@opensrcs/workbench-assets/lang/en.json'
import timeEn from '@opensrcs/time-assets/lang/en.json'
import surveyEn from '@opensrcs/survey-assets/lang/en.json'
import chatEn from '@opensrcs/chat-assets/lang/en.json'
import cardEn from '@opensrcs/card-assets/lang/en.json'
import mailEn from '@opensrcs/mail-assets/lang/en.json'
import communicationEn from '@opensrcs/communication-assets/lang/en.json'

export function registerStringLoaders (): void {
  addStringsLoader(coreId, async (lang: string) => coreEng)
  addStringsLoader(loginId, async (lang: string) => loginEng)
  addStringsLoader(onboardId, async (lang: string) => onboardEn)
  addStringsLoader(platformId, async (lang: string) => platformEng)

  addStringsLoader(taskId, async (lang: string) => taskEn)
  addStringsLoader(viewId, async (lang: string) => viewEn)
  addStringsLoader(chunterId, async (lang: string) => chunterEn)
  addStringsLoader(attachmentId, async (lang: string) => attachmentEn)
  addStringsLoader(contactId, async (lang: string) => contactEn)
  addStringsLoader(recruitId, async (lang: string) => recruitEn)
  addStringsLoader(activityId, async (lang: string) => activityEn)
  addStringsLoader(settingId, async (lang: string) => settingEn)
  addStringsLoader(supportId, async (lang: string) => supportEn)
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
  addStringsLoader(exportId, async (lang: string) => exportEn)
  addStringsLoader(requestId, async (lang: string) => requestEn)
  addStringsLoader(loveId, async (lang: string) => loveEn)
  addStringsLoader(driveId, async (lang: string) => driveEn)
  addStringsLoader(documentsId, async (lang: string) => documentsEn)
  addStringsLoader(productsId, async (lang: string) => productsEn)
  addStringsLoader(trainingId, async (lang: string) => trainingEn)
  addStringsLoader(githubId, async (lang: string) => githubEn)
  addStringsLoader(timeId, async (lang: string) => timeEn)
  addStringsLoader(surveyId, async (lang: string) => surveyEn)
  addStringsLoader(chatId, async (lang: string) => chatEn)
  addStringsLoader(cardId, async (lang: string) => cardEn)
  addStringsLoader(mailId, async (lang: string) => mailEn)
  addStringsLoader(communicationId, async (lang: string) => communicationEn)
}
