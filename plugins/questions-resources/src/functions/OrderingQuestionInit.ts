//
// Copyright @ 2024 OpenSrcs.
//

import {
  type QuestionInitFunction,
  type QuestionInitFunctionResult,
  type OrderingQuestion
} from '@opensrcs/questions'
import { type Hierarchy } from '@opensrcs/core'
import { translate } from '@opensrcs/club'
import type { ThemeOptions } from '@opensrcs/theme'
import questions from '../plugin'

export const OrderingQuestionInit: QuestionInitFunction<OrderingQuestion> = async (
  language: ThemeOptions['language'],
  hierarchy: Hierarchy
): Promise<QuestionInitFunctionResult<OrderingQuestion>> => {
  return {
    title: await translate(questions.string.Ordering, {}, language),
    questionData: {
      options: [{ label: '' }]
    }
  }
}
