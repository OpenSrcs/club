//
// Copyright @ 2024 OpenSrcs.
//

import type { TrainingRequest } from '@opensrcs/training'
import { getCurrentEmployeeRef } from './getCurrentEmployeeRef'

export function canUpdateTrainingRequest (request: TrainingRequest): boolean {
  return request.owner === getCurrentEmployeeRef()
}
