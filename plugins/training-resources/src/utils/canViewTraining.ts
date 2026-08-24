//
// Copyright @ 2024 OpenSrcs.
//

import { checkMyPermission, permissionsStore } from '@opensrcs/contact-resources'
import type { Training } from '@opensrcs/training'
import { get } from 'svelte/store'
import { getCurrentEmployeeRef } from './getCurrentEmployeeRef'
import training from '../plugin'

export function canViewTraining (object: Training): boolean {
  return (
    object.owner === getCurrentEmployeeRef() ||
    checkMyPermission(training.permission.ViewSomeoneElsesTrainingOverview, object.space, get(permissionsStore))
  )
}
