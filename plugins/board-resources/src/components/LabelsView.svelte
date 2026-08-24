<script lang="ts">
  import tags from '@opensrcs/tags'
  import { Component } from '@opensrcs/ui'
  import board from '../plugin'
</script>

<Component
  is={tags.component.TagsView}
  props={{
    targetClass: board.class.Card,
    title: board.string.Labels,
    icon: tags.icon.Tags,
    item: board.string.Labels,
    key: 'labels',
    createItemLabel: board.string.Labels
  }}
/>
