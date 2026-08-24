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

import {
  Plugin,
  addEventListener,
  addLocation,
  addStringsLoader,
  getMetadata,
  platformId,
  setMetadata
} from '@opensrcs/club'

import { activityId } from '@opensrcs/activity'
import aiBot, { aiBotId } from '@opensrcs/ai-bot'
import { attachmentId } from '@opensrcs/attachment'
import { bitrixId } from '@opensrcs/bitrix'
import { boardId } from '@opensrcs/board'
import calendar, { calendarId } from '@opensrcs/calendar'
import { cardId } from '@opensrcs/card'
import { chunterId } from '@opensrcs/chunter'
import client, { clientId } from '@opensrcs/client'
import contactPlugin, { contactId } from '@opensrcs/contact'
import { converterId } from '@opensrcs/converter'
import { documentsId } from '@opensrcs/controlled-documents'
import { desktopPreferencesId } from '@opensrcs/desktop-preferences'
import { desktopDownloadsId } from '@opensrcs/desktop-downloads'
import { diffviewId } from '@opensrcs/diffview'
import { documentId } from '@opensrcs/document'
import { driveId } from '@opensrcs/drive'
import exportPlugin, { exportId } from '@opensrcs/export'
import gmail, { gmailId } from '@opensrcs/gmail'
import globalProfile, { globalProfileId, globalProfileRoute } from '@opensrcs/global-profile'
import guest, { guestId } from '@opensrcs/guest'
import { hrId } from '@opensrcs/hr'
import { imageCropperId } from '@opensrcs/image-cropper'
import { inventoryId } from '@opensrcs/inventory'
import { leadId } from '@opensrcs/lead'
import login, { loginId } from '@opensrcs/login'
import notification, { notificationId } from '@opensrcs/notification'
import onboard, { onboardId } from '@opensrcs/onboard'
import presence, { presenceId } from '@opensrcs/presence'
import { processId } from '@opensrcs/process'
import { productsId } from '@opensrcs/products'
import { questionsId } from '@opensrcs/questions'
import { recruitId } from '@opensrcs/recruit'
import rekoni from '@opensrcs/rekoni'
import { requestId } from '@opensrcs/request'
import setting, { settingId } from '@opensrcs/setting'
import support, { supportId, supportLink, reportBugLink, docsLink, privacyPolicyLink } from '@opensrcs/support'
import { surveyId } from '@opensrcs/survey'
import { tagsId } from '@opensrcs/tags'
import { taskId } from '@opensrcs/task'
import telegram, { telegramId } from '@opensrcs/telegram'
import { templatesId } from '@opensrcs/templates'
import { testManagementId } from '@opensrcs/test-management'
import { timeId } from '@opensrcs/time'
import tracker, { trackerId } from '@opensrcs/tracker'
import { trainingId } from '@opensrcs/training'
import uiPlugin, { getCurrentLocation, locationStorageKeyId, navigate, setLocationStorageKey } from '@opensrcs/ui'
import { mediaId } from '@opensrcs/media'
import { uploaderId } from '@opensrcs/uploader'
import recorder, { recorderId } from '@opensrcs/recorder'
import { viewId } from '@opensrcs/view'
import workbench, { workbenchId } from '@opensrcs/workbench'
import { mailId } from '@opensrcs/mail'
import { chatId } from '@opensrcs/chat'
import { inboxId } from '@opensrcs/inbox'
import { achievementId } from '@opensrcs/achievement'
import communication, { communicationId } from '@opensrcs/communication'
import { emojiId } from '@opensrcs/emoji'
import { clubMailId } from '@opensrcs/club-mail'
import { aiAssistantId } from '@opensrcs/ai-assistant'
import { ratingId } from '@opensrcs/rating'
import billingPlugin, { billingId } from '@opensrcs/billing'

import '@opensrcs/activity-assets'
import '@opensrcs/analytics-collector-assets'
import '@opensrcs/attachment-assets'
import '@opensrcs/bitrix-assets'
import '@opensrcs/board-assets'
import '@opensrcs/calendar-assets'
import '@opensrcs/card-assets'
import '@opensrcs/chunter-assets'
import '@opensrcs/contact-assets'
import '@opensrcs/controlled-documents-assets'
import '@opensrcs/desktop-preferences-assets'
import '@opensrcs/desktop-downloads-assets'
import '@opensrcs/diffview-assets'
import '@opensrcs/document-assets'
import '@opensrcs/drive-assets'
import '@opensrcs/export-assets'
import '@opensrcs/gmail-assets'
import '@opensrcs/guest-assets'
import '@opensrcs/global-profile-assets'
import '@opensrcs/hr-assets'
import '@opensrcs/inventory-assets'
import '@opensrcs/lead-assets'
import '@opensrcs/login-assets'
import '@opensrcs/love-assets'
import '@opensrcs/notification-assets'
import '@opensrcs/preference-assets'
import '@opensrcs/print-assets'
import '@opensrcs/process-assets'
import '@opensrcs/products-assets'
import '@opensrcs/questions-assets'
import '@opensrcs/recruit-assets'
import '@opensrcs/request-assets'
import '@opensrcs/setting-assets'
import '@opensrcs/support-assets'
import '@opensrcs/survey-assets'
import '@opensrcs/tags-assets'
import '@opensrcs/task-assets'
import '@opensrcs/telegram-assets'
import '@opensrcs/templates-assets'
import '@opensrcs/test-management-assets'
import '@opensrcs/text-editor-assets'
import '@opensrcs/time-assets'
import '@opensrcs/tracker-assets'
import '@opensrcs/training-assets'
import '@opensrcs/uploader-assets'
import '@opensrcs/recorder-assets'
import '@opensrcs/view-assets'
import '@opensrcs/workbench-assets'
import '@opensrcs/mail-assets'
import '@opensrcs/chat-assets'
import '@opensrcs/inbox-assets'
import '@opensrcs/achievement-assets'
import '@opensrcs/emoji-assets'
import '@opensrcs/media-assets'
import '@opensrcs/communication-assets'
import '@opensrcs/billing-assets'
import '@opensrcs/club-mail-assets'
import '@opensrcs/ai-assistant-assets'
import '@opensrcs/rating-assets'

import analyticsCollector, { analyticsCollectorId } from '@opensrcs/analytics-collector'
import { coreId } from '@opensrcs/core'
import love, { loveId } from '@opensrcs/love'
import presentation, { createFileStorage, presentationId } from '@opensrcs/presentation'
import print, { printId } from '@opensrcs/print'
import sign from '@opensrcs/sign'
import textEditor, { textEditorId } from '@opensrcs/text-editor'

import { initThemeStore, setDefaultLanguage } from '@opensrcs/theme'
import { configureNotifications } from './notifications'
import { configureAnalyticsProviders } from '@opensrcs/analytics-providers'
import { Branding, Config } from './types'
import { ipcMainExposed } from './typesUtils'

import github, { githubId } from '@opensrcs/github'
import '@opensrcs/github-assets'
import { preferenceId } from '@opensrcs/preference'
import { uiId } from '@opensrcs/ui/src/plugin'

function configureI18n (): void {
  // Add localization
  addStringsLoader(
    platformId,
    async (lang: string) =>
      await import(
        /* webpackInclude: /\.json$/ */
        /* webpackMode: "lazy" */
        /* webpackChunkName: "lang-[request]" */
        `@opensrcs/club/lang/${lang}.json`
      )
  )
  addStringsLoader(
    coreId,
    async (lang: string) =>
      await import(
        /* webpackInclude: /\.json$/ */
        /* webpackMode: "lazy" */
        /* webpackChunkName: "lang-[request]" */
        `@opensrcs/core/lang/${lang}.json`
      )
  )
  addStringsLoader(
    presentationId,
    async (lang: string) => await import(`@opensrcs/presentation/lang/${lang}.json`)
  )
  addStringsLoader(
    textEditorId,
    async (lang: string) => await import(`@opensrcs/text-editor-assets/lang/${lang}.json`)
  )
  addStringsLoader(uiId, async (lang: string) => await import(`@opensrcs/ui/lang/${lang}.json`))
  addStringsLoader(mediaId, async (lang: string) => await import(`@opensrcs/media-assets/lang/${lang}.json`))
  addStringsLoader(uploaderId, async (lang: string) => await import(`@opensrcs/uploader-assets/lang/${lang}.json`))
  addStringsLoader(recorderId, async (lang: string) => await import(`@opensrcs/recorder-assets/lang/${lang}.json`))
  addStringsLoader(activityId, async (lang: string) => await import(`@opensrcs/activity-assets/lang/${lang}.json`))
  addStringsLoader(
    attachmentId,
    async (lang: string) => await import(`@opensrcs/attachment-assets/lang/${lang}.json`)
  )
  addStringsLoader(bitrixId, async (lang: string) => await import(`@opensrcs/bitrix-assets/lang/${lang}.json`))
  addStringsLoader(boardId, async (lang: string) => await import(`@opensrcs/board-assets/lang/${lang}.json`))
  addStringsLoader(calendarId, async (lang: string) => await import(`@opensrcs/calendar-assets/lang/${lang}.json`))
  addStringsLoader(chunterId, async (lang: string) => await import(`@opensrcs/chunter-assets/lang/${lang}.json`))
  addStringsLoader(contactId, async (lang: string) => await import(`@opensrcs/contact-assets/lang/${lang}.json`))
  addStringsLoader(driveId, async (lang: string) => await import(`@opensrcs/drive-assets/lang/${lang}.json`))
  addStringsLoader(gmailId, async (lang: string) => await import(`@opensrcs/gmail-assets/lang/${lang}.json`))
  addStringsLoader(hrId, async (lang: string) => await import(`@opensrcs/hr-assets/lang/${lang}.json`))
  addStringsLoader(
    inventoryId,
    async (lang: string) => await import(`@opensrcs/inventory-assets/lang/${lang}.json`)
  )
  addStringsLoader(leadId, async (lang: string) => await import(`@opensrcs/lead-assets/lang/${lang}.json`))
  addStringsLoader(loginId, async (lang: string) => await import(`@opensrcs/login-assets/lang/${lang}.json`))
  addStringsLoader(
    notificationId,
    async (lang: string) => await import(`@opensrcs/notification-assets/lang/${lang}.json`)
  )
  addStringsLoader(onboardId, async (lang: string) => await import(`@opensrcs/onboard-assets/lang/${lang}.json`))
  addStringsLoader(
    preferenceId,
    async (lang: string) => await import(`@opensrcs/preference-assets/lang/${lang}.json`)
  )
  addStringsLoader(recruitId, async (lang: string) => await import(`@opensrcs/recruit-assets/lang/${lang}.json`))
  addStringsLoader(requestId, async (lang: string) => await import(`@opensrcs/request-assets/lang/${lang}.json`))
  addStringsLoader(settingId, async (lang: string) => await import(`@opensrcs/setting-assets/lang/${lang}.json`))
  addStringsLoader(supportId, async (lang: string) => await import(`@opensrcs/support-assets/lang/${lang}.json`))
  addStringsLoader(tagsId, async (lang: string) => await import(`@opensrcs/tags-assets/lang/${lang}.json`))
  addStringsLoader(taskId, async (lang: string) => await import(`@opensrcs/task-assets/lang/${lang}.json`))
  addStringsLoader(telegramId, async (lang: string) => await import(`@opensrcs/telegram-assets/lang/${lang}.json`))
  addStringsLoader(
    templatesId,
    async (lang: string) => await import(`@opensrcs/templates-assets/lang/${lang}.json`)
  )
  addStringsLoader(trackerId, async (lang: string) => await import(`@opensrcs/tracker-assets/lang/${lang}.json`))
  addStringsLoader(viewId, async (lang: string) => await import(`@opensrcs/view-assets/lang/${lang}.json`))
  addStringsLoader(
    workbenchId,
    async (lang: string) => await import(`@opensrcs/workbench-assets/lang/${lang}.json`)
  )

  addStringsLoader(
    desktopPreferencesId,
    async (lang: string) => await import(`@opensrcs/desktop-preferences-assets/lang/${lang}.json`)
  )
  addStringsLoader(
    desktopDownloadsId,
    async (lang: string) => await import(`@opensrcs/desktop-downloads-assets/lang/${lang}.json`)
  )
  addStringsLoader(diffviewId, async (lang: string) => await import(`@opensrcs/diffview-assets/lang/${lang}.json`))
  addStringsLoader(documentId, async (lang: string) => await import(`@opensrcs/document-assets/lang/${lang}.json`))
  addStringsLoader(timeId, async (lang: string) => await import(`@opensrcs/time-assets/lang/${lang}.json`))
  addStringsLoader(githubId, async (lang: string) => await import(`@opensrcs/github-assets/lang/${lang}.json`))
  addStringsLoader(
    documentsId,
    async (lang: string) => await import(`@opensrcs/controlled-documents-assets/lang/${lang}.json`)
  )
  addStringsLoader(productsId, async (lang: string) => await import(`@opensrcs/products-assets/lang/${lang}.json`))
  addStringsLoader(
    questionsId,
    async (lang: string) => await import(`@opensrcs/questions-assets/lang/${lang}.json`)
  )
  addStringsLoader(trainingId, async (lang: string) => await import(`@opensrcs/training-assets/lang/${lang}.json`))
  addStringsLoader(guestId, async (lang: string) => await import(`@opensrcs/guest-assets/lang/${lang}.json`))
  addStringsLoader(
    globalProfileId,
    async (lang: string) => await import(`@opensrcs/global-profile-assets/lang/${lang}.json`)
  )
  addStringsLoader(loveId, async (lang: string) => await import(`@opensrcs/love-assets/lang/${lang}.json`))
  addStringsLoader(printId, async (lang: string) => await import(`@opensrcs/print-assets/lang/${lang}.json`))
  addStringsLoader(exportId, async (lang: string) => await import(`@opensrcs/export-assets/lang/${lang}.json`))
  addStringsLoader(
    analyticsCollectorId,
    async (lang: string) => await import(`@opensrcs/analytics-collector-assets/lang/${lang}.json`)
  )
  addStringsLoader(
    testManagementId,
    async (lang: string) => await import(`@opensrcs/test-management-assets/lang/${lang}.json`)
  )
  addStringsLoader(surveyId, async (lang: string) => await import(`@opensrcs/survey-assets/lang/${lang}.json`))
  addStringsLoader(cardId, async (lang: string) => await import(`@opensrcs/card-assets/lang/${lang}.json`))
  addStringsLoader(mailId, async (lang: string) => await import(`@opensrcs/mail-assets/lang/${lang}.json`))
  addStringsLoader(chatId, async (lang: string) => await import(`@opensrcs/chat-assets/lang/${lang}.json`))
  addStringsLoader(inboxId, async (lang: string) => await import(`@opensrcs/inbox-assets/lang/${lang}.json`))
  addStringsLoader(processId, async (lang: string) => await import(`@opensrcs/process-assets/lang/${lang}.json`))
  addStringsLoader(
    achievementId,
    async (lang: string) => await import(`@opensrcs/achievement-assets/lang/${lang}.json`)
  )
  addStringsLoader(
    communicationId,
    async (lang: string) => await import(`@opensrcs/communication-assets/lang/${lang}.json`)
  )
  addStringsLoader(emojiId, async (lang: string) => await import(`@opensrcs/emoji-assets/lang/${lang}.json`))
  addStringsLoader(billingId, async (lang: string) => await import(`@opensrcs/billing-assets/lang/${lang}.json`))
  addStringsLoader(
    clubMailId,
    async (lang: string) => await import(`@opensrcs/club-mail-assets/lang/${lang}.json`)
  )
  addStringsLoader(
    aiAssistantId,
    async (lang: string) => await import(`@opensrcs/ai-assistant-assets/lang/${lang}.json`)
  )
  addStringsLoader(ratingId, async (lang: string) => await import(`@opensrcs/rating-assets/lang/${lang}.json`))
}

export class PlatformBranding {
  constructor (private readonly title: string) {}

  public getTitle (): string {
    return this.title
  }
}

export class PlatformParameters {
  constructor (private readonly branding: PlatformBranding) {}

  public getBranding (): PlatformBranding {
    return this.branding
  }
}

export async function configurePlatform (onWorkbenchConnect?: () => Promise<void>): Promise<PlatformParameters> {
  configureI18n()

  const ipcMain = ipcMainExposed()
  const config: Config = await ipcMain.config()
  const myBranding: Branding = await ipcMain.branding()
  // await (await fetch(devConfig? '/config-dev.json' : '/config.json')).json()
  console.log('loading configuration', config)
  console.log('loaded branding', myBranding)

  const title = myBranding.title ?? 'club Desktop'
  ipcMain.setTitle(title)

  configureAnalyticsProviders(config)

  setMetadata(login.metadata.AccountsUrl, config.ACCOUNTS_URL)
  setMetadata(login.metadata.DisableSignUp, config.DISABLE_SIGNUP === 'true')
  setMetadata(login.metadata.HideLocalLogin, config.HIDE_LOCAL_LOGIN === 'true')
  setMetadata(presentation.metadata.UploadURL, config.UPLOAD_URL)
  setMetadata(presentation.metadata.UploadURL, config.FILES_URL)
  setMetadata(presentation.metadata.DatalakeUrl, config.DATALAKE_URL ?? '')
  setMetadata(
    presentation.metadata.FileStorage,
    createFileStorage(config.UPLOAD_URL, config.DATALAKE_URL, config.CLUBLAKE_URL)
  )
  setMetadata(presentation.metadata.CollaboratorUrl, config.COLLABORATOR_URL)
  setMetadata(presentation.metadata.PreviewUrl, config.PREVIEW_URL)
  setMetadata(presentation.metadata.FrontUrl, config.FRONT_URL)
  setMetadata(presentation.metadata.LinkPreviewUrl, config.LINK_PREVIEW_URL ?? '')
  setMetadata(presentation.metadata.MailUrl, config.MAIL_URL)
  setMetadata(recorder.metadata.StreamUrl, config.STREAM_URL ?? '')
  setMetadata(presentation.metadata.StatsUrl, config.STATS_URL)
  setMetadata(presentation.metadata.ClublakeUrl, config.CLUBLAKE_URL ?? '')
  setMetadata(presentation.metadata.PulseUrl, config.PULSE_URL ?? '')

  const disabledFeatures = (config.DISABLED_FEATURES ?? '').split(',').map(it => it.trim()).filter(it => it.length > 0)
  setMetadata(presentation.metadata.DisabledFeatures, new Set(disabledFeatures))

  setMetadata(textEditor.metadata.Collaborator, config.COLLABORATOR ?? '')

  setMetadata(github.metadata.GithubApplication, config.GITHUB_APP ?? '')
  setMetadata(github.metadata.GithubClientID, config.GITHUB_CLIENTID ?? '')
  setMetadata(github.metadata.GithubURL, config.GITHUB_URL ?? '')

  setMetadata(communication.metadata.Enabled, config.COMMUNICATION_API_ENABLED === 'true')

  if (config.MODEL_VERSION != null) {
    console.log('Minimal Model version requirement', config.MODEL_VERSION)
    setMetadata(presentation.metadata.ModelVersion, config.MODEL_VERSION)
  }
  if (config.VERSION != null) {
    console.log('Minimal version requirement', config.VERSION)
    setMetadata(presentation.metadata.FrontVersion, config.VERSION)
  }
  setMetadata(telegram.metadata.TelegramURL, config.TELEGRAM_URL ?? 'http://localhost:8086')
  setMetadata(telegram.metadata.BotUrl, config.TELEGRAM_BOT_URL ?? 'http://club.local:4020')
  setMetadata(gmail.metadata.GmailURL, config.GMAIL_URL ?? 'http://localhost:8087')
  setMetadata(calendar.metadata.CalendarServiceURL, config.CALENDAR_URL ?? 'http://localhost:8095')
  setMetadata(calendar.metadata.PublicScheduleURL, config.PUBLIC_SCHEDULE_URL)
  setMetadata(calendar.metadata.CalDavServerURL, config.CALDAV_SERVER_URL)
  setMetadata(notification.metadata.PushPublicKey, config.PUSH_PUBLIC_KEY)

  setMetadata(rekoni.metadata.RekoniUrl, config.REKONI_URL)
  setMetadata(contactPlugin.metadata.LastNameFirst, myBranding.lastNameFirst === 'true')
  setMetadata(love.metadata.ServiceEnpdoint, config.LOVE_ENDPOINT)
  setMetadata(love.metadata.WebSocketURL, config.LIVEKIT_WS)
  setMetadata(print.metadata.PrintURL, config.PRINT_URL)
  setMetadata(sign.metadata.SignURL, config.SIGN_URL)
  setMetadata(uiPlugin.metadata.DefaultApplication, login.component.LoginApp)
  setMetadata(analyticsCollector.metadata.EndpointURL, config.ANALYTICS_COLLECTOR_URL)
  setMetadata(aiBot.metadata.EndpointURL, config.AI_URL)
  setMetadata(presence.metadata.PresenceUrl, config.PRESENCE_URL ?? '')
  setMetadata(exportPlugin.metadata.ExportUrl, config.EXPORT_URL ?? '')

  setMetadata(billingPlugin.metadata.BillingURL, config.BILLING_URL ?? '')
  setMetadata(presentation.metadata.PaymentUrl, config.PAYMENT_URL ?? '')
  setMetadata(presentation.metadata.SignupUrl, config.SIGNUP_URL ?? 'https://club.opensrcs.org/signup')

  setMetadata(support.metadata.SupportLink, myBranding.support?.supportLink ?? supportLink)
  setMetadata(support.metadata.ReportBugLink, myBranding.support?.reportBugLink ?? reportBugLink)
  setMetadata(support.metadata.DocsLink, myBranding.support?.docsLink ?? docsLink)
  setMetadata(support.metadata.PrivacyPolicyLink, myBranding.support?.privacyPolicyLink ?? privacyPolicyLink)

  const languages =
    myBranding.languages !== undefined && myBranding.languages !== ''
      ? myBranding.languages.split(',').map((l) => l.trim())
      : ['en', 'ru', 'es', 'pl', 'pt', 'pt-br', 'zh', 'fr', 'cs', 'it', 'de', 'ja', 'ko', 'tr']

  setMetadata(uiPlugin.metadata.Languages, languages)

  setMetadata(
    uiPlugin.metadata.Routes,
    new Map([
      [workbenchId, workbench.component.WorkbenchApp],
      [loginId, login.component.LoginApp],
      [onboardId, onboard.component.OnboardApp],
      [calendarId, calendar.component.ConnectApp],
      [guestId, guest.component.GuestApp],
      [globalProfileRoute, globalProfile.component.GlobalProfileApp]
    ])
  )

  addLocation(coreId, async () => ({ default: async () => ({}) }))
  addLocation(presentationId, async () => ({ default: async () => ({}) }))

  addLocation(clientId, async () => await import('@opensrcs/client-resources'))
  addLocation(loginId, async () => await import('@opensrcs/login-resources'))
  addLocation(onboardId, async () => await import('@opensrcs/onboard-resources'))
  addLocation(workbenchId, async () => await import('@opensrcs/workbench-resources'))
  addLocation(viewId, async () => await import('@opensrcs/view-resources'))
  addLocation(converterId, async () => await import('@opensrcs/converter-resources'))
  addLocation(taskId, async () => await import('@opensrcs/task-resources'))
  addLocation(contactId, async () => await import('@opensrcs/contact-resources'))
  addLocation(chunterId, async () => await import('@opensrcs/chunter-resources'))
  addLocation(recruitId, async () => await import('@opensrcs/recruit-resources'))
  addLocation(activityId, async () => await import('@opensrcs/activity-resources'))
  addLocation(settingId, async () => await import('@opensrcs/setting-resources'))
  addLocation(leadId, async () => await import('@opensrcs/lead-resources'))
  addLocation(telegramId, async () => await import('@opensrcs/telegram-resources'))
  addLocation(attachmentId, async () => await import('@opensrcs/attachment-resources'))
  addLocation(gmailId, async () => await import('@opensrcs/gmail-resources'))
  addLocation(imageCropperId, async () => await import('@opensrcs/image-cropper-resources'))
  addLocation(inventoryId, async () => await import('@opensrcs/inventory-resources'))
  addLocation(templatesId, async () => await import('@opensrcs/templates-resources'))
  addLocation(notificationId, async () => await import('@opensrcs/notification-resources'))
  addLocation(tagsId, async () => await import('@opensrcs/tags-resources'))
  addLocation(calendarId, async () => await import('@opensrcs/calendar-resources'))
  addLocation(analyticsCollectorId, async () => await import('@opensrcs/analytics-collector-resources'))
  addLocation(aiBotId, async () => await import('@opensrcs/ai-bot-resources'))

  addLocation(trackerId, async () => await import('@opensrcs/tracker-resources'))
  addLocation(boardId, async () => await import('@opensrcs/board-resources'))
  addLocation(hrId, async () => await import('@opensrcs/hr-resources'))
  addLocation(bitrixId, async () => await import('@opensrcs/bitrix-resources'))
  addLocation(requestId, async () => await import('@opensrcs/request-resources'))
  addLocation(driveId, async () => await import('@opensrcs/drive-resources'))
  addLocation(supportId, async () => await import('@opensrcs/support-resources'))
  addLocation(diffviewId, async () => await import('@opensrcs/diffview-resources'))
  addLocation(documentId, async () => await import('@opensrcs/document-resources'))
  addLocation(timeId, async () => await import('@opensrcs/time-resources'))
  addLocation(questionsId, async () => await import('@opensrcs/questions-resources'))
  addLocation(trainingId, async () => await import('@opensrcs/training-resources'))
  addLocation(productsId, async () => await import('@opensrcs/products-resources'))
  addLocation(documentsId, async () => await import('@opensrcs/controlled-documents-resources'))
  addLocation(mediaId, async () => await import('@opensrcs/media-resources'))
  addLocation(uploaderId, async () => await import('@opensrcs/uploader-resources'))
  addLocation(recorderId, async () => await import('@opensrcs/recorder-resources'))
  addLocation(presenceId, async () => await import('@opensrcs/presence-resources'))
  addLocation(githubId, async () => await import(/* webpackChunkName: "github" */ '@opensrcs/github-resources'))
  addLocation(
    desktopPreferencesId,
    async () =>
      await import(/* webpackChunkName: "desktop-preferences" */ '@opensrcs/desktop-preferences-resources')
  )
  addLocation(
    desktopDownloadsId,
    async () => await import(/* webpackChunkName: "desktop-downloads" */ '@opensrcs/desktop-downloads-resources')
  )
  addLocation(guestId, () => import(/* webpackChunkName: "guest" */ '@opensrcs/guest-resources'))
  addLocation(
    globalProfileId,
    () => import(/* webpackChunkName: "global-profile" */ '@opensrcs/global-profile-resources')
  )
  addLocation(loveId, () => import(/* webpackChunkName: "love" */ '@opensrcs/love-resources'))
  addLocation(printId, () => import(/* webpackChunkName: "print" */ '@opensrcs/print-resources'))
  addLocation(exportId, () => import(/* webpackChunkName: "export" */ '@opensrcs/export-resources'))
  addLocation(textEditorId, () => import(/* webpackChunkName: "text-editor" */ '@opensrcs/text-editor-resources'))
  addLocation(
    testManagementId,
    () => import(/* webpackChunkName: "test-management" */ '@opensrcs/test-management-resources')
  )
  addLocation(surveyId, () => import(/* webpackChunkName: "survey" */ '@opensrcs/survey-resources'))
  addLocation(cardId, () => import(/* webpackChunkName: "card" */ '@opensrcs/card-resources'))
  addLocation(chatId, () => import(/* webpackChunkName: "chat" */ '@opensrcs/chat-resources'))
  addLocation(inboxId, () => import(/* webpackChunkName: "inbox" */ '@opensrcs/inbox-resources'))
  addLocation(processId, () => import(/* webpackChunkName: "process" */ '@opensrcs/process-resources'))
  addLocation(achievementId, () => import(/* webpackChunkName: "achievement" */ '@opensrcs/achievement-resources'))
  addLocation(
    communicationId,
    () => import(/* webpackChunkName: "communication" */ '@opensrcs/communication-resources')
  )
  addLocation(emojiId, () => import(/* webpackChunkName: "achievement" */ '@opensrcs/emoji-resources'))
  if ((config.BILLING_URL ?? '') !== '') {
    addLocation(billingId, () => import(/* webpackChunkName: "billing" */ '@opensrcs/billing-resources'))
  }
  addLocation(clubMailId, () => import(/* webpackChunkName: "club-mail" */ '@opensrcs/club-mail-resources'))
  addLocation(
    aiAssistantId,
    () => import(/* webpackChunkName: "ai-assistant" */ '@opensrcs/ai-assistant-resources')
  )
  addLocation(ratingId, async () => await import(/* webpackChunkName: "rating" */ '@opensrcs/rating-resources'))

  setMetadata(client.metadata.FilterModel, 'ui')
  setMetadata(client.metadata.ExtraFilter, disabledFeatures)
  setMetadata(client.metadata.ExtraPlugins, ['preference' as Plugin])

  // Use binary response transfer for faster performance and small transfer sizes.
  setMetadata(client.metadata.UseBinaryProtocol, true)
  // Disable for now, since it causes performance issues on linux/docker/kubernetes boxes for now.
  setMetadata(client.metadata.UseProtocolCompression, true)

  setMetadata(uiPlugin.metadata.PlatformTitle, title)
  setMetadata(workbench.metadata.PlatformTitle, title)
  setDefaultLanguage(myBranding.defaultLanguage ?? 'en')
  setMetadata(workbench.metadata.DefaultApplication, myBranding.defaultApplication ?? 'tracker')
  setMetadata(workbench.metadata.DefaultSpace, myBranding.defaultSpace ?? tracker.project.DefaultProject)
  setMetadata(workbench.metadata.DefaultSpecial, myBranding.defaultSpecial ?? 'issues')
  setMetadata(setting.metadata.DefaultInviteRole, myBranding.defaultInviteRole)
  setMetadata(setting.metadata.DefaultInviteLinkGeneratorRoles, myBranding.inviteLinkGeneratorRoles)

  try {
    const parsed = JSON.parse(config.EXCLUDED_APPLICATIONS_FOR_ANONYMOUS ?? '')
    setMetadata(workbench.metadata.ExcludedApplicationsForAnonymous, Array.isArray(parsed) ? parsed : [])
  } catch (err) {
    setMetadata(workbench.metadata.ExcludedApplicationsForAnonymous, [])
  }

  initThemeStore()

  addEventListener(workbench.event.NotifyConnection, async () => {
    await ipcMain.setFrontCookie(
      config.FRONT_URL,
      presentation.metadata.Token.replaceAll(':', '-'),
      getMetadata(presentation.metadata.Token) ?? ''
    )
    await onWorkbenchConnect?.()
  })

  configureNotifications()

  setMetadata(setting.metadata.BackupUrl, config.BACKUP_URL ?? '')

  if (config.INITIAL_URL !== '') {
    setLocationStorageKey('uberflow_child')
  }

  const last = localStorage.getItem(locationStorageKeyId)

  if (config.INITIAL_URL !== '') {
    console.log('NAVIGATE', config.INITIAL_URL, getCurrentLocation())
    // NavigationExpandedDefault=false fills buggy:
    // — Navigator closes in unpredictable way
    // — Many sections of the have have no default central content so without
    // navigator is looks like something is broken
    // Should consifer if we want to fix this
    // setMetadata(workbench.metadata.NavigationExpandedDefault, false)
    navigate({
      path: config.INITIAL_URL.split('/')
    })
  } else if (last !== null) {
    navigate(JSON.parse(last))
  } else {
    navigate({ path: [] })
  }

  console.log('Initial location is: ', getCurrentLocation())

  return new PlatformParameters(new PlatformBranding(title))
}
