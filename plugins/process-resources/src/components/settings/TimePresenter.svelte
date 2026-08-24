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
  import core from '@opensrcs/core'
  import { getClient } from '@opensrcs/presentation'
  import { parseContext, Process } from '@opensrcs/process'
  import { Component } from '@opensrcs/ui'
  import view from '@opensrcs/view'
  import { getContext } from '../../utils'
  import ContextValuePresenter from '../attributeEditors/ContextValuePresenter.svelte'

  export let process: Process
  export let params: Record<string, any>

  const client = getClient()
  const h = client.getHierarchy()
  $: context = getContext(client, process, core.class.TypeDate, 'attribute')

  $: contextValue = parseContext(params.value)
</script>

{#if contextValue && context}
  <ContextValuePresenter {contextValue} {context} {process} />
{:else}
  <Component is={view.component.DatePresenter} props={{ value: params.value, readonly: true }} />
{/if}
