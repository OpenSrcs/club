//
// Copyright @ 2024 OpenSrcs.
//

import { type TrainingAttemptState, trainingAttemptStateOrder } from '@opensrcs/training'

export async function trainingAttemptStateAllValues (): Promise<TrainingAttemptState[]> {
  return [...trainingAttemptStateOrder]
}
