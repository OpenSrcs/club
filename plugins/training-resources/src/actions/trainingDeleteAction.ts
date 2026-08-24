//
// Copyright © 2026 OpenSrcs.
//

import { findQuestions, focusActionWithAvailability, releaseQuestion } from '@opensrcs/questions-resources'
import { type Training, TrainingState } from '@opensrcs/training'
import { getClient } from '@opensrcs/presentation'
import { canDeleteTraining } from '../utils'

export const trainingDeleteAction = focusActionWithAvailability<Training>(
  async (object: Training) => {
    return canDeleteTraining(object)
  },
  async (object: Training) => {
    const tx = getClient().apply()

    await tx.update(object, { state: TrainingState.Deleted })

    const questions = await findQuestions(object, 'questions')
    await Promise.all(
      questions.map(async (question) => {
        await releaseQuestion(tx, question)
      })
    )

    await tx.commit()
  }
)
