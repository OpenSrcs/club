//
// Copyright @ 2024 OpenSrcs.
//

import questions, { type Answer, type Question } from '@opensrcs/questions'
import { type Doc, SortingOrder } from '@opensrcs/core'
import { getClient } from '@opensrcs/presentation'

export async function findAnswers<Parent extends Doc, Collection extends Extract<keyof Parent, string> | string> (
  from: Parent,
  collection: Collection
): Promise<Array<Answer<Question<unknown>, unknown>>> {
  return await getClient().findAll(
    questions.class.Answer,
    {
      space: from.space,
      attachedToClass: from._class,
      attachedTo: from._id,
      collection
    },
    {
      sort: { rank: SortingOrder.Ascending }
    }
  )
}
