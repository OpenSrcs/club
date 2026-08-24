<script lang="ts">
  import { WithLookup } from '@opensrcs/core'
  import { Document } from '@opensrcs/controlled-documents'
  import { Label } from '@opensrcs/ui'
  import document from '../../../plugin'

  export let value: WithLookup<Document> | undefined
</script>

{#if value}
  <Label label={document.string.VersionValue} params={{ major: value.major, minor: value.minor }} />
{/if}
