//
// Copyright @ 2024 OpenSrcs.
//

import { trainingId, TrainingSpecialIds } from '@opensrcs/training'
import { getCurrentLocation, type Location } from '@opensrcs/ui'
import type { Route, RouteParams } from '../utils/Route'

export interface IncomingRequestsRouteParams extends RouteParams {}

export const incomingRequestRoute: Route<IncomingRequestsRouteParams> = {
  build (params: IncomingRequestsRouteParams): Location {
    const location = getCurrentLocation()
    return {
      ...location,
      path: [location.path[0], location.path[1], trainingId, TrainingSpecialIds.IncomingRequests]
    }
  },

  match: (location: Location) => {
    return location.path[2] === trainingId && location.path[3] === TrainingSpecialIds.IncomingRequests ? {} : null
  },

  resolve: async () => null
}
