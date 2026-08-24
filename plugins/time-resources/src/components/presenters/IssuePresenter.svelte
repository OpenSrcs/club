<script lang="ts">
  import { Issue } from '@opensrcs/tracker'
  import { DocReferencePresenter } from '@opensrcs/view-resources'

  export let value: Issue
</script>

<DocReferencePresenter {value} on:click>
  <slot />
</DocReferencePresenter>
