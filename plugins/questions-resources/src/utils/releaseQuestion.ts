//
// Copyright @ 2024 OpenSrcs.
//

import type { Question } from '@opensrcs/questions'
import { type TxOperations } from '@opensrcs/core'
import { getCurrentEmployeeRef } from './getCurrentEmployeeRef'
import { updateQuestion } from './updateQuestion'

export async function releaseQuestion (client: TxOperations, question: Question<unknown>): Promise<void> {
  await updateQuestion(client, question, {
    releasedBy: question.releasedBy ?? getCurrentEmployeeRef(),
    releasedOn: question.releasedOn ?? Date.now()
  })
}
