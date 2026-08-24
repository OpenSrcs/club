import guest, { guestId } from '@opensrcs/guest'
import { type IntlString, mergeIds } from '@opensrcs/club'

export default mergeIds(guestId, guest, {
  string: {
    CreatePublicLink: '' as IntlString,
    PublicLink: '' as IntlString,
    Revoke: '' as IntlString,
    Copy: '' as IntlString,
    RevokeConfirmation: '' as IntlString,
    LinkWasRevoked: '' as IntlString
  }
})
