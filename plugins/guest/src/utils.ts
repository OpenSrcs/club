//
// Copyright © 2026 OpenSrcs.
//

import core, { Doc, TxOperations } from '@opensrcs/core'
import { type Location } from '@opensrcs/ui'

import guest from './index'

export async function createPublicLink (
  client: TxOperations,
  object: Doc,
  location: Location,
  revokable: boolean = true
): Promise<void> {
  await client.createDoc(guest.class.PublicLink, core.space.Workspace, {
    attachedTo: object._id,
    location,
    revokable,
    restrictions: {
      readonly: true,
      disableNavigation: true,
      disableActions: true,
      disableComments: true
    },
    url: ''
  })
}
