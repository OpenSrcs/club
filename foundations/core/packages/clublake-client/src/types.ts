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

import { RetryOptions } from '@opensrcs/retry'

export interface ClublakeClient {
  head: (workspace: string, key: string, retryOptions?: RetryOptions) => Promise<ClubResponse<void>>
  get: (
    workspace: string,
    key: string,
    retryOptions?: RetryOptions
  ) => Promise<ClubResponse<ReadableStream<Uint8Array>>>
  partial: (
    workspace: string,
    key: string,
    offset: number,
    length?: number,
    retryOptions?: RetryOptions
  ) => Promise<ClubResponse<ReadableStream<Uint8Array>>>
  put: (
    workspace: string,
    key: string,
    body: Body,
    opts: PutOptions,
    retryOptions?: RetryOptions
  ) => Promise<ClubResponse<void>>
  patch: (
    workspace: string,
    key: string,
    body: Body,
    opts: PatchOptions,
    retryOptions?: RetryOptions
  ) => Promise<ClubResponse<void>>
  delete: (workspace: string, key: string, retryOptions?: RetryOptions) => Promise<ClubResponse<void>>

  objectUrl: (workspace: string, key: string) => string
}

export interface ClublakeWorkspaceClient {
  head: (key: string, retryOptions?: RetryOptions) => Promise<ClubResponse<void>>
  get: (key: string, retryOptions?: RetryOptions) => Promise<ClubResponse<ReadableStream<Uint8Array>>>
  put: (key: string, body: Body, opts: PutOptions, retryOptions?: RetryOptions) => Promise<ClubResponse<void>>
  patch: (key: string, body: Body, opts: PatchOptions, retryOptions?: RetryOptions) => Promise<ClubResponse<void>>
  delete: (key: string, retryOptions?: RetryOptions) => Promise<ClubResponse<void>>

  getJson: <T>(key: string, retryOptions?: RetryOptions) => Promise<ClubResponse<T>>
  putJson: <T extends object>(
    key: string,
    json: T,
    options?: Omit<PutOptions, 'mergeStrategy'>,
    retryOptions?: RetryOptions
  ) => Promise<ClubResponse<void>>
  patchJson: (
    key: string,
    body: JsonPatch[],
    options?: Omit<PatchOptions, 'contentType'>,
    retryOptions?: RetryOptions
  ) => Promise<ClubResponse<void>>
}

export type Body = ReadableStream | ArrayBuffer | Blob | string
export type MergeStrategy = 'concatenate' | 'jsonpatch'
export type ClubHeaders = Record<string, string>
export type ClubMeta = Record<string, string>

export type PutOptions =
  | {
    mergeStrategy?: 'concatenate'
    contentLength?: number
    contentType?: string
    headers?: ClubHeaders
    meta?: ClubMeta
  }
  | {
    mergeStrategy: 'jsonpatch'
    contentLength?: number
    headers?: ClubHeaders
    meta?: ClubMeta
  }

export interface PatchOptions {
  contentLength?: number
  contentType?: string
  headers?: ClubHeaders
  meta?: ClubMeta
}

export type JsonPatch =
  | { op: 'add', path: string, value: any }
  | { op: 'replace', path: string, value: any }
  | { op: 'remove', path: string }
  | { op: 'move', from: string, path: string }
  | { op: 'copy', from: string, path: string }
  | { op: 'test', path: string, value: any }
  | { hop: 'add', path: string, value: any, safe?: boolean }
  | { hop: 'inc', path: string, value: number, safe?: boolean }
  | { hop: 'remove', path: string, safe?: boolean }

export interface ClubResponse<Body = ArrayBuffer | string | any> {
  ok: boolean
  status: number
  etag?: string
  contentType?: string
  contentLength?: number
  lastModified?: number
  headers: Headers
  body?: Body
}
