<!--
//
// Copyright © 2026 OpenSrcs.
//
-->
<script lang="ts">
  import { Ref } from '@opensrcs/core'
  import { getEmbeddedLabel } from '@opensrcs/club'
  import { ButtonKind, ButtonSize } from '@opensrcs/ui'
  import { HyperlinkEditor } from '@opensrcs/view-resources'
  import github, { GithubIntegrationRepository } from '@opensrcs/github'
  import { integrationRepositories } from './utils'

  export let value: Ref<GithubIntegrationRepository>
  export let kind: ButtonKind | undefined = undefined
  export let size: ButtonSize = 'small'
  export let justify: 'left' | 'center' = 'center'
  export let width: string | undefined = 'fit-content'

  $: repository = $integrationRepositories.get(value)
</script>

<HyperlinkEditor
  value={repository?.htmlURL ?? ''}
  placeholder={getEmbeddedLabel(repository?.name ?? '')}
  title={repository?.name ?? ''}
  readonly
  icon={github.icon.Github}
  {kind}
  {size}
  {justify}
  {width}
/>
