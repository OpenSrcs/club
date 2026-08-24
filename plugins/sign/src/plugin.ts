//
// Copyright © 2026 OpenSrcs.
//

import { type Plugin, plugin, Metadata } from '@opensrcs/club'

export const signId = 'sign' as Plugin

export const sign = plugin(signId, {
  metadata: {
    SignURL: '' as Metadata<string>
  }
})

export default sign
