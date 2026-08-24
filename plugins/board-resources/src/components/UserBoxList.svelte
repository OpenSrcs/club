<script lang="ts">
  import contact, { Employee } from '@opensrcs/contact'
  import { Ref } from '@opensrcs/core'

  import { Component } from '@opensrcs/ui'
  import board from '../plugin'

  export let value: Ref<Employee>[]
  export let readonly = false
</script>

<Component
  is={contact.component.UserBoxList}
  props={{ items: value, label: board.string.Members, readonly }}
  on:update
/>
