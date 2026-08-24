//
// Copyright @ 2024 OpenSrcs.
//

import { focusActionWithAvailability } from '@opensrcs/questions-resources'
import type { Training } from '@opensrcs/training'
import { showPopup } from '@opensrcs/ui'
import TrainingRequestCreator from '../components/TrainingRequestCreator.svelte'
import { canCreateTrainingRequest, type CreateTrainingRequestData } from '../utils'

export const trainingRequestCreateAction = focusActionWithAvailability<Training>(
  async (parent: Training) => {
    return canCreateTrainingRequest(parent)
  },
  async (parent: Training): Promise<void> => {
    const object: CreateTrainingRequestData = {
      roles: [],
      trainees: [],
      maxAttempts: null,
      dueDate: null
    }

    await new Promise((resolve) => {
      showPopup(
        TrainingRequestCreator,
        {
          parent,
          object
        },
        'top',
        resolve
      )
    })
  }
)
