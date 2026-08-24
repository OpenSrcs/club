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
  import { onDestroy } from 'svelte'

  import { MasterTag } from '@opensrcs/card'
  import { WithLookup } from '@opensrcs/core'
  import { createQuery } from '@opensrcs/presentation'
  import setting from '@opensrcs/setting'
  import { clearSettingsStore, settingsStore } from '@opensrcs/setting-resources'
  import { ButtonIcon, Icon, IconAdd, Label, showPopup } from '@opensrcs/ui'
  import view, { type Viewlet } from '@opensrcs/view'

  import CreateView from './CreateView.svelte'
  import card from '../../../plugin'

  export let masterTag: MasterTag

  let viewlets: WithLookup<Viewlet>[] = []

  const query = createQuery()

  $: query.query(
    view.class.Viewlet,
    { attachTo: masterTag._id, variant: { $exists: false } },
    (res) => {
      viewlets = res
    },
    {
      lookup: {
        descriptor: view.class.ViewletDescriptor
      }
    }
  )

  function addRelation (): void {
    showPopup(CreateView, {
      tag: masterTag
    })
  }

  const handleSelect = (viewlet: Viewlet): void => {
    $settingsStore = { id: viewlet._id, component: card.component.EditView, props: { viewlet } }
  }
  onDestroy(() => {
    clearSettingsStore()
  })
</script>

<div class="clubTableAttr-header font-medium-12">
  <Icon icon={setting.icon.Views} size="small" />
  <span><Label label={card.string.Views} /></span>
  <ButtonIcon kind="primary" icon={IconAdd} size="small" dataId={'btnAdd'} on:click={addRelation} />
</div>
{#if viewlets.length}
  <div class="clubTableAttr-content task">
    {#each viewlets as viewlet}
      <button
        class="clubTableAttr-content__row justify-start"
        on:click|stopPropagation={() => {
          handleSelect(viewlet)
        }}
      >
        {#if viewlet.$lookup?.descriptor?.icon !== undefined}
          <div class="clubTableAttr-content__row-icon">
            <Icon icon={viewlet.$lookup?.descriptor?.icon} size="small" />
          </div>
        {/if}
        <div class="clubTableAttr-content__row-label font-medium-14 cursor-pointer">
          {#if viewlet.title !== undefined}
            <span>{viewlet.title}</span>
          {:else if viewlet.$lookup?.descriptor?.label !== undefined}
            <Label label={viewlet.$lookup?.descriptor?.label} />
          {/if}
        </div>
      </button>
    {/each}
  </div>
{/if}
