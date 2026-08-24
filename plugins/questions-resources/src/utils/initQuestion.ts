//
// Copyright @ 2024 OpenSrcs.
//

import type { Question, Rank } from '@opensrcs/questions'
import { type Class, type Ref } from '@opensrcs/core'
import { getResource } from '@opensrcs/club'
import { getClient } from '@opensrcs/presentation'
import type { ThemeOptions } from '@opensrcs/theme'
import { LexoRank } from 'lexorank'
import type { CreateQuestionData } from './createQuestion'
import { getQuestionMixin } from './getQuestionMixin'

export async function initQuestion<Q extends Question<any>> (
  language: ThemeOptions['language'],
  classRef: Ref<Class<Q>>,
  prevRank: Rank | null,
  nextRank: Rank | null
): Promise<CreateQuestionData<Q>> {
  const hierarchy = getClient().getHierarchy()

  const prevLexoRank = prevRank === null ? LexoRank.min() : LexoRank.parse(prevRank)
  const nextLexoRank = nextRank === null ? LexoRank.max() : LexoRank.parse(nextRank)
  const rank = prevLexoRank.between(nextLexoRank).toString()

  const mixin = getQuestionMixin(classRef)
  const init = await getResource(mixin.questionInit)

  // TODO: Fix typing hacks
  return {
    ...(await init(language, hierarchy)),
    rank
  } as unknown as CreateQuestionData<Q>
}
