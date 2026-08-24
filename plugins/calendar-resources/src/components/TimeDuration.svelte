<script lang="ts">
  import { themeStore, formatDuration } from '@opensrcs/ui'

  export let value: number

  let duration: string
  $: formatDuration(value, $themeStore.language).then((res) => {
    duration = res
  })
</script>

{duration}
