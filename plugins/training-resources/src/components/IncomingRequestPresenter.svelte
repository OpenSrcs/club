<!--
  Copyright @ 2024 OpenSrcs.
-->

<script lang="ts">
  import type { TrainingAttempt, TrainingRequest } from '@opensrcs/training'
  import type { WithLookup } from '@opensrcs/core'
  import { createQuery } from '@opensrcs/presentation'
  import { DocNavLink } from '@opensrcs/view-resources'
  import { queryLatestOwnAttempt } from '../utils'

  export let value: WithLookup<TrainingRequest>
  export let disabled: boolean = false

  let attempt: TrainingAttempt | null = null
  const query = createQuery()
  $: queryLatestOwnAttempt(query, value, (result) => {
    attempt = result ?? null
  })
</script>

{#if value.$lookup?.attachedTo}
  <div class="content-halfcontent-color">
    <DocNavLink object={attempt ?? value} {disabled} noOverflow accent>
      <span class="whitespace-nowrap fs-bold">
        {value.$lookup.attachedTo.code}
      </span>
    </DocNavLink>
  </div>
{/if}
