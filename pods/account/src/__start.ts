//
// Copyright © 2026 OpenSrcs.
//
import { serveAccount } from '@opensrcs/account-service'
import { Analytics } from '@opensrcs/analytics'
import { configureAnalytics, createOpenTelemetryMetricsContext, SplitLogger } from '@opensrcs/analytics-service'
import { newMetrics } from '@opensrcs/core'
import { initStatisticsContext, loadBrandingMap } from '@opensrcs/server-core'
import { join } from 'path'

configureAnalytics('account', process.env.VERSION ?? '0.7.0')
Analytics.setTag('application', 'account')

const metricsContext = initStatisticsContext('account', {
  factory: () =>
    createOpenTelemetryMetricsContext(
      'account',
      {},
      {},
      newMetrics(),
      new SplitLogger('account', {
        root: join(process.cwd(), 'logs'),
        enableConsole: (process.env.ENABLE_CONSOLE ?? 'true') === 'true'
      })
    )
})

const brandingPath = process.env.BRANDING_PATH

serveAccount(metricsContext, loadBrandingMap(brandingPath), () => {})
