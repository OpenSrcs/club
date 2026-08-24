//
// Copyright © 2026 OpenSrcs.
//
//

import client, { ClientSocket } from '@opensrcs/client'
import clientResources from '@opensrcs/client-resources'
import { Client, ClientConnectEvent, systemAccountUuid, WorkspaceUuid, type MeasureContext } from '@opensrcs/core'
import { setMetadata } from '@opensrcs/club'
import { getTransactorEndpoint } from '@opensrcs/server-client'
import { generateToken } from '@opensrcs/server-token'
import WebSocket from 'ws'
import config from './config'

/**
 * @public
 */
export async function createPlatformClient (
  ctx: MeasureContext,
  workspace: WorkspaceUuid,
  timeout: number,
  reconnect?: (event: ClientConnectEvent, data: any) => Promise<void>
): Promise<{ client: Client, endpoint: string }> {
  setMetadata(client.metadata.ClientSocketFactory, (url) => {
    return new WebSocket(url, {
      headers: {
        'User-Agent': config.ServiceID
      }
    }) as never as ClientSocket
  })

  const token = generateToken(systemAccountUuid, workspace, { service: 'github', mode: 'github' })
  setMetadata(client.metadata.UseBinaryProtocol, true)
  setMetadata(client.metadata.UseProtocolCompression, true)
  setMetadata(client.metadata.ConnectionTimeout, timeout)
  setMetadata(client.metadata.FilterModel, 'client')
  const endpoint = await getTransactorEndpoint(token)
  const connection = await (
    await clientResources()
  ).function.GetClient(token, endpoint, {
    ctx,
    onConnect: reconnect,
    useGlobalRPCHandler: true
  })

  return { client: connection, endpoint }
}
