//
// Copyright @ 2024 OpenSrcs.
//

import {
  type QuestionInitFunction,
  type QuestionInitFunctionResult,
  type SingleChoiceAssessment
} from '@opensrcs/questions'
import { type Hierarchy } from '@opensrcs/core'
import type { ThemeOptions } from '@opensrcs/theme'
import { SingleChoiceQuestionInit } from './SingleChoiceQuestionInit'

export const SingleChoiceAssessmentInit: QuestionInitFunction<SingleChoiceAssessment> = async (
  language: ThemeOptions['language'],
  hierarchy: Hierarchy
): Promise<QuestionInitFunctionResult<SingleChoiceAssessment>> => {
  return {
    ...(await SingleChoiceQuestionInit(language, hierarchy)),
    assessmentData: {
      correctIndex: 0
    }
  }
}
