<!--
//
// Copyright © 2026 OpenSrcs.
//
-->
<script lang="ts">
  import { WithLookup } from '@opensrcs/core'
  import { TitlePresenter } from '@opensrcs/tracker-resources'
  import { GithubPullRequest } from '@opensrcs/github'

  export let value: WithLookup<GithubPullRequest>
  export let shouldUseMargin: boolean = false
  export let showParent = true
  export let kind: 'list' | undefined = undefined
  export let onClick: (() => void) | undefined = undefined
  export let disabled = false
</script>

{#if value}
  <TitlePresenter {value} {shouldUseMargin} {showParent} {kind} {onClick} {disabled} />
{/if}
