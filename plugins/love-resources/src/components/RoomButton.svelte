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
  import { getEmbeddedLabel } from '@opensrcs/club'
  import { Avatar, getPersonByPersonRefStore } from '@opensrcs/contact-resources'
  import { tooltip, deviceOptionsStore as deviceInfo, checkAdaptiveMatching } from '@opensrcs/ui'
  import { ParticipantInfo } from '@opensrcs/love'
  import { formatName } from '@opensrcs/contact'
  import ParticipantsList from './ParticipantsList.svelte'

  export let label: string
  export let participants: (ParticipantInfo & { onclick?: (e: MouseEvent) => void })[]
  export let active: boolean = false
  export let limit: number = 4

  $: overLimit = participants.length > limit
  $: adaptive = checkAdaptiveMatching($deviceInfo.size, 'md') || overLimit
  $: personByRefStore = getPersonByPersonRefStore(participants.map((p) => p.person))
</script>

{#if adaptive}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="clubStatusBarButton"
    class:active
    use:tooltip={{ component: ParticipantsList, props: { items: participants }, direction: 'bottom' }}
    on:click
  >
    <span class="clubStatusBarButton-label">{label}</span>
    <div class="clubCombineAvatars-container">
      {#each participants.slice(0, limit) as participant, i (participant._id)}
        <div
          class="clubCombineAvatar tiny"
          data-over={i === limit - 1 && overLimit ? `+${participants.length - limit + 1}` : undefined}
        >
          <Avatar
            name={$personByRefStore.get(participant.person)?.name ?? participant.name}
            size={'card'}
            person={$personByRefStore.get(participant.person)}
          />
        </div>
      {/each}
    </div>
  </div>
{:else}
  <!-- svelte-ignore a11y-click-events-have-key-events -->
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div class="clubStatusBarButton" class:active on:click>
    <span class="clubStatusBarButton-label">{label}</span>
    <div class="clubStatusBarButton-icons">
      {#each participants as participant (participant._id)}
        <div
          use:tooltip={{ label: getEmbeddedLabel(formatName(participant.name)), direction: 'bottom' }}
          on:click={participant.onclick}
        >
          <Avatar
            name={$personByRefStore.get(participant.person)?.name ?? participant.name}
            size={'card'}
            person={$personByRefStore.get(participant.person)}
          />
        </div>
      {/each}
    </div>
  </div>
{/if}
