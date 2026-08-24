//
// Copyright @ 2024 OpenSrcs.
//

import type { Doc } from '@opensrcs/core'
import { getClient } from '@opensrcs/presentation'
import { getPanelURI } from '@opensrcs/ui'
import view, { type ObjectPanel } from '@opensrcs/view'

export function getPanelFragment<T extends Doc> (object: Pick<T, '_class' | '_id'>): string {
  const hierarchy = getClient().getHierarchy()
  const objectPanelMixin = hierarchy.classHierarchyMixin<Doc, ObjectPanel>(object._class, view.mixin.ObjectPanel)
  const component = objectPanelMixin?.component ?? view.component.EditDoc
  return getPanelURI(component, object._id, object._class, 'content')
}
