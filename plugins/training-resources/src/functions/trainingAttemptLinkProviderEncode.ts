//
// Copyright @ 2024 OpenSrcs.
//

import type { TrainingAttempt } from '@opensrcs/training'
import type { Location } from '@opensrcs/ui'
import { trainingAttemptRoute } from '../routing/routes/trainingAttemptRoute'

export async function trainingAttemptLinkProviderEncode (
  object: TrainingAttempt,
  _props: Record<string, any>
): Promise<Location> {
  return trainingAttemptRoute.build({ id: object._id, tab: null })
}
