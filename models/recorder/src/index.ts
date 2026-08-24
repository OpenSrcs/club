//
// Copyright © 2026-2025 OpenSrcs.
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

import { type Builder } from '@opensrcs/model'
import core from '@opensrcs/model-core'
import presentation from '@opensrcs/model-presentation'
import uploader from '@opensrcs/uploader'
import workbench from '@opensrcs/workbench'

import recorder from './plugin'

export { recorderId } from '@opensrcs/recorder'
export { recorder as default }
export * from './migration'

export function createModel (builder: Builder): void {
  builder.createDoc(uploader.class.UploadHandlerDefinition, core.space.Model, {
    handler: recorder.function.Record,
    label: recorder.string.Record,
    icon: recorder.icon.Record,
    category: 'media',
    order: 1005
  })

  builder.createDoc(presentation.class.ComponentPointExtension, core.space.Model, {
    extension: workbench.extensions.WorkbenchExtensions,
    component: recorder.component.WorkbenchExtension
  })
}
