import type { Action } from '@opensrcs/view'
import view from '@opensrcs/view'
import { type Client, type DocumentQuery } from '@opensrcs/core'

export const getCardActions = async (client: Client, query?: DocumentQuery<Action>): Promise<Action[]> => {
  return await client.findAll(view.class.Action, query ?? {})
}
