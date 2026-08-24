import type { Builder } from '@opensrcs/model'
import core from '@opensrcs/core'
import document from '@opensrcs/document'

export function definePermissions (builder: Builder): void {
  builder.createDoc(
    core.class.Permission,
    core.space.Model,
    {
      label: document.string.ForbidCreateTeamspacePermission,
      scope: 'workspace',
      txClass: core.class.TxCreateDoc,
      objectClass: document.class.Teamspace,
      forbid: true,
      description: document.string.ForbidCreateTeamspacePermissionDescription
    },
    document.permission.ForbidCreateTeamspace
  )
}
