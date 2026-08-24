//
// Copyright © 2026 OpenSrcs.
//
//

import type { Plugin, Resource } from '@opensrcs/club'
import { plugin } from '@opensrcs/club'
import { TriggerFunc } from '@opensrcs/server-core'
import { Presenter, TypeMatchFunc } from '@opensrcs/server-notification'

/**
 * @public
 */
export const serverDocumentsId = 'server-documents' as Plugin

/**
 * @public
 */
export default plugin(serverDocumentsId, {
  trigger: {
    OnDocEnteredNonActionableState: '' as Resource<TriggerFunc>,
    OnDocPlannedEffectiveDateChanged: '' as Resource<TriggerFunc>,
    OnDocApprovalRequestApproved: '' as Resource<TriggerFunc>,
    OnDocHasBecomeEffective: '' as Resource<TriggerFunc>,
    OnDocTitleChanged: '' as Resource<TriggerFunc>
  },
  function: {
    ControlledDocumentTextPresenter: '' as Resource<Presenter>,
    ControlledDocumentHTMLPresenter: '' as Resource<Presenter>,
    CoAuthorsTypeMatch: '' as TypeMatchFunc,
    DocumentReviewedTypeMatch: '' as TypeMatchFunc
  }
})
