//
// Copyright @ 2024 OpenSrcs.
//

import { type MigrateOperation, type MigrationClient, type MigrationUpgradeClient } from '@opensrcs/model'

export const questionsOperation: MigrateOperation = {
  async migrate (client: MigrationClient): Promise<void> {},

  async upgrade (state: Map<string, Set<string>>, client: () => Promise<MigrationUpgradeClient>): Promise<void> {}
}
