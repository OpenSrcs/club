<script lang="ts">
  import { PersonId } from '@opensrcs/core'
  import { ObjectPresenter } from '@opensrcs/view-resources'
  import contact from '@opensrcs/contact'
  import { getPersonRefByPersonIdStore } from '@opensrcs/contact-resources'

  export let socialIds: PersonId[] = []

  $: personRefByPersonIdStore = getPersonRefByPersonIdStore(socialIds)
  $: persons = socialIds.map((si) => $personRefByPersonIdStore.get(si))
</script>

<div class="m-2 flex-col flex-gap-2">
  {#each persons as person}
    <ObjectPresenter objectId={person} _class={contact.class.Person} disabled />
  {/each}
</div>
