//
// Copyright @ 2024 OpenSrcs.
//

import type { Question } from '@opensrcs/questions'
import { type DocumentUpdate, type TxOperations } from '@opensrcs/core'
import { canUpdateQuestion } from './canUpdateQuestion'

export async function updateQuestion<Q extends Question<unknown>> (
  client: TxOperations,
  question: Q,
  update: DocumentUpdate<Q>
): Promise<void> {
  if (!canUpdateQuestion(question)) {
    return
  }
  await client.updateCollection(
    question._class,
    question.space,
    question._id,
    question.attachedTo,
    question.attachedToClass,
    question.collection,
    update
  )
}
