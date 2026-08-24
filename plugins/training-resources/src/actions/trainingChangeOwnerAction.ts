//
// Copyright @ 2024 OpenSrcs.
//

import { focusActionWithAvailability } from '@opensrcs/questions-resources'
import type { Training } from '@opensrcs/training'
import { showPopup } from '@opensrcs/ui'
import TrainingChangeOwnerPopup from '../components/TrainingChangeOwnerPopup.svelte'
import { canChangeTrainingOwner } from '../utils'

export const trainingChangeOwnerAction = focusActionWithAvailability<Training>(
  async (object: Training) => {
    return canChangeTrainingOwner(object)
  },
  async (object: Training) => {
    await new Promise((resolve) => {
      showPopup(
        TrainingChangeOwnerPopup,
        {
          object
        },
        'top',
        resolve
      )
    })
  }
)
