import view from '@opensrcs/view'
import core from '@opensrcs/core'
import type { Asset } from '@opensrcs/club'

export const iconsLibrary: Asset[] = Object.values(core.icon).concat(Object.values(view.icon))
