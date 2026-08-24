<script lang="ts">
  import { eventToHTMLElement, IconUpOutline, showPopup, SplitButton } from '@opensrcs/ui'
  import CamSettingPopup from '../CamSettingPopup.svelte'
  import { RoomType } from '@opensrcs/love'
  import { currentRoom } from '../../../stores'
  import love from '../../../plugin'
  import { state, toggleCamState } from '@opensrcs/media-resources'
  import view from '@opensrcs/view'
  import { getClient } from '@opensrcs/presentation'

  export let size: 'large' | 'medium' | 'small' | 'extra-small' | 'min' = 'large'

  $: allowCam = $currentRoom?.type === RoomType.Video
  $: isCamEnabled = $state.camera?.enabled === true

  const client = getClient()
  const camKeys = client.getModel().findAllSync(view.class.Action, { _id: love.action.ToggleVideo })?.[0]?.keyBinding

  function camSettings (e: MouseEvent): void {
    showPopup(CamSettingPopup, {}, eventToHTMLElement(e))
  }
</script>

{#if allowCam}
  <SplitButton
    {size}
    icon={isCamEnabled ? love.icon.CamEnabled : love.icon.CamDisabled}
    showTooltip={{
      label: isCamEnabled ? love.string.StopVideo : love.string.StartVideo,
      keys: camKeys
    }}
    action={toggleCamState}
    secondIcon={IconUpOutline}
    secondAction={camSettings}
    separate
  />
{/if}
