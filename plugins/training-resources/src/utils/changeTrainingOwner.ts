//
// Copyright @ 2024 OpenSrcs.
//

import { findQuestions, updateQuestion } from '@opensrcs/questions-resources'
import type { Training } from '@opensrcs/training'
import type { Employee } from '@opensrcs/contact'
import type { Ref } from '@opensrcs/core'
import { getClient } from '@opensrcs/presentation'
import { canChangeTrainingOwner } from './canChangeTrainingOwner'

export async function changeTrainingOwner (training: Training, owner: Ref<Employee>): Promise<void> {
  if (!canChangeTrainingOwner(training)) {
    return
  }
  const ops = getClient().apply()

  await ops.updateDoc(training._class, training.space, training._id, {
    owner
  })

  const trainingQuestions = await findQuestions(training, 'questions')
  await Promise.all(
    trainingQuestions.map(async (question) => {
      await updateQuestion(ops, question, { owner })
    })
  )

  await ops.commit()
}
