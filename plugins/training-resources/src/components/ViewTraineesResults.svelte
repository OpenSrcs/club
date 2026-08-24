<!--
  Copyright @ 2024 OpenSrcs.
-->

<script lang="ts">
  import { checkMyPermission, permissionsStore } from '@opensrcs/contact-resources'
  import { type TrainingAttempt, TrainingAttemptState } from '@opensrcs/training'
  import { DocumentQuery } from '@opensrcs/core'
  import { type IModeSelector, navigate, rawLocation } from '@opensrcs/ui'
  import { SpecialView } from '@opensrcs/workbench-resources'
  import type { ComponentProps } from 'svelte'
  import training from '../plugin'
  import { traineesResultsRoute, TraineesResultsRouteTab } from '../routing/routes/traineesResultsRoute'
  import { getCurrentEmployeeRef } from '../utils'

  type $$Props = ComponentProps<SpecialView>
  $: ({ baseQuery, ...rest } = $$props as $$Props)

  const tabs: IModeSelector<TraineesResultsRouteTab>['config'] = [
    [TraineesResultsRouteTab.All, training.string.All, {}],
    [TraineesResultsRouteTab.Draft, training.string.TrainingAttemptStateDraft, {}],
    [TraineesResultsRouteTab.Passed, training.string.TrainingAttemptStatePassed, {}],
    [TraineesResultsRouteTab.Failed, training.string.TrainingAttemptStateFailed, {}]
  ]

  let modes: IModeSelector<TraineesResultsRouteTab>
  $: {
    modes = {
      config: tabs,
      mode: tabs[0][0],
      onChange: (tab) => {
        navigate(traineesResultsRoute.build({ tab }))
      }
    }
  }

  $: modes.mode = traineesResultsRoute.match($rawLocation)?.tab ?? modes.mode

  const queries: Record<TraineesResultsRouteTab, DocumentQuery<TrainingAttempt>> = {
    [TraineesResultsRouteTab.All]: {},
    [TraineesResultsRouteTab.Draft]: { state: TrainingAttemptState.Draft },
    [TraineesResultsRouteTab.Passed]: { state: TrainingAttemptState.Passed },
    [TraineesResultsRouteTab.Failed]: { state: TrainingAttemptState.Failed }
  }

  let extendedBaseQuery: DocumentQuery<TrainingAttempt>
  $: {
    const canReadAny = checkMyPermission(
      training.permission.ViewSomeoneElsesTraineesResults,
      training.space.Trainings,
      $permissionsStore
    )
    extendedBaseQuery = {
      ...((baseQuery ?? {}) as DocumentQuery<TrainingAttempt>),
      ...queries[modes.mode],
      ...(canReadAny ? {} : { '$lookup.attachedTo.owner': getCurrentEmployeeRef() })
    }
  }
</script>

<SpecialView {...rest} baseQuery={extendedBaseQuery} {modes} />
