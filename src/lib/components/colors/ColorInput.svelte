<script lang="ts">
  import { colorName, prefixColor } from '@utils/colors.js';
  import { createEventDispatcher, onMount } from 'svelte';
  import PopUp from '../common/PopUp.svelte';
  import ColorPicker from './ColorPicker.svelte';

  export let name = '';
  export let value = '#fefefe';
  export let group = '';
  export let variable = '';

  let focused: boolean;
  let nameInput: HTMLInputElement;

  const dispatch = createEventDispatcher();

  onMount(() => {
    if (!name) {
      setTimeout(() => {
        nameInput.focus();
      }, 200);
    }
  });

  let pickerActive = false;
</script>

<div class="kds-color-input flex-row-center-y {focused ? 'focus' : ''}">
  <div class="kds-color-input-name flex flex-row-center-y">
    <span class="kds-color-input-value mdr-4">{colorName(group)}-</span>
    <input
      class="flex"
      type="text"
      bind:this={nameInput}
      bind:value={name}
      on:focus={() => (focused = true)}
      on:blur={() => (focused = false)}/>
  </div>
  <div class="kds-color-input-trigger">
    <div class="kds-color-input-pick" style="background-color: {value}">
      {#if !pickerActive}
        <PopUp xDir="before" yDir="between">{variable ? prefixColor(variable) : value}</PopUp>
      {/if}
      <PopUp
        expanded
        bind:active={pickerActive}
        role="popup"
        xDir="right"
        yDir="below"
        trigger="click">
        <ColorPicker bind:value bind:variable on:input={() => dispatch('input', { color:value, variable })}/>
      </PopUp>
    </div>
  </div>
</div>

<style lang="scss">
  .kds-color-input {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: var(--kds-radius);
    border: 1px solid var(--kds-color-input-line);
    background-color: var(--kds-color-input-bg);
    transition: all 0.2s ease-in-out;
    padding: 8px 12px 8px 8px;

    &:hover {
      border-color: var(--kds-color-input-line-hover);
    }

    &.focus {
      border-color: var(--kds-color-input-line-active);
    }
  }

  .kds-color-input-trigger {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 10px;
  }

  .kds-color-input-value {
    min-width: 68px;
    text-align: center;
    font-size: 11px;
    color: var(--kds-color-tooltip);
    background-color: var(--kds-color-tooltip-bg);
    padding: 4px 8px;
    border-radius: 3px;
    white-space: nowrap;
  }

  .kds-color-input-name {
    flex: 1;

    input {
      display: block;
      width: 100%;
      border: none;
      border-radius: 0;
    }
  }

  .kds-color-input-pick {
    width: 20px;
    height: 20px;
    border: 1px solid var(--kds-color-line);
    border-radius: var(--kds-radius-small);
  }
</style>
