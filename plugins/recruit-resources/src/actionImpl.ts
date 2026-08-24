import { type Doc } from '@opensrcs/core'
import { showPopup } from '@opensrcs/ui'
import MoveApplication from './components/MoveApplication.svelte'

export async function MoveApplicant (docs: Doc | Doc[]): Promise<void> {
  showPopup(MoveApplication, { selected: Array.isArray(docs) ? docs : [docs] })
}
