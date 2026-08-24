<!--
  Copyright @ 2024 OpenSrcs.
-->

<script lang="ts">
  import type { TrainingRequest } from '@opensrcs/training'
  import { DocumentQuery } from '@opensrcs/core'
  import { SpecialView } from '@opensrcs/workbench-resources'
  import type { ComponentProps } from 'svelte'
  import { getCurrentEmployeeRef } from '../utils'

  type $$Props = ComponentProps<SpecialView>
  $: ({ baseQuery, ...rest } = $$props as $$Props)

  let extendedBaseQuery: DocumentQuery<TrainingRequest>
  $: extendedBaseQuery = {
    ...((baseQuery ?? {}) as DocumentQuery<TrainingRequest>),
    trainees: getCurrentEmployeeRef(),
    canceledOn: null
  }
</script>

<SpecialView {...rest} baseQuery={extendedBaseQuery} />
