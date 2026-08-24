<!--
// Copyright © 2022 OpenSrcs.
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
  import contact, { Employee } from '@opensrcs/contact'
  import { UsersPopup } from '@opensrcs/contact-resources'
  import { Ref, WithLookup } from '@opensrcs/core'
  import { Department } from '@opensrcs/hr'
  import { createQuery, getClient } from '@opensrcs/presentation'
  import { Button, IconAdd, Label, Scroller, Section, eventToHTMLElement, showPopup } from '@opensrcs/ui'
  import { Viewlet, ViewletPreference, type ViewOptions } from '@opensrcs/view'
  import { Table, ViewletSelector, ViewletSettingButton } from '@opensrcs/view-resources'
  import hr from '../plugin'
  import { addMember } from '../utils'

  export let objectId: Ref<Department> | undefined
  let value: Department | undefined

  const departmentQuery = createQuery()
  const client = getClient()

  $: objectId &&
    value === undefined &&
    departmentQuery.query(
      hr.class.Department,
      {
        _id: objectId
      },
      (res) => {
        value = res[0]
      }
    )

  function add (e: MouseEvent): void {
    showPopup(
      UsersPopup,
      {
        _class: contact.mixin.Employee,
        docQuery: {
          active: true
        },
        ignoreUsers: members
      },
      eventToHTMLElement(e),
      (res) => addMember(client, res, value)
    )
  }

  let members: Array<Ref<Employee>> = []
  $: members = value?.members ?? []

  let preference: ViewletPreference | undefined
  let loading = false
  let viewlet: WithLookup<Viewlet> | undefined
  let viewOptions: ViewOptions | undefined
</script>

<Section label={hr.string.Members}>
  <svelte:fragment slot="header">
    <div class="flex-row-center gap-2 reverse">
      <ViewletSelector
        hidden
        bind:viewlet
        bind:preference
        bind:loading
        viewletQuery={{ _id: hr.viewlet.TableMember }}
      />
      <ViewletSettingButton kind={'ghost'} bind:viewlet bind:viewOptions />
      <Button id={hr.string.AddEmployee} icon={IconAdd} kind={'ghost'} on:click={add} />
    </div>
  </svelte:fragment>

  <svelte:fragment slot="content">
    {#if members.length > 0}
      <Scroller>
        <Table
          _class={hr.mixin.Staff}
          config={preference?.config ?? viewlet?.config ?? []}
          options={viewlet?.options}
          viewOptionsConfig={viewlet?.viewOptions?.other}
          {viewOptions}
          query={{ _id: { $in: members } }}
          loadingProps={{ length: members.length }}
        />
      </Scroller>
    {:else}
      <div class="antiSection-empty solid flex-col-center mt-3">
        <span class="text-sm content-dark-color">
          <Label label={hr.string.NoMembers} />
        </span>
        <!-- svelte-ignore a11y-click-events-have-key-events -->
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <span class="text-sm content-color over-underline" on:click={add}>
          <Label label={hr.string.AddMember} />
        </span>
      </div>
    {/if}
  </svelte:fragment>
</Section>
