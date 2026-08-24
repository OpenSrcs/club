//
// Copyright @ 2024 OpenSrcs.
//

import type { Question } from '@opensrcs/questions'
import { type QuerySelector, SortingOrder } from '@opensrcs/core'
import { getClient } from '@opensrcs/presentation'
import questions from '../plugin'

export async function findNextQuestion (object: Question<unknown>): Promise<Question<unknown> | undefined> {
  return await getClient().findOne<Question<unknown>>(
    questions.class.Question,
    {
      attachedTo: object.attachedTo,
      attachedToClass: object.attachedToClass,
      collection: object.collection,
      // TODO: Ugly typings hack, because QuerySelector currently does not let use '$gt` on strings
      rank: { $gt: object.rank } as unknown as QuerySelector<Question<unknown>['rank']>
    },
    {
      sort: {
        rank: SortingOrder.Ascending
      }
    }
  )
}
