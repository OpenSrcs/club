//
// Copyright @ 2024 OpenSrcs.
//

import { focusActionWithAvailability } from '@opensrcs/questions-resources'
import type { TrainingRequest } from '@opensrcs/training'
import { getClient } from '@opensrcs/presentation'
import { canCancelTrainingRequest, getCurrentEmployeeRef } from '../utils'

export const trainingRequestCancelAction = focusActionWithAvailability<TrainingRequest>(
  async (object: TrainingRequest) => {
    return canCancelTrainingRequest(object)
  },
  async (object: TrainingRequest) => {
    await getClient().update(object, {
      canceledOn: Date.now(),
      canceledBy: getCurrentEmployeeRef()
    })
  }
)
