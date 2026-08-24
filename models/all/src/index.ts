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

import core, { coreId, type Data, type PluginConfiguration, type Ref, type Tx, type Version } from '@opensrcs/core'

import { Builder } from '@opensrcs/model'
import { activityId, createModel as activityModel } from '@opensrcs/model-activity'
import { aiBotId, createModel as aiBotModel } from '@opensrcs/model-ai-bot'
import { attachmentId, createModel as attachmentModel } from '@opensrcs/model-attachment'
import bitrix, { bitrixId, createModel as bitrixModel } from '@opensrcs/model-bitrix'
import board, { boardId, createModel as boardModel } from '@opensrcs/model-board'
import calendar, { calendarId, createModel as calendarModel } from '@opensrcs/model-calendar'
import card, { cardId, createModel as cardModel } from '@opensrcs/model-card'
import chunter, { chunterId, createModel as chunterModel } from '@opensrcs/model-chunter'
import contact, { contactId, createModel as contactModel } from '@opensrcs/model-contact'
import { createModel as coreModel } from '@opensrcs/model-core'
import { desktopDownloadsId, createModel as desktopDownloadsModel } from '@opensrcs/model-desktop-downloads'
import { desktopPreferencesId, createModel as desktopPreferencesModel } from '@opensrcs/model-desktop-preferences'
import { driveId, createModel as driveModel } from '@opensrcs/model-drive'
import gmail, { gmailId, createModel as gmailModel } from '@opensrcs/model-gmail'
import { guestId, createModel as guestModel } from '@opensrcs/model-guest'
import hr, { hrId, createModel as hrModel } from '@opensrcs/model-hr'
import inventory, { inventoryId, createModel as inventoryModel } from '@opensrcs/model-inventory'
import lead, { leadId, createModel as leadModel } from '@opensrcs/model-lead'
import { mediaId, createModel as mediaModel } from '@opensrcs/model-media'
import notification, { notificationId, createModel as notificationModel } from '@opensrcs/model-notification'
import { preferenceId, createModel as preferenceModel } from '@opensrcs/model-preference'
import presentation, { presentationId, createModel as presentationModel } from '@opensrcs/model-presentation'
import rating, { ratingId, createModel as ratingModel } from '@opensrcs/model-rating'
import { recorderId, createModel as recorderModel } from '@opensrcs/model-recorder'
import recruit, { recruitId, createModel as recruitModel } from '@opensrcs/model-recruit'
import { requestId, createModel as requestModel } from '@opensrcs/model-request'
import { serverActivityId, createModel as serverActivityModel } from '@opensrcs/model-server-activity'
import { serverAiBotId, createModel as serverAiBotModel } from '@opensrcs/model-server-ai-bot'
import { serverAttachmentId, createModel as serverAttachmentModel } from '@opensrcs/model-server-attachment'
import { serverCalendarId, createModel as serverCalendarModel } from '@opensrcs/model-server-calendar'
import { serverCardId, createModel as serverCardModel } from '@opensrcs/model-server-card'
import { serverChunterId, createModel as serverChunterModel } from '@opensrcs/model-server-chunter'
import {
  serverCollaborationId,
  createModel as serverCollaborationModel
} from '@opensrcs/model-server-collaboration'
import { serverContactId, createModel as serverContactModel } from '@opensrcs/model-server-contact'
import { serverCoreId, createModel as serverCoreModel } from '@opensrcs/model-server-core'
import { serverDriveId, createModel as serverDriveModel } from '@opensrcs/model-server-drive'
import { serverGmailId, createModel as serverGmailModel } from '@opensrcs/model-server-gmail'
import { serverGuestId, createModel as serverGuestModel } from '@opensrcs/model-server-guest'
import { serverHrId, createModel as serverHrModel } from '@opensrcs/model-server-hr'
import { serverInventoryId, createModel as serverInventoryModel } from '@opensrcs/model-server-inventory'
import { serverLeadId, createModel as serverLeadModel } from '@opensrcs/model-server-lead'
import { serverNotificationId, createModel as serverNotificationModel } from '@opensrcs/model-server-notification'
import { serverRecruitId, createModel as serverRecruitModel } from '@opensrcs/model-server-recruit'
import { serverRequestId, createModel as serverRequestModel } from '@opensrcs/model-server-request'
import { serverSettingId, createModel as serveSettingModel } from '@opensrcs/model-server-setting'
import { serverTagsId, createModel as serverTagsModel } from '@opensrcs/model-server-tags'
import { serverTaskId, createModel as serverTaskModel } from '@opensrcs/model-server-task'
import { serverTelegramId, createModel as serverTelegramModel } from '@opensrcs/model-server-telegram'
import { serverTemplatesId, createModel as serverTemplatesModel } from '@opensrcs/model-server-templates'
import { serverTrackerId, createModel as serverTrackerModel } from '@opensrcs/model-server-tracker'
import { serverViewId, createModel as serverViewModel } from '@opensrcs/model-server-view'
import setting, { settingId, createModel as settingModel } from '@opensrcs/model-setting'
import { supportId, createModel as supportModel } from '@opensrcs/model-support'
import { tagsId, createModel as tagsModel } from '@opensrcs/model-tags'
import { taskId, createModel as taskModel } from '@opensrcs/model-task'
import telegram, { telegramId, createModel as telegramModel } from '@opensrcs/model-telegram'
import { templatesId, createModel as templatesModel } from '@opensrcs/model-templates'
import { textEditorId, createModel as textEditorModel } from '@opensrcs/model-text-editor'
import { timeId, createModel as timeModel } from '@opensrcs/model-time'
import tracker, { trackerId, createModel as trackerModel } from '@opensrcs/model-tracker'
import { uploaderId, createModel as uploaderModel } from '@opensrcs/model-uploader'
import view, { viewId, createModel as viewModel } from '@opensrcs/model-view'
import workbench, { workbenchId, createModel as workbenchModel } from '@opensrcs/model-workbench'
import { converterId, createModel as converterModel } from '@opensrcs/model-converter'

import document, { documentId, createModel as documentModel } from '@opensrcs/model-document'
import { serverDocumentId, createModel as serverDocumentModel } from '@opensrcs/model-server-document'

import github, { githubId, createModel as githubModel } from '@opensrcs/model-github'
import { serverGithubId, createModel as serverGithubModel } from '@opensrcs/server-github-model'

import { analyticsCollectorId, createModel as analyticsCollectorModel } from '@opensrcs/model-analytics-collector'
import { exportId, createModel as exportModel } from '@opensrcs/model-export'
import love, { loveId, createModel as loveModel } from '@opensrcs/model-love'
import { printId, createModel as printModel } from '@opensrcs/model-print'
import { serverLoveId, createModel as serverLoveModel } from '@opensrcs/model-server-love'
import { serverProcessId, createModel as serverProcessModel } from '@opensrcs/model-server-process'
import { serverTimeId, createModel as serverTimeModel } from '@opensrcs/model-server-time'

import aiAssistant, { aiAssistantId, createModel as aiAssistantModel } from '@opensrcs/model-ai-assistant'
import documents, { documentsId, createModel as documentsModel } from '@opensrcs/model-controlled-documents'
import { clubMailId, createModel as clubMailModel } from '@opensrcs/model-club-mail'
import { mailId, createModel as mailModel } from '@opensrcs/model-mail'
import products, { productsId, createModel as productsModel } from '@opensrcs/model-products'
import questions, { questionsId, createModel as questionsModel } from '@opensrcs/model-questions'
import { serverProductsId, createModel as serverProductsModel } from '@opensrcs/model-server-products'
import { serverTrainingId, createModel as serverTrainingModel } from '@opensrcs/model-server-training'
import testManagement, {
  testManagementId,
  createModel as testManagementModel
} from '@opensrcs/model-test-management'
import trainings, { trainingId, createModel as trainingModel } from '@opensrcs/model-training'

import { achievementId, createModel as achievementModel } from '@opensrcs/model-achievement'
import { billingId, createModel as billingModel } from '@opensrcs/model-billing'
import chat, { chatId, createModel as chatModel } from '@opensrcs/model-chat'
import { communicationId, createModel as communicationModel } from '@opensrcs/model-communication'
import { emojiId, createModel as emojiModel } from '@opensrcs/model-emoji'
import { inboxId, createModel as inboxModel } from '@opensrcs/model-inbox'
import { presenceId, createModel as presenceModel } from '@opensrcs/model-presence'
import processes, { processId, createModel as processModel } from '@opensrcs/model-process'
import {
  serverDocumentsId,
  createModel as serverDocumentsModel
} from '@opensrcs/model-server-controlled-documents'
import survey, { surveyId, createModel as surveyModel } from '@opensrcs/model-survey'
import { type Plugin } from '@opensrcs/club'

interface ConfigurablePlugin extends Omit<Data<PluginConfiguration>, 'pluginId' | 'transactions'> {}

type BuilderConfig = [(b: Builder) => void, Plugin] | [(b: Builder) => void, Plugin, ConfigurablePlugin | undefined]

export function getModelVersion (): Data<Version> {
  const rawVersion = (process.env.MODEL_VERSION ?? '0.6.0').replace('"', '').trim().replace('v', '').split('.')
  if (rawVersion.length === 3) {
    return {
      major: parseInt(rawVersion[0]),
      minor: parseInt(rawVersion[1]),
      patch: parseInt(rawVersion[2])
    }
  }
  return { major: 0, minor: 6, patch: 0 }
}

export type { MigrateOperation } from '@opensrcs/model'

/**
 * @public
 * @param enabled - a set of enabled plugins
 * @param disabled  - a set of disabled plugins
 * @returns
 */
export default function buildModel (): Builder {
  const builder = new Builder()

  const defaultFilter = [
    workbench.class.Application,
    presentation.class.ComponentPointExtension,
    presentation.class.ObjectSearchCategory,
    notification.class.NotificationGroup,
    view.class.Action,
    contact.class.ChannelProvider,
    setting.class.IntegrationType,
    setting.class.WorkspaceSettingCategory,
    setting.class.SettingsCategory,
    workbench.class.Widget
  ]

  const builders: BuilderConfig[] = [
    [coreModel, coreId],
    [activityModel, activityId],
    [attachmentModel, attachmentId],
    [guestModel, guestId],
    [tagsModel, tagsId],
    [viewModel, viewId],
    [workbenchModel, workbenchId],
    [
      cardModel,
      cardId,
      {
        label: card.string.Cards,
        description: card.string.ConfigDescription,
        enabled: true,
        beta: false,
        icon: card.icon.Card,
        classFilter: defaultFilter
      }
    ],
    [
      contactModel,
      contactId,
      {
        label: contact.string.ConfigLabel,
        description: contact.string.ConfigDescription,
        enabled: true,
        system: true,
        beta: false,
        icon: contact.icon.ContactApplication,
        classFilter: defaultFilter
      }
    ],
    [
      chunterModel,
      chunterId,
      {
        label: chunter.string.ConfigLabel,
        description: chunter.string.ConfigDescription,
        enabled: true,
        beta: false,
        icon: chunter.icon.Chunter,
        classFilter: [workbench.class.Application]
      }
    ],
    [taskModel, taskId],
    [
      calendarModel,
      calendarId,
      {
        label: calendar.string.ConfigLabel,
        description: calendar.string.ConfigDescription,
        enabled: true,
        beta: true,
        icon: calendar.icon.Calendar,
        classFilter: defaultFilter
      }
    ],
    [
      recruitModel,
      recruitId,
      {
        label: recruit.string.ConfigLabel,
        description: recruit.string.ConfigDescription,
        enabled: true,
        beta: false,
        icon: recruit.icon.RecruitApplication,
        classFilter: defaultFilter
      }
    ],
    [settingModel, settingId],
    [
      telegramModel,
      telegramId,
      {
        label: telegram.string.ConfigLabel,
        description: telegram.string.ConfigDescription,
        enabled: true,
        beta: true,
        icon: contact.icon.Telegram,
        classFilter: defaultFilter
      }
    ],
    [
      leadModel,
      leadId,
      {
        label: lead.string.ConfigLabel,
        description: lead.string.ConfigDescription,
        enabled: false,
        beta: true,
        icon: lead.icon.LeadApplication,
        classFilter: defaultFilter
      }
    ],
    [
      gmailModel,
      gmailId,
      {
        label: gmail.string.ConfigLabel,
        description: gmail.string.ConfigDescription,
        enabled: true,
        beta: true,
        icon: contact.icon.Email,
        classFilter: defaultFilter
      }
    ],
    [
      inventoryModel,
      inventoryId,
      {
        label: inventory.string.ConfigLabel,
        description: inventory.string.ConfigDescription,
        enabled: false,
        beta: true,
        icon: inventory.icon.InventoryApplication,
        classFilter: defaultFilter
      }
    ],
    [presentationModel, presentationId],
    [templatesModel, templatesId],
    [textEditorModel, textEditorId],
    [uploaderModel, uploaderId],
    [recorderModel, recorderId],
    [mediaModel, mediaId],
    [notificationModel, notificationId],
    [preferenceModel, preferenceId],
    [analyticsCollectorModel, analyticsCollectorId],
    [
      hrModel,
      hrId,
      {
        label: hr.string.ConfigLabel,
        description: hr.string.ConfigDescription,
        enabled: true,
        beta: true,
        icon: hr.icon.Structure,
        classFilter: defaultFilter
      }
    ],
    [
      trackerModel,
      trackerId,
      {
        label: tracker.string.ConfigLabel,
        description: tracker.string.ConfigDescription,
        enabled: true,
        beta: false,
        icon: tracker.icon.TrackerApplication,
        classFilter: defaultFilter
      }
    ],
    [
      documentModel,
      documentId,
      {
        label: document.string.ConfigLabel,
        description: document.string.ConfigDescription,
        enabled: true,
        beta: false,
        icon: document.icon.DocumentApplication,
        classFilter: defaultFilter
      }
    ],
    [
      boardModel,
      boardId,
      {
        label: board.string.ConfigLabel,
        description: board.string.ConfigDescription,
        enabled: false,
        beta: true,
        hidden: true,
        icon: board.icon.Board,
        classFilter: defaultFilter
      }
    ],
    [
      bitrixModel,
      bitrixId,
      {
        label: bitrix.string.ConfigLabel,
        description: bitrix.string.ConfigDescription,
        enabled: false,
        beta: true,
        hidden: true,
        icon: bitrix.icon.Bitrix,
        classFilter: defaultFilter
      }
    ],
    [
      requestModel,
      requestId,
      {
        label: setting.string.Configure,
        // description: request.string.ConfigDescription,
        enabled: false,
        beta: false,
        hidden: true,
        classFilter: defaultFilter
      }
    ],
    [timeModel, timeId],
    [supportModel, supportId],
    [desktopPreferencesModel, desktopPreferencesId],
    [desktopDownloadsModel, desktopDownloadsId],

    [
      githubModel,
      githubId,
      {
        label: github.string.ConfigLabel,
        description: github.string.ConfigDescription,
        enabled: true,
        beta: false,
        icon: github.icon.Github,
        classFilter: defaultFilter
      }
    ],
    [
      loveModel,
      loveId,
      {
        label: love.string.Office,
        description: love.string.LoveDescription,
        enabled: true,
        beta: false,
        icon: love.icon.Love,
        classFilter: defaultFilter
      }
    ],
    [printModel, printId],
    [exportModel, exportId],
    [aiBotModel, aiBotId],
    [
      processModel,
      processId,
      {
        label: processes.string.ConfigLabel,
        description: processes.string.ConfigDescription,
        enabled: true,
        beta: false,
        icon: processes.icon.Process,
        classFilter: defaultFilter
      }
    ],
    [driveModel, driveId],
    [
      documentsModel,
      documentsId,
      {
        label: documents.string.ConfigLabel,
        description: documents.string.ConfigDescription,
        enabled: false,
        beta: false,
        icon: documents.icon.DocumentApplication,
        classFilter: defaultFilter
      }
    ],
    [
      questionsModel,
      questionsId,
      {
        label: questions.string.ConfigLabel,
        description: questions.string.ConfigDescription,
        enabled: true,
        beta: false,
        icon: questions.icon.Question,
        classFilter: defaultFilter
      }
    ],
    [
      trainingModel,
      trainingId,
      {
        label: trainings.string.ConfigLabel,
        description: trainings.string.ConfigDescription,
        enabled: false,
        beta: false,
        icon: trainings.icon.TrainingApplication,
        classFilter: defaultFilter
      }
    ],
    [
      productsModel,
      productsId,
      {
        label: products.string.ConfigLabel,
        description: products.string.ConfigDescription,
        enabled: false,
        beta: false,
        icon: products.icon.ProductsApplication,
        classFilter: defaultFilter
      }
    ],
    [
      testManagementModel,
      testManagementId,
      {
        label: testManagement.string.ConfigLabel,
        description: testManagement.string.ConfigDescription,
        enabled: true,
        beta: true,
        icon: testManagement.icon.TestManagementApplication,
        classFilter: defaultFilter
      }
    ],
    [
      surveyModel,
      surveyId,
      {
        label: survey.string.ConfigLabel,
        description: survey.string.ConfigDescription,
        enabled: false,
        beta: true,
        icon: survey.icon.Survey,
        classFilter: defaultFilter
      }
    ],
    [presenceModel, presenceId],
    [
      chatModel,
      chatId,
      { label: chat.string.Chat, hidden: true, enabled: false, beta: true, classFilter: defaultFilter }
    ],
    [inboxModel, inboxId],
    [achievementModel, achievementId],
    [emojiModel, emojiId],
    [communicationModel, communicationId],
    [mailModel, mailId],
    [
      billingModel,
      billingId,
      {
        label: setting.string.Configure,
        beta: false,
        system: true,
        enabled: true
      }
    ],
    [clubMailModel, clubMailId],
    [
      aiAssistantModel,
      aiAssistantId,
      {
        label: aiAssistant.string.ConfigLabel,
        description: aiAssistant.string.ConfigDescription,
        hidden: true,
        enabled: false,
        beta: true,
        classFilter: defaultFilter
      }
    ],
    [
      ratingModel,
      ratingId,
      {
        label: rating.string.Rating,
        description: rating.string.Rating,
        icon: rating.icon.Rating,
        hidden: false,
        enabled: false,
        beta: true,
        classFilter: defaultFilter
      }
    ],
    [converterModel, converterId],

    [serverCoreModel, serverCoreId],
    [serverAttachmentModel, serverAttachmentId],
    [serverCollaborationModel, serverCollaborationId],
    [serverContactModel, serverContactId],
    [serveSettingModel, serverSettingId],
    [serverChunterModel, serverChunterId],
    [serverInventoryModel, serverInventoryId],
    [serverLeadModel, serverLeadId],
    [serverTagsModel, serverTagsId],
    [serverTaskModel, serverTaskId],
    [serverTrackerModel, serverTrackerId],
    [serverCardModel, serverCardId],
    [serverCalendarModel, serverCalendarId],
    [serverRecruitModel, serverRecruitId],
    [serverGmailModel, serverGmailId],
    [serverTemplatesModel, serverTemplatesId],
    [serverTelegramModel, serverTelegramId],
    [serverHrModel, serverHrId],
    [serverNotificationModel, serverNotificationId],
    [serverRequestModel, serverRequestId],
    [serverViewModel, serverViewId],
    [serverActivityModel, serverActivityId],
    [serverDocumentModel, serverDocumentId],
    [serverGithubModel, serverGithubId],
    [serverLoveModel, serverLoveId],
    [serverTimeModel, serverTimeId],
    [serverGuestModel, serverGuestId],
    [serverDriveModel, serverDriveId],
    [serverProductsModel, serverProductsId],
    [serverTrainingModel, serverTrainingId],
    [serverDocumentsModel, serverDocumentsId],
    [serverAiBotModel, serverAiBotId],
    [serverProcessModel, serverProcessId]
  ]

  for (const [b, id, config] of builders) {
    const txes: Tx[] = []
    builder.onTx = (tx) => {
      txes.push(tx)
    }
    b(builder)
    builder.createDoc(
      core.class.PluginConfiguration,
      core.space.Model,
      {
        pluginId: id,
        transactions: txes.map((it) => it._id),
        ...config,
        label: config?.label ?? setting.string.Configure,
        hidden: config !== undefined ? config.hidden : true,
        enabled: (config?.enabled ?? true) && !(config?.hidden ?? false),
        beta: config?.beta ?? false
      },
      ('plugin-configuration-' + id) as Ref<PluginConfiguration>
    )
    builder.onTx = undefined
  }

  builder.createDoc(core.class.Version, core.space.Model, getModelVersion(), core.version.Model)
  return builder
}

// Export upgrade procedures
export { migrateOperations } from './migration'
