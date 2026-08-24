//
// Copyright © 2026 OpenSrcs.
//
//

import { type Builder } from '@opensrcs/model'

import core, { type Class, type Doc } from '@opensrcs/core'
import document from '@opensrcs/document'
import serverCore, { type ObjectDDParticipant } from '@opensrcs/server-core'
import serverDocument from '@opensrcs/server-document'
import serverNotification from '@opensrcs/server-notification'
import serverView from '@opensrcs/server-view'

export { serverDocumentId } from '@opensrcs/server-document'

export function createModel (builder: Builder): void {
  builder.mixin(document.class.Document, core.class.Class, serverNotification.mixin.HTMLPresenter, {
    presenter: serverDocument.function.DocumentHTMLPresenter
  })

  builder.mixin(document.class.Document, core.class.Class, serverNotification.mixin.TextPresenter, {
    presenter: serverDocument.function.DocumentTextPresenter
  })

  builder.mixin(document.class.Document, core.class.Class, serverView.mixin.ServerLinkIdProvider, {
    encode: serverDocument.function.DocumentLinkIdProvider
  })

  builder.mixin(document.class.Document, core.class.Class, serverCore.mixin.SearchPresenter, {
    iconConfig: {
      component: document.component.DocumentSearchIcon,
      fields: [['icon'], ['color']]
    },
    title: [['title']]
  })

  builder.mixin<Class<Doc>, ObjectDDParticipant>(
    document.class.Document,
    core.class.Class,
    serverCore.mixin.ObjectDDParticipant,
    {
      collectDocs: serverDocument.function.FindChildDocuments
    }
  )
}
