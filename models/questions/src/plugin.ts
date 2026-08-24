//
// Copyright @ 2024 OpenSrcs.
//

import { questionsId } from '@opensrcs/questions'
import questions from '@opensrcs/questions-resources/src/plugin'
import type { Ref } from '@opensrcs/core'
import { mergeIds } from '@opensrcs/club'
import type { ActionCategory } from '@opensrcs/view'

export default mergeIds(questionsId, questions, {
  actionCategory: {
    Questions: '' as Ref<ActionCategory>
  }
})
