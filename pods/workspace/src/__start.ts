//
// Copyright © 2026 OpenSrcs.
//
import { Analytics } from '@opensrcs/analytics'
import { configureAnalytics, createOpenTelemetryMetricsContext, SplitLogger } from '@opensrcs/analytics-service'
import { newMetrics, type Tx } from '@opensrcs/core'
import { getPlatformQueue } from '@opensrcs/kafka'
import builder, { getModelVersion, migrateOperations } from '@opensrcs/model-all'
import { initStatisticsContext, loadBrandingMap } from '@opensrcs/server-core'
import { serveWorkspaceAccount } from '@opensrcs/workspace-service'
import { join } from 'path'

const txes = JSON.parse(JSON.stringify(builder().getTxes())) as Tx[]

configureAnalytics('workspace', process.env.VERSION ?? '0.7.0')
Analytics.setTag('application', 'workspace')

// Force create server metrics context with proper logging
const metricsContext = initStatisticsContext('workspace', {
  factory: () =>
    createOpenTelemetryMetricsContext(
      'workspace',
      {},
      {},
      newMetrics(),
      new SplitLogger('workspace', {
        root: join(process.cwd(), 'logs'),
        enableConsole: (process.env.ENABLE_CONSOLE ?? 'true') === 'true'
      })
    )
})

const brandingPath = process.env.BRANDING_PATH

const queue = getPlatformQueue('workspace')

serveWorkspaceAccount(
  metricsContext,
  queue,
  getModelVersion(),
  txes,
  migrateOperations,
  loadBrandingMap(brandingPath),
  () => {}
)
