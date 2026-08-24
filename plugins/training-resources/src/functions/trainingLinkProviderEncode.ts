//
// Copyright @ 2024 OpenSrcs.
//

import type { Training } from '@opensrcs/training'
import type { Location } from '@opensrcs/ui'
import { trainingRoute } from '../routing/routes/trainingRoute'

export async function trainingLinkProviderEncode (object: Training, _props: Record<string, any>): Promise<Location> {
  return trainingRoute.build({ id: object._id, tab: null })
}
