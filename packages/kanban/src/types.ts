import { type Doc, type Rank } from '@opensrcs/core'
import { type Asset } from '@opensrcs/club'

/**
 * @public
 */
export interface DocWithRank extends Doc {
  rank: Rank
}

export type StateType = any

/**
 * @public
 */
export interface TypeState {
  _id: StateType
  title: string
  color: number
  icon?: Asset
}
/**
 * @public
 */
export type Item = DocWithRank

/**
 * @public
 */
export type CardDragEvent = DragEvent & { currentTarget: EventTarget & HTMLDivElement }
