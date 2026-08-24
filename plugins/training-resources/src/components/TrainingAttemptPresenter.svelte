<!--
  Copyright @ 2024 OpenSrcs.
-->

<script lang="ts">
  import type { Training, TrainingAttempt, TrainingRequest } from '@opensrcs/training'
  import { EmployeeRefPresenter } from '@opensrcs/contact-resources'
  import type { WithLookup } from '@opensrcs/core'
  import { DocNavLink } from '@opensrcs/view-resources'

  export let value: WithLookup<TrainingAttempt>
  export let disabled: boolean = false

  let trainingObject: Training | null = null
  $: {
    trainingObject = (value.$lookup?.attachedTo as WithLookup<TrainingRequest>)?.$lookup?.attachedTo ?? null
  }
</script>

<div class="content-halfcontent-color">
  <DocNavLink object={value} {disabled} noOverflow accent>
    <span class="whitespace-nowrap fs-bold">
      {#if trainingObject !== null}
        {trainingObject.code}
      {:else}
        <EmployeeRefPresenter value={value.owner} />
      {/if}
    </span>
  </DocNavLink>
</div>
