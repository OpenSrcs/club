<script lang="ts">
  import { Issue } from '@opensrcs/tracker'

  import { getClient } from '@opensrcs/presentation'
  import type { ButtonKind } from '@opensrcs/ui'
  import { HyperlinkEditor } from '@opensrcs/view-resources'
  import github from '../../plugin'
  import { integrationRepositories } from '../utils'

  export let value: Issue
  export let kind: ButtonKind = 'ghost'

  $: ghIssue = getClient().getHierarchy().asIf(value, github.mixin.GithubIssue)

  $: repository = ghIssue?.repository !== undefined ? $integrationRepositories.get(ghIssue?.repository) : undefined
</script>

{#if ghIssue !== undefined && ghIssue.url !== '' && repository !== undefined}
  <HyperlinkEditor
    readonly
    icon={github.icon.Github}
    {kind}
    value={ghIssue.url}
    placeholder={github.string.Issue}
    title={`${repository.name}`}
  />
{/if}
