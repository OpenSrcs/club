<script lang="ts">
  import { getName } from '@opensrcs/contact'
  import core, { Space } from '@opensrcs/core'
  import lead, { Customer, Lead } from '@opensrcs/lead'
  import { createQuery, getClient } from '@opensrcs/presentation'
  import { Label } from '@opensrcs/ui'

  export let value: Lead
  export let withoutSpace: boolean

  const client = getClient()

  let space: Space | undefined = undefined

  const query = createQuery()
  const customerQ = createQuery()

  $: query.query(core.class.Space, { _id: value.space }, (res) => {
    space = res[0]
  })

  let customer: Customer | undefined = undefined

  $: customerQ.query(lead.mixin.Customer, { _id: value.attachedTo }, (res) => {
    customer = res[0]
  })
</script>

{#if !withoutSpace}
  <div>
    <Label label={lead.string.ConfigLabel} />
    /
    {space?.name}
  </div>
{/if}
<div class="flex-row-center flex-gap-1">
  {value.title}
  {#if customer}
    - {getName(client.getHierarchy(), customer)}
  {/if}
</div>
