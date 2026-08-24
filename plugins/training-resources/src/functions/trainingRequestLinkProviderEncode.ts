//
// Copyright @ 2024 OpenSrcs.
//

import type { TrainingRequest } from '@opensrcs/training'
import type { Location } from '@opensrcs/ui'
import { trainingRequestRoute } from '../routing/routes/trainingRequestRoute'

export async function trainingRequestLinkProviderEncode (
  object: TrainingRequest,
  _props: Record<string, any>
): Promise<Location> {
  return trainingRequestRoute.build({
    id: object._id,
    tab: null
  })
}
