<script lang="ts">
  import board, { Card } from '@opensrcs/board'
  import core, { Space } from '@opensrcs/core'
  import { createQuery } from '@opensrcs/presentation'
  import { Label } from '@opensrcs/ui'

  export let value: Card
  export let withoutSpace: boolean

  let space: Space | undefined = undefined

  const query = createQuery()

  $: query.query(core.class.Space, { _id: value.space }, (res) => {
    space = res[0]
  })
</script>

{#if !withoutSpace}
  <div>
    <Label label={board.string.ConfigLabel} />
    /
    {space?.name}
  </div>
{/if}
<div class="flex-row-center flex-gap-1">
  {value.title}
</div>
