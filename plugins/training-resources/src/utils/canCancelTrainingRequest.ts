//
// Copyright @ 2024 OpenSrcs.
//

import type { TrainingRequest } from '@opensrcs/training'
import { getCurrentEmployeeRef } from './getCurrentEmployeeRef'

export function canCancelTrainingRequest (object: TrainingRequest): boolean {
  return object.canceledOn === null && object.owner === getCurrentEmployeeRef()
}
