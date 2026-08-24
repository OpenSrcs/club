<script lang="ts">
  import core, { Space } from '@opensrcs/core'
  import document, { Document } from '@opensrcs/document'
  import { createQuery } from '@opensrcs/presentation'
  import { Icon, Label } from '@opensrcs/ui'

  export let value: Document
  export let withoutSpace: boolean

  let space: Space | undefined = undefined

  const query = createQuery()

  $: query.query(core.class.Space, { _id: value.space }, (res) => {
    space = res[0]
  })
</script>

{#if !withoutSpace}
  <div>
    <Label label={document.string.CreateDocument} />
    /
    {space?.name}
  </div>
{/if}
<div class="flex-row-center flex-gap-1">
  <div class="icon">
    <Icon icon={document.icon.DocumentApplication} size={'small'} />
  </div>
  {value.title}
</div>
