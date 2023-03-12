<script lang="ts">
  import { cssVarName, theme } from '@utils/colors';
  import { createEventDispatcher } from 'svelte';
  import PopUp from '../common/PopUp.svelte';
  import ColorPicker from './ColorPicker.svelte';

  const dispatch = createEventDispatcher();

  export let value = '';
  export let variable = '';
  export let tooltip = 'Select Color';

  let className = '';
  let active = false;
  export { className as class };
</script>

<div class="kds-root kds-color-picker-trigger {className}"
     class:dark-mode={$theme.darkMode}
     style:background-color={variable ? cssVarName(variable) : (value||'transparent')}>
  {#if !active}
    <PopUp>{tooltip}</PopUp>
  {/if}
  <PopUp expanded role="popup" xDir="right" yDir="below" trigger="click" bind:active reset>
    <div class="kds-acrylic">
      <ColorPicker bind:value bind:variable on:input={() => dispatch('change')}></ColorPicker>
    </div>
  </PopUp>
</div>
<style lang="scss">
  .kds-color-picker-trigger {
    width: 24px;
    height: 24px;
    border: 1px solid var(--kds-color-line);
    border-radius: var(--kds-radius-small);
    position: relative;

    &:before {
      content: "";
      display: block;
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: -1;
      //border-radius: var(--kds-radius-small);
      //background-image: linear-gradient(90deg, #00000010 50%, #00000040 50%), linear-gradient(180deg, #00000010 50%, #00000040 50%);
      background-image: var(--kds-color-placeholder);
      //background-size: 15px 15px;
    }
  }
</style>
