import { mergeIds } from '@opensrcs/club'
import { type AnyComponent } from '@opensrcs/ui/src/types'
import emojiPlugin, { emojiId } from '@opensrcs/emoji'

export default mergeIds(emojiId, emojiPlugin, {
  component: {
    WorkbenchExtension: '' as AnyComponent
  }
})
