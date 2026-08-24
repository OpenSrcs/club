//
// Copyright @ 2024 OpenSrcs.
//

import { checkMyPermission, permissionsStore } from '@opensrcs/contact-resources'
import type { TrainingRequest } from '@opensrcs/training'
import { get } from 'svelte/store'
import training from '../plugin'
import { getCurrentEmployeeRef } from './getCurrentEmployeeRef'

export function canChangeTrainingRequestOwner (request: TrainingRequest): boolean {
  return (
    request.owner === getCurrentEmployeeRef() ||
    checkMyPermission(training.permission.ChangeSomeoneElsesSentRequestOwner, request.space, get(permissionsStore))
  )
}
