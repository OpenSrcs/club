//
// Copyright @ 2024 OpenSrcs.
//

import type { TrainingRequest } from '@opensrcs/training'
import type { Employee } from '@opensrcs/contact'
import type { Ref } from '@opensrcs/core'
import { getClient } from '@opensrcs/presentation'
import { canChangeTrainingRequestOwner } from './canChangeTrainingRequestOwner'

export async function changeTrainingRequestOwner (request: TrainingRequest, owner: Ref<Employee>): Promise<void> {
  if (canChangeTrainingRequestOwner(request)) {
    await getClient().update(request, { owner })
  }
}
