//
// Copyright @ 2022 OpenSrcs.
//
import { type Builder } from '@opensrcs/model'

import training from '@opensrcs/model-training'
import serverTraining from '@opensrcs/server-training'
import core from '@opensrcs/core'
import notification from '@opensrcs/notification'
import serverNotification from '@opensrcs/server-notification'

export { serverTrainingId } from '@opensrcs/server-training/src/index'

export function createModel (builder: Builder): void {
  builder.mixin(
    training.notification.TrainingRequest,
    notification.class.NotificationType,
    serverNotification.mixin.TypeMatch,
    {
      func: serverTraining.function.TrainingRequestNotificationTypeMatch
    }
  )

  builder.mixin(training.class.TrainingRequest, core.class.Class, serverNotification.mixin.TextPresenter, {
    presenter: serverTraining.function.TrainingRequestTextPresenter
  })

  builder.mixin(training.class.TrainingRequest, core.class.Class, serverNotification.mixin.HTMLPresenter, {
    presenter: serverTraining.function.TrainingRequestHTMLPresenter
  })
}
