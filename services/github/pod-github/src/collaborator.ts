//
// Copyright © 2026 OpenSrcs.
//
//

import { CollaboratorClient, getClient as getCollaboratorClient } from '@opensrcs/collaborator-client'
import { systemAccountUuid, WorkspaceUuid } from '@opensrcs/core'
import { generateToken } from '@opensrcs/server-token'
import config from './config'

/**
 * @public
 */
export function createCollaboratorClient (workspaceId: WorkspaceUuid): CollaboratorClient {
  const token = generateToken(systemAccountUuid, workspaceId, { service: 'github', mode: 'github' })
  return getCollaboratorClient(workspaceId, token, config.CollaboratorURL)
}
