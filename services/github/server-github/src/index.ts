//
// Copyright © 2026, 2023 OpenSrcs.
//
//

import { Ref } from '@opensrcs/core'
import type { Metadata, Plugin, Resource } from '@opensrcs/club'
import { plugin } from '@opensrcs/club'
import { TriggerFunc } from '@opensrcs/server-core'
import { TodoDoneTester } from '@opensrcs/time'
import { GithubProject } from '@opensrcs/github'

/**
 * @public
 */
export const serverGithubId = 'server-github' as Plugin

/**
 * @public
 */
export default plugin(serverGithubId, {
  trigger: {
    OnProjectChanges: '' as Resource<TriggerFunc>,
    OnProjectRemove: '' as Resource<TriggerFunc>,
    OnGithubBroadcast: '' as Resource<TriggerFunc>
  },
  functions: {
    TodoDoneTester: '' as Resource<TodoDoneTester>
  },
  metadata: {
    GithubProjects: '' as Metadata<Set<Ref<GithubProject>>>
  }
})
