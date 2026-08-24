import { addLocation } from '@opensrcs/club'
import { serverActivityId } from '@opensrcs/server-activity'
import { serverAttachmentId } from '@opensrcs/server-attachment'
import { serverCardId } from '@opensrcs/server-card'
import { serverCalendarId } from '@opensrcs/server-calendar'
import { serverChunterId } from '@opensrcs/server-chunter'
import { serverCollaborationId } from '@opensrcs/server-collaboration'
import { serverContactId } from '@opensrcs/server-contact'
import { serverDocumentsId } from '@opensrcs/server-controlled-documents'
import { serverDocumentId } from '@opensrcs/server-document'
import { serverDriveId } from '@opensrcs/server-drive'
import { serverGithubId } from '@opensrcs/server-github'
import { serverGmailId } from '@opensrcs/server-gmail'
import { serverGuestId } from '@opensrcs/server-guest'
import { serverHrId } from '@opensrcs/server-hr'
import { serverInventoryId } from '@opensrcs/server-inventory'
import { serverLeadId } from '@opensrcs/server-lead'
import { serverLoveId } from '@opensrcs/server-love'
import { serverNotificationId } from '@opensrcs/server-notification'
import { serverRecruitId } from '@opensrcs/server-recruit'
import { serverRequestId } from '@opensrcs/server-request'
import { serverSettingId } from '@opensrcs/server-setting'
import { serverTagsId } from '@opensrcs/server-tags'
import { serverTaskId } from '@opensrcs/server-task'
import { serverTelegramId } from '@opensrcs/server-telegram'
import { serverTimeId } from '@opensrcs/server-time'
import { serverTrackerId } from '@opensrcs/server-tracker'
import { serverTrainingId } from '@opensrcs/server-training'
import { serverViewId } from '@opensrcs/server-view'
import { serverAiBotId } from '@opensrcs/server-ai-bot'
import { serverProcessId } from '@opensrcs/server-process'

export function registerServerPlugins (): void {
  addLocation(serverActivityId, () => import('@opensrcs/server-activity-resources'))
  addLocation(serverAttachmentId, () => import('@opensrcs/server-attachment-resources'))
  addLocation(serverCollaborationId, () => import('@opensrcs/server-collaboration-resources'))
  addLocation(serverContactId, () => import('@opensrcs/server-contact-resources'))
  addLocation(serverNotificationId, () => import('@opensrcs/server-notification-resources'))
  addLocation(serverSettingId, () => import('@opensrcs/server-setting-resources'))
  addLocation(serverChunterId, () => import('@opensrcs/server-chunter-resources'))
  addLocation(serverInventoryId, () => import('@opensrcs/server-inventory-resources'))
  addLocation(serverLeadId, () => import('@opensrcs/server-lead-resources'))
  addLocation(serverRecruitId, () => import('@opensrcs/server-recruit-resources'))
  addLocation(serverTaskId, () => import('@opensrcs/server-task-resources'))
  addLocation(serverTrackerId, () => import('@opensrcs/server-tracker-resources'))
  addLocation(serverTagsId, () => import('@opensrcs/server-tags-resources'))
  addLocation(serverCardId, () => import('@opensrcs/server-card-resources'))
  addLocation(serverCalendarId, () => import('@opensrcs/server-calendar-resources'))
  addLocation(serverGmailId, () => import('@opensrcs/server-gmail-resources'))
  addLocation(serverTelegramId, () => import('@opensrcs/server-telegram-resources'))
  addLocation(serverRequestId, () => import('@opensrcs/server-request-resources'))
  addLocation(serverViewId, () => import('@opensrcs/server-view-resources'))
  addLocation(serverHrId, () => import('@opensrcs/server-hr-resources'))
  addLocation(serverLoveId, () => import('@opensrcs/server-love-resources'))
  addLocation(serverGuestId, () => import('@opensrcs/server-guest-resources'))
  addLocation(serverDocumentId, () => import('@opensrcs/server-document-resources'))
  addLocation(serverTimeId, () => import('@opensrcs/server-time-resources'))
  addLocation(serverDriveId, () => import('@opensrcs/server-drive-resources'))
  addLocation(serverDocumentsId, () => import('@opensrcs/server-controlled-documents-resources'))
  addLocation(serverTrainingId, () => import('@opensrcs/server-training-resources'))
  addLocation(serverGithubId, () => import('@opensrcs/server-github-resources'))
  addLocation(serverAiBotId, () => import('@opensrcs/server-ai-bot-resources'))
  addLocation(serverProcessId, () => import('@opensrcs/server-process-resources'))
}
