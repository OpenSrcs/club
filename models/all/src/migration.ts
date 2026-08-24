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

// Import migrate operations.
import { type MigrateOperation } from '@opensrcs/model'
import { activityOperation } from '@opensrcs/model-activity'
import { aiBotId, aiBotOperation } from '@opensrcs/model-ai-bot'
import { analyticsCollectorOperation } from '@opensrcs/model-analytics-collector'
import { attachmentOperation } from '@opensrcs/model-attachment'
import { bitrixOperation } from '@opensrcs/model-bitrix'
import { boardOperation } from '@opensrcs/model-board'
import { calendarOperation } from '@opensrcs/model-calendar'
import { cardOperation } from '@opensrcs/model-card'
import { chatId, chatOperation } from '@opensrcs/model-chat'
import { chunterOperation } from '@opensrcs/model-chunter'
import { communicationId, communicationOperation } from '@opensrcs/model-communication'
import { contactOperation } from '@opensrcs/model-contact'
import { documentsOperation } from '@opensrcs/model-controlled-documents'
import { coreOperation } from '@opensrcs/model-core'
import { documentOperation } from '@opensrcs/model-document'
import { driveOperation } from '@opensrcs/model-drive'
import { githubOperation, githubOperationPreTime } from '@opensrcs/model-github'
import { gmailOperation } from '@opensrcs/model-gmail'
import { guestOperation } from '@opensrcs/model-guest'
import { hrOperation } from '@opensrcs/model-hr'
import { inboxId, inboxOperation } from '@opensrcs/model-inbox'
import { inventoryOperation } from '@opensrcs/model-inventory'
import { leadOperation } from '@opensrcs/model-lead'
import { loveId, loveOperation } from '@opensrcs/model-love'
import { notificationOperation } from '@opensrcs/model-notification'
import { preferenceOperation } from '@opensrcs/model-preference'
import { processId, processOperation } from '@opensrcs/model-process'
import { productsOperation } from '@opensrcs/model-products'
import { questionsOperation } from '@opensrcs/model-questions'
import { ratingOperation } from '@opensrcs/model-rating'
import { recorderId, recorderOperation } from '@opensrcs/model-recorder'
import { recruitOperation } from '@opensrcs/model-recruit'
import { requestOperation } from '@opensrcs/model-request'
import { activityServerOperation } from '@opensrcs/model-server-activity'
import { settingOperation } from '@opensrcs/model-setting'
import { surveyOperation } from '@opensrcs/model-survey'
import { tagsOperation } from '@opensrcs/model-tags'
import { taskOperation } from '@opensrcs/model-task'
import { telegramOperation } from '@opensrcs/model-telegram'
import { templatesOperation } from '@opensrcs/model-templates'
import { testManagementOperation } from '@opensrcs/model-test-management'
import { textEditorOperation } from '@opensrcs/model-text-editor'
import { timeOperation } from '@opensrcs/model-time'
import { trackerOperation } from '@opensrcs/model-tracker'
import { trainingOperation } from '@opensrcs/model-training'
import { viewOperation } from '@opensrcs/model-view'
import { workbenchOperation } from '@opensrcs/model-workbench'

export const migrateOperations: [string, MigrateOperation][] = [
  ['core', coreOperation],
  ['rating', ratingOperation],
  ['activity', activityOperation],
  ['card', cardOperation],
  ['chunter', chunterOperation],
  ['calendar', calendarOperation],
  ['gmail', gmailOperation],
  ['templates', templatesOperation],
  ['telegram', telegramOperation],
  ['task', taskOperation],
  ['attachment', attachmentOperation],
  ['lead', leadOperation],
  ['preference', preferenceOperation],
  ['recruit', recruitOperation],
  ['view', viewOperation],
  ['contact', contactOperation],
  ['guest', guestOperation],
  ['tags', tagsOperation],
  ['setting', settingOperation],
  ['tracker', trackerOperation],
  ['documents', documentsOperation],
  ['questions', questionsOperation],
  ['training', trainingOperation],
  ['request', requestOperation],
  ['products', productsOperation],
  ['board', boardOperation],
  ['hr', hrOperation],
  ['document', documentOperation],
  ['drive', driveOperation],
  ['bitrix', bitrixOperation],
  ['inventiry', inventoryOperation],
  ['github', githubOperation],
  ['pre-time', githubOperationPreTime],
  ['time', timeOperation],
  [loveId, loveOperation],
  ['activityServer', activityServerOperation],
  ['textEditorOperation', textEditorOperation],
  // We should call notification migration after activityServer and chunter
  ['notification', notificationOperation],
  ['analyticsCollector', analyticsCollectorOperation],
  ['workbench', workbenchOperation],
  ['testManagement', testManagementOperation],
  ['survey', surveyOperation],
  [aiBotId, aiBotOperation],
  [chatId, chatOperation],
  [inboxId, inboxOperation],
  [processId, processOperation],
  [communicationId, communicationOperation],
  [recorderId, recorderOperation]
]
