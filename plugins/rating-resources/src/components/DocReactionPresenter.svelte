<script lang="ts">
  import ratingPlugin, { DocReaction, ReactionKind } from '@opensrcs/rating'
  import { Icon } from '@opensrcs/ui'
  import ReactionPresenter from './ReactionPresenter.svelte'

  export let value: DocReaction | null = null
</script>

{#if value}
  {#if value.reactionType === ReactionKind.Star}
    <Icon icon={ratingPlugin.icon.StarYellow} size={'small'} />
  {:else}
    <ReactionPresenter emoji={value?.emoji ?? ''} />
  {/if}
{/if}
