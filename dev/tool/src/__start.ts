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

import { prepareTools as prepareToolsRaw } from '@opensrcs/server-tool'

import { type Data, type Tx, type Version } from '@opensrcs/core'
import { type MigrateOperation } from '@opensrcs/model'
import builder, { getModelVersion, migrateOperations } from '@opensrcs/model-all'
import { devTool } from '.'

import { addLocation } from '@opensrcs/club'
import { serverActivityId } from '@opensrcs/server-activity'
import { serverAiBotId } from '@opensrcs/server-ai-bot'
import { serverAttachmentId } from '@opensrcs/server-attachment'
import { serverCalendarId } from '@opensrcs/server-calendar'
import { serverCardId } from '@opensrcs/server-card'
import { serverChunterId } from '@opensrcs/server-chunter'
import { serverCollaborationId } from '@opensrcs/server-collaboration'
import { serverContactId } from '@opensrcs/server-contact'
import { serverDocumentId } from '@opensrcs/server-document'
import { serverDriveId } from '@opensrcs/server-drive'
import { serverGmailId } from '@opensrcs/server-gmail'
import { serverGuestId } from '@opensrcs/server-guest'
import { serverHrId } from '@opensrcs/server-hr'
import { serverInventoryId } from '@opensrcs/server-inventory'
import { serverLeadId } from '@opensrcs/server-lead'
import { serverNotificationId } from '@opensrcs/server-notification'
import { serverRecruitId } from '@opensrcs/server-recruit'
import { serverRequestId } from '@opensrcs/server-request'
import { serverSettingId } from '@opensrcs/server-setting'
import { serverTagsId } from '@opensrcs/server-tags'
import { serverTaskId } from '@opensrcs/server-task'
import { serverTelegramId } from '@opensrcs/server-telegram'
import { serverTimeId } from '@opensrcs/server-time'
import { serverTrackerId } from '@opensrcs/server-tracker'
import { serverViewId } from '@opensrcs/server-view'

addLocation(serverActivityId, () => import('@opensrcs/server-activity-resources'))
addLocation(serverAttachmentId, () => import('@opensrcs/server-attachment-resources'))
addLocation(serverCollaborationId, () => import('@opensrcs/server-collaboration-resources'))
addLocation(serverContactId, () => import('@opensrcs/server-contact-resources'))
addLocation(serverNotificationId, () => import('@opensrcs/server-notification-resources'))
addLocation(serverChunterId, () => import('@opensrcs/server-chunter-resources'))
addLocation(serverInventoryId, () => import('@opensrcs/server-inventory-resources'))
addLocation(serverLeadId, () => import('@opensrcs/server-lead-resources'))
addLocation(serverRecruitId, () => import('@opensrcs/server-recruit-resources'))
addLocation(serverSettingId, () => import('@opensrcs/server-setting-resources'))
addLocation(serverTaskId, () => import('@opensrcs/server-task-resources'))
addLocation(serverTrackerId, () => import('@opensrcs/server-tracker-resources'))
addLocation(serverTagsId, () => import('@opensrcs/server-tags-resources'))
addLocation(serverCardId, () => import('@opensrcs/server-card-resources'))
addLocation(serverCalendarId, () => import('@opensrcs/server-calendar-resources'))
addLocation(serverGmailId, () => import('@opensrcs/server-gmail-resources'))
addLocation(serverTelegramId, () => import('@opensrcs/server-telegram-resources'))
addLocation(serverHrId, () => import('@opensrcs/server-hr-resources'))
addLocation(serverRequestId, () => import('@opensrcs/server-request-resources'))
addLocation(serverViewId, () => import('@opensrcs/server-view-resources'))
addLocation(serverDocumentId, () => import('@opensrcs/server-document-resources'))
addLocation(serverTimeId, () => import('@opensrcs/server-time-resources'))
addLocation(serverGuestId, () => import('@opensrcs/server-guest-resources'))
addLocation(serverDriveId, () => import('@opensrcs/server-drive-resources'))
addLocation(serverAiBotId, () => import('@opensrcs/server-ai-bot-resources'))

function prepareTools (): {
  dbUrl: string
  txes: Tx[]
  version: Data<Version>
  migrateOperations: [string, MigrateOperation][]
} {
  return { ...prepareToolsRaw(builder().getTxes()), version: getModelVersion(), migrateOperations }
}

export function getMongoDBUrl (): string {
  const url = process.env.MONGO_URL
  if (url === undefined) {
    console.error('please provide mongo DB URL')
    process.exit(1)
  }
  return url
}

export function getAccountDBUrl (): string {
  const url = process.env.ACCOUNT_DB_URL
  if (url === undefined) {
    console.error('please provide mongo ACCOUNT_DB_URL')
    process.exit(1)
  }
  return url
}

export function getKvsUrl (): string {
  const url = process.env.KVS_URL
  if (url === undefined) {
    console.error('please provide KVS_URL')
    process.exit(1)
  }
  return url
}

devTool(prepareTools)
