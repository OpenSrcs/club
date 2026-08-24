//
// Copyright @ 2024 OpenSrcs.
//

import { focusActionWithAvailability } from '@opensrcs/questions-resources'
import type { TrainingRequest } from '@opensrcs/training'
import { showPopup } from '@opensrcs/ui'
import TrainingRequestChangeOwnerPopup from '../components/TrainingRequestChangeOwnerPopup.svelte'
import { canChangeTrainingRequestOwner } from '../utils'

export const trainingRequestChangeOwnerAction = focusActionWithAvailability<TrainingRequest>(
  async (object: TrainingRequest) => {
    return canChangeTrainingRequestOwner(object)
  },
  async (object: TrainingRequest) => {
    await new Promise((resolve) => {
      showPopup(
        TrainingRequestChangeOwnerPopup,
        {
          object
        },
        'top',
        resolve
      )
    })
  }
)
