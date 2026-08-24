import { type Doc, type Ref } from '@opensrcs/core'
import { guestId } from '@opensrcs/guest'
import guest from '@opensrcs/guest-resources/src/plugin'
import { mergeIds } from '@opensrcs/club'
import { type AnyComponent } from '@opensrcs/ui/src/types'
import { type Action, type ActionCategory } from '@opensrcs/view'

export default mergeIds(guestId, guest, {
  action: {
    CreatePublicLink: '' as Ref<Action<Doc, any>>
  },
  category: {
    Guest: '' as Ref<ActionCategory>
  },
  component: {
    CreatePublicLink: '' as AnyComponent
  }
})
