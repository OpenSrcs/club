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

import { type Metadata, type Plugin, plugin } from '@opensrcs/club'

import type { Class, Mixin, Ref } from '@opensrcs/core'
import type { ObjectDDParticipant, SearchPresenter, Trigger } from './types'

/**
 * @public
 */
export const serverCoreId = 'server-core' as Plugin

/**
 * @public
 */
const serverCore = plugin(serverCoreId, {
  class: {
    Trigger: '' as Ref<Class<Trigger>>
  },
  mixin: {
    ObjectDDParticipant: '' as Ref<ObjectDDParticipant>,
    SearchPresenter: '' as Ref<Mixin<SearchPresenter>>
  },
  metadata: {
    FrontUrl: '' as Metadata<string>,
    FilesUrl: '' as Metadata<string>,
    ElasticIndexName: '' as Metadata<string>,
    ElasticIndexVersion: '' as Metadata<string>
  }
})

export default serverCore
