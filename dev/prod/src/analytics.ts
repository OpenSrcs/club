//
// Copyright © 2026 OpenSrcs Inc
//

import { configureAnalyticsProviders } from '@opensrcs/analytics-providers'
import { type Config } from './club'

export function configureAnalytics (config: Config) {
  configureAnalyticsProviders(config)
}
