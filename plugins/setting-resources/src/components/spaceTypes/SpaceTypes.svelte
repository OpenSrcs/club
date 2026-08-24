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
  import { Ref, SpaceType, WithLookup } from '@opensrcs/core'
  import { Icon, Label, IconOpenedArrow } from '@opensrcs/ui'
  import { createEventDispatcher } from 'svelte'
  import setting from '../../plugin'

  export let selectedTypeId: Ref<SpaceType> | undefined
  export let types: WithLookup<SpaceType>[] = []

  const dispatch = createEventDispatcher()

  function handleSelected (type: SpaceType): void {
    selectedTypeId = type._id

    dispatch('change', selectedTypeId)
  }
</script>

{#each types as type}
  {@const descriptor = type.$lookup?.descriptor}
  {@const dIcon = descriptor?.icon === '' || descriptor?.icon == null ? setting.icon.Setting : descriptor.icon}
  <button
    class="clubTaskNavLink-container font-regular-14"
    class:selected={type._id === selectedTypeId}
    on:click={() => {
      handleSelected(type)
    }}
  >
    <div class="clubTaskNavLink-avatar">
      <div class="clubTaskNavLink-icon">
        {#if dIcon}
          <Icon icon={dIcon} size="small" fill="currentColor" />
        {/if}
      </div>
    </div>
    {#if descriptor}
      <div class="clubTaskNavLink-content">
        <span class="clubTaskNavLink-content__title">{type.name}</span>
        <span class="clubTaskNavLink-content__descriptor">
          <Label label={descriptor.name} />
        </span>
      </div>
    {/if}
    {#if type._id === selectedTypeId}
      <div class="clubTaskNavLink-icon right">
        <IconOpenedArrow size={'small'} />
      </div>
    {/if}
  </button>
{/each}

<style lang="scss">
  .clubTaskNavLink-container {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    gap: 0.75rem;
    padding: 0 0.75rem 0 0.5rem;
    height: 3.5rem;
    min-width: 0;
    border: none;
    border-radius: 0.375rem;
    outline: none;

    &.selected {
      cursor: auto;
    }
    .clubTaskNavLink-avatar {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-shrink: 0;
      width: 2.5rem;
      height: 2.5rem;
      min-width: 0;
      background-color: var(--global-ui-BackgroundColor);
      border-radius: 0.375rem;
    }
    .clubTaskNavLink-icon {
      flex-shrink: 0;
      width: 1rem;
      height: 1rem;
      color: var(--global-secondary-TextColor);

      &.right {
        visibility: hidden;
      }
    }
    .clubTaskNavLink-content {
      display: flex;
      flex-direction: column;
      gap: 0.125rem;
      flex-grow: 1;
      min-width: 0;
      min-height: 0;

      &__title,
      &__descriptor {
        white-space: nowrap;
        word-break: break-all;
        text-overflow: ellipsis;
        overflow: hidden;
        text-align: left;
        min-width: 0;
      }
      &__title {
        color: var(--global-primary-TextColor);
      }
      &__descriptor {
        color: var(--global-secondary-TextColor);
      }
    }

    &:hover {
      background-color: var(--global-ui-hover-highlight-BackgroundColor);
    }
    &.selected {
      background-color: var(--global-ui-highlight-BackgroundColor);

      .clubTaskNavLink-icon {
        color: var(--global-accent-TextColor);

        &.right {
          visibility: visible;
        }
      }
      .clubTaskNavLink-content .clubTaskNavLink-content__title {
        font-weight: 700;
        color: var(--global-accent-TextColor);
      }
      .clubTaskNavLink-content .clubTaskNavLink-content__descriptor {
        color: var(--global-primary-TextColor);
      }
    }
  }
</style>
