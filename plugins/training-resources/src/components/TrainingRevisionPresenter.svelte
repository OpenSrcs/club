<!--
  Copyright @ 2024 OpenSrcs.
-->

<script lang="ts">
  import type { Training } from '@opensrcs/training'
  import { getClient } from '@opensrcs/presentation'
  import { Label } from '@opensrcs/ui'

  export let value: Training

  const label = getClient().getHierarchy().getAttribute(value._class, 'revision').label
</script>

<span>
  <Label {label} />
  {value.revision}
</span>
