//
// Copyright @ 2024 OpenSrcs.
//

import type { Question } from '@opensrcs/questions'
import type { Class, Ref } from '@opensrcs/core'
import { getClient } from '@opensrcs/presentation'
import questions from '../plugin'

export function getQuestionClasses (
  baseClass: Ref<Class<Question<unknown>>> = questions.class.Question
): Array<Class<Question<unknown>>> {
  const hierarchy = getClient().getHierarchy()
  return hierarchy
    .getDescendants(baseClass)
    .map((classRef) => hierarchy.getClass(classRef))
    .filter((_class) => hierarchy.hasMixin(_class, questions.mixin.QuestionMixin))
}
