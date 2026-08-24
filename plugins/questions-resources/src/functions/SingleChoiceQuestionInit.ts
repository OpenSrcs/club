//
// Copyright @ 2024 OpenSrcs.
//

import {
  type QuestionInitFunction,
  type QuestionInitFunctionResult,
  type SingleChoiceQuestion
} from '@opensrcs/questions'
import { type Hierarchy } from '@opensrcs/core'
import { translate } from '@opensrcs/club'
import type { ThemeOptions } from '@opensrcs/theme'
import questions from '../plugin'

export const SingleChoiceQuestionInit: QuestionInitFunction<SingleChoiceQuestion> = async (
  language: ThemeOptions['language'],
  hierarchy: Hierarchy
): Promise<QuestionInitFunctionResult<SingleChoiceQuestion>> => {
  return {
    title: await translate(questions.string.SingleChoice, {}, language),
    questionData: {
      options: [{ label: '' }]
    }
  }
}
