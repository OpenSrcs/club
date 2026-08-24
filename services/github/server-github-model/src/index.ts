//
// Copyright © 2026 OpenSrcs.
//

import { type Builder } from '@opensrcs/model'

import core from '@opensrcs/core'
import serverCore from '@opensrcs/server-core'
import serverGithub from '@opensrcs/server-github'
import time from '@opensrcs/time'
import tracker from '@opensrcs/tracker'

export { serverGithubId } from '@opensrcs/server-github'

export function createModel (builder: Builder): void {
  builder.createDoc(serverCore.class.Trigger, core.space.Model, {
    trigger: serverGithub.trigger.OnProjectChanges,
    isAsync: true
  })

  builder.createDoc(serverCore.class.Trigger, core.space.Model, {
    trigger: serverGithub.trigger.OnProjectRemove,
    txMatch: {
      _class: core.class.TxRemoveDoc,
      objectClass: tracker.class.Project
    }
  })

  builder.createDoc(serverCore.class.Trigger, core.space.Model, {
    trigger: serverGithub.trigger.OnGithubBroadcast,
    isAsync: false
  })

  // We should skip activity github mixin stuff.
  builder.createDoc(time.class.TodoAutomationHelper, core.space.Model, {
    onDoneTester: serverGithub.functions.TodoDoneTester
  })
}
