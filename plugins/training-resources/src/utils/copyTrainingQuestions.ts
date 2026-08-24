//
// Copyright @ 2024 OpenSrcs.
//

import { copyQuestions } from '@opensrcs/questions-resources'
import type { Training } from '@opensrcs/training'
import { type Ref, type TxOperations } from '@opensrcs/core'

export async function copyTrainingQuestions (ops: TxOperations, from: Training, to: Ref<Training>): Promise<void> {
  await copyQuestions(ops, from, 'questions', to)
}
