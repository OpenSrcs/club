<!--
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
-->

<script lang="ts">
  import { taskTypeStore } from '@opensrcs/task-resources'
  import { Issue } from '@opensrcs/tracker'
  import { IconSize } from '@opensrcs/ui'
  import { getTaskTypeStates } from '@opensrcs/task'
  import { statusStore } from '@opensrcs/view-resources'

  import IssueStatusIcon from './IssueStatusIcon.svelte'

  export let value: Issue | undefined
  export let size: IconSize = 'small'

  $: statuses = value ? getTaskTypeStates(value.kind, $taskTypeStore, $statusStore.byId) : []

  $: issueStatus = statuses?.find((status) => status._id === value?.status) ?? statuses[0]
</script>

{#if value}
  <IssueStatusIcon value={issueStatus} taskType={value.kind} {size} space={value.space} />
{/if}
