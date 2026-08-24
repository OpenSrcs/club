<!--
// Copyright © 2026 OpenSrcs.
//
-->
<script lang="ts">
  import { GithubPullRequest } from '@opensrcs/github'
  import PullRequestDiff from './PullRequestDiff.svelte'

  export let object: GithubPullRequest
  export let embedded = false
</script>

<div class="mt-6">
  <PullRequestDiff pullRequest={object} />
</div>
