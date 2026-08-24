<script lang="ts">
  import documents, { Document } from '@opensrcs/controlled-documents'
  import { Ref } from '@opensrcs/core'

  import { getClient } from '@opensrcs/presentation'
  import { Label } from '@opensrcs/ui'
  import view from '@opensrcs/view'

  export let value: Ref<Document> | undefined

  let document: Document | undefined = undefined
  const client = getClient()

  $: if (value) {
    client.findOne(documents.class.Document, { _id: value }).then((result) => {
      document = result
    })
  }
</script>

{#if document}
  {document.title}
{:else}
  <Label label={view.string.LabelNA} />
{/if}
