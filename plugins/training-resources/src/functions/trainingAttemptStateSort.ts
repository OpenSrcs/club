//
// Copyright @ 2024 OpenSrcs.
//

import { type TrainingAttemptState, trainingAttemptStateOrder } from '@opensrcs/training'
import { type TxOperations } from '@opensrcs/core'

export async function trainingAttemptStateSort (
  _: TxOperations,
  states: TrainingAttemptState[]
): Promise<TrainingAttemptState[]> {
  return states
    .slice()
    .sort((state1, state2) => trainingAttemptStateOrder.indexOf(state2) - trainingAttemptStateOrder.indexOf(state1))
}
