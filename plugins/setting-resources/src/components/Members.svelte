<!--
// Copyright © 2026 OpenSrcs.
//
// Licensed under the Eclipse Public License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License. You may
// obtain a copy of the License at https://www.eclipse.org/legal/epl-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//
// See the License for the specific language governing permissions and
// limitations under the License.
-->
<script lang="ts">
  import contact, { Employee, formatName } from '@opensrcs/contact'
  import { EmployeePresenter } from '@opensrcs/contact-resources'
  import { Account, AccountRole, getCurrentAccount, hasAccountRole } from '@opensrcs/core'
  import { createQuery, getClient } from '@opensrcs/presentation'
  import { Breadcrumb, DropdownIntlItem, DropdownLabelsIntl, Header, Scroller, SearchInput } from '@opensrcs/ui'
  import { onMount } from 'svelte'

  import setting from '../plugin'
  import { getAccountClient } from '../utils'
  import { Analytics } from '@opensrcs/analytics'

  const query = createQuery()
  const currentAccount = getCurrentAccount()
  const client = getClient()

  const items: DropdownIntlItem[] = [
    { id: AccountRole.ReadOnlyGuest, label: setting.string.ReadonlyGuest },
    { id: AccountRole.Guest, label: setting.string.Guest },
    { id: AccountRole.User, label: setting.string.User },
    { id: AccountRole.Maintainer, label: setting.string.Maintainer },
    { id: AccountRole.Owner, label: setting.string.Owner }
  ]

  const guestRoles = [AccountRole.ReadOnlyGuest, AccountRole.DocGuest, AccountRole.Guest]

  const accountClient = getAccountClient()
  let workspaceMembers: Record<string, AccountRole> = {}
  let employees: Employee[] = []

  onMount(async () => {
    const members = await accountClient.getWorkspaceMembers()
    workspaceMembers = members.reduce<Record<string, AccountRole>>((wm, m) => {
      wm[m.person] = m.role

      return wm
    }, {})
  })

  query.query(contact.mixin.Employee, { active: true }, (res) => {
    employees = res
      .filter((e) => e.personUuid != null)
      .sort((a, b) => formatName(a.name).localeCompare(formatName(b.name)))
  })

  async function change (personUuid: string, value: AccountRole): Promise<void> {
    if (accountClient == null) {
      return
    }

    try {
      await accountClient.updateWorkspaceRole(personUuid, value)
      workspaceMembers[personUuid] = value

      const employee = employees.find((e) => e.personUuid === personUuid)
      if (employee !== undefined) {
        const employeeRole = guestRoles.includes(value) ? 'GUEST' : 'USER'
        await client.update(employee, { role: employeeRole })
      }
    } catch (e: any) {
      Analytics.handleError(e)
    }
  }
  let search = ''

  $: ownersCount = employees.filter(
    (e) => e.personUuid != null && workspaceMembers[e.personUuid] === AccountRole.Owner
  ).length

  function getItems (role: AccountRole, currentAccount: Account): DropdownIntlItem[] {
    return items.filter((i) => i.id === role || hasAccountRole(currentAccount, i.id as AccountRole))
  }
</script>

<div class="clubComponent">
  <Header adaptive={'disabled'}>
    <Breadcrumb icon={setting.icon.Members} label={setting.string.Members} size={'large'} isCurrent />
    <svelte:fragment slot="search">
      <SearchInput bind:value={search} collapsed />
    </svelte:fragment>
  </Header>
  <div class="clubComponent-content__column content">
    <Scroller align={'center'} padding={'var(--spacing-3)'} bottomPadding={'var(--spacing-3)'}>
      <div class="clubComponent-content">
        {#each employees as employee (employee._id)}
          {@const personUuid = employee.personUuid ?? undefined}
          {@const role = personUuid !== undefined ? workspaceMembers[personUuid] : undefined}
          {#if personUuid !== undefined && role !== undefined && employee.name?.includes(search)}
            <div class="flex-row-center p-2 flex-no-shrink" data-id="owners-member-row">
              <div class="p-1 min-w-80">
                <EmployeePresenter value={employee} disabled={false} />
              </div>
              <DropdownLabelsIntl
                label={setting.string.Role}
                disabled={!hasAccountRole(currentAccount, role) ||
                  (role === AccountRole.Owner && ownersCount === 1) ||
                  currentAccount.uuid === personUuid}
                kind={'primary'}
                size={'medium'}
                items={getItems(role, currentAccount)}
                selected={role}
                on:selected={(e) => {
                  void change(personUuid, e.detail)
                }}
              />
            </div>
          {/if}
        {/each}
      </div>
    </Scroller>
  </div>
</div>
