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

import { DatalakeStorage } from './datalake'
import { FrontStorage } from './front'
import { ClublakeStorage } from './clublake'

import { FileStorage } from '../types'

/** @public */
export interface FileStorageConfig {
  uploadUrl: string
  datalakeUrl?: string
  clublakeUrl?: string
}

/** @public */
export function createFileStorage (config: FileStorageConfig): FileStorage {
  const { uploadUrl, datalakeUrl, clublakeUrl } = config

  if (datalakeUrl !== undefined && datalakeUrl !== '') {
    console.debug('Using Datalake storage')
    return new DatalakeStorage(datalakeUrl)
  }

  if (clublakeUrl !== undefined && clublakeUrl !== '') {
    console.debug('Using Clublake storage')
    return new ClublakeStorage(clublakeUrl)
  }

  console.debug('Using Front storage')
  return new FrontStorage(uploadUrl)
}
