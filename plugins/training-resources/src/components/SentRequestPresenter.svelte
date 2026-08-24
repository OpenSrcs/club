<!--
  Copyright @ 2024 OpenSrcs.
-->

<script lang="ts">
  import type { TrainingRequest } from '@opensrcs/training'
  import type { WithLookup } from '@opensrcs/core'
  import { DocNavLink } from '@opensrcs/view-resources'

  export let value: WithLookup<TrainingRequest>
  export let disabled: boolean = false
</script>

{#if value.$lookup?.attachedTo}
  <div class="content-halfcontent-color">
    <DocNavLink object={value} {disabled} noOverflow accent>
      <span class="whitespace-nowrap fs-bold">
        {value.$lookup.attachedTo.code}
      </span>
    </DocNavLink>
  </div>
{/if}
