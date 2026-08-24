<!--
//
// Copyright © 2026 OpenSrcs.
//
-->
<script lang="ts">
  import { Icon } from '@opensrcs/ui'
  import { GithubIntegrationRepository } from '@opensrcs/github'
  import github from '../../plugin'

  export let value: GithubIntegrationRepository
</script>

<div class="flex-row-center">
  <Icon icon={github.icon.GithubRepository} size={'small'} />
  <span class="ml-1">{value.name}</span>
</div>
