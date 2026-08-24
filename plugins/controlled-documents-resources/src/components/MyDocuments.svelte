<script lang="ts">
  import { Document } from '@opensrcs/controlled-documents'
  import { getCurrentEmployee } from '@opensrcs/contact'
  import { DocumentQuery } from '@opensrcs/core'
  import DocumentsContainer from './DocumentsContainer.svelte'

  import documents from '../plugin'
  import { IntlString } from '@opensrcs/club'
  import { createEventDispatcher } from 'svelte'

  export let query: DocumentQuery<Document> = {}
  export let config: [string, IntlString, object][] = []

  const dispatch = createEventDispatcher()
  const currentEmployee = getCurrentEmployee()

  $: resultQuery = {
    ...query,
    owner: currentEmployee
  }
</script>

<DocumentsContainer
  query={resultQuery}
  icon={documents.icon.Document}
  title={documents.string.MyDocuments}
  {config}
  on:action={(event) => dispatch('action', event.detail)}
/>
