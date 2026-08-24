//
// Copyright © 2026 OpenSrcs.
//
//

import { Doc } from '@opensrcs/core'
import type { Plugin, Resource } from '@opensrcs/club'
import { plugin } from '@opensrcs/club'
import { ObjectDDParticipantFunc } from '@opensrcs/server-core'
import { Presenter } from '@opensrcs/server-notification'

/**
 * @public
 */
export const serverDocumentId = 'server-document' as Plugin

/**
 * @public
 */
export default plugin(serverDocumentId, {
  function: {
    DocumentHTMLPresenter: '' as Resource<Presenter>,
    DocumentTextPresenter: '' as Resource<Presenter>,
    DocumentLinkIdProvider: '' as Resource<(doc: Doc) => Promise<string>>,
    FindChildDocuments: '' as Resource<ObjectDDParticipantFunc>
  }
})
