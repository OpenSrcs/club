<script lang="ts">
  import { type Drawing } from '@opensrcs/attachment'
  import { DateRangeMode } from '@opensrcs/core'
  import { DatePresenter, IconScribble } from '@opensrcs/ui'
  import { PersonIdPresenter } from '@opensrcs/view-resources'

  export let value: Drawing
</script>

<div class="flex-presenter flex-gap-3">
  <DatePresenter value={value.createdOn} mode={DateRangeMode.DATETIME} kind="list" icon={IconScribble} />
  <PersonIdPresenter value={value.createdBy} withPadding={false} shouldShowName={false} />
</div>
