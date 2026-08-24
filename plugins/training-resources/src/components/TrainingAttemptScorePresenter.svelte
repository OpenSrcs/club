<!--
  Copyright @ 2024 OpenSrcs.
-->

<script lang="ts">
  import type { TrainingAttempt } from '@opensrcs/training'
  import Score from './Score.svelte'

  export let value: TrainingAttempt
</script>

{#if value.score !== null && value.assessmentsTotal !== null && value.assessmentsPassed !== null}
  <Score count={value.assessmentsPassed} total={value.assessmentsTotal} score={value.score} />
{/if}
