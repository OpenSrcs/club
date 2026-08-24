<script lang="ts">
  import { AccountArrayEditor } from '@opensrcs/contact-resources'
  import contact from '@opensrcs/contact-resources/src/plugin'
  import { getClient } from '@opensrcs/presentation'
  import { Project } from '@opensrcs/tracker'
  export let value: Project
</script>

<AccountArrayEditor
  label={contact.string.Members}
  value={value.members}
  onChange={(evt) => {
    void getClient().diffUpdate(value, { members: evt })
  }}
/>
