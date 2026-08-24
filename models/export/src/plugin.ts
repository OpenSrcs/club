//
// Copyright © 2026 OpenSrcs.
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

import { mergeIds } from '@opensrcs/club'
import { exportId } from '@opensrcs/export'
import { type ComponentPointExtension } from '@opensrcs/presentation'
import { type Ref } from '@opensrcs/core'
import exportPlugin from '@opensrcs/export-resources/src/plugin'

export default mergeIds(exportId, exportPlugin, {
  extensions: {
    ExportButton: '' as Ref<ComponentPointExtension>
  }
})
