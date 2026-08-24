<!--
  Copyright @ 2024 OpenSrcs.
-->

<script lang="ts">
  import type { Question } from '@opensrcs/questions'
  import type { Training } from '@opensrcs/training'
  import { createQuery } from '@opensrcs/presentation'
  import { calculateAnswersToPass, queryQuestions } from '@opensrcs/questions-resources'
  import { Loading } from '@opensrcs/ui'
  import Score from './Score.svelte'

  export let value: Training

  let questions: Question<unknown>[] = []
  const query = createQuery()
  $: {
    queryQuestions(query, value, 'questions', (result) => {
      questions = result
    })
  }

  let total: number | null = null
  let needed: number | null = null
  $: {
    const calculated = calculateAnswersToPass(questions, value.passingScore)
    total = calculated.assessmentsTotal
    needed = calculated.answersNeeded
  }
</script>

{#if total === null || needed === null}
  <Loading size="small" />
{:else}
  <Score count={needed} {total} score={value.passingScore} />
{/if}
