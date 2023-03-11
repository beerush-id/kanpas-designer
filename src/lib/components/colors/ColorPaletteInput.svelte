<script lang="ts">
  import { copy } from '@utils/clipboard.js';
  import { colorName, foreground } from '@utils/colors';
  import { prefixColor } from '@utils/colors.js';
  import { createEventDispatcher, onMount } from 'svelte';
  import Icon from '../common/Icon.svelte';
  import PopUp from '../common/PopUp.svelte';
  import ColorPicker from './ColorPicker.svelte';

  const dispatch = createEventDispatcher();

  export let name = '';
  export let value = '#fefefe';
  export let variable = '';
  export let parent = '';
  export let inheritable = false;

  $: variableName = colorName(parent, name);
  let element: HTMLInputElement;

  onMount(() => {
    if (!name) {
      setTimeout(() => {
        element.focus();
      }, 200);
    }
  });

  const remove = (event: unknown) => {
    dispatch('delete', event);
  };

  const input = () => {
    dispatch('input', { color: value, variable });
  };

  let pickerActive = false;
</script>

<div class="kanpas-color-palette-input">
  <div class="kanpas-color-palette-view flex-row-center" style="background-color: {value}">
    {#if inheritable}
      <PopUp
        expanded
        bind:active={pickerActive}
        trigger="click"
        role="popup"
        xDir="left"
        yDir="below"
        reset>
        <div class="kanpas-acrylic">
          <ColorPicker bind:value bind:variable on:input={input}/>
        </div>
      </PopUp>
    {:else}
      <input class="kanpas-color-palette-picker"
             type="color"
             bind:value
             on:input={input}/>
    {/if}
    <span class="kanpas-color-palette-value" style="color: {foreground(value)}"
    >{variable ? prefixColor(variable) : value}</span>
    {#if !pickerActive}
      <PopUp yDir="above" role="popup" delay={100}>
        <div class="flex-row-center-y">
          <span class="kanpas-color-variable">{variableName}</span>
          <Icon class="mdx-6" clickable tooltip="Copy Color" on:click={() => copy(value)}
          >content_copy
          </Icon>
          <Icon class="mdx-6" clickable tooltip="Copy Variable" on:click={() => copy(variableName)}
          >file_copy
          </Icon>
          <Icon class="mdx-6" clickable tooltip="Remove" on:click={remove}>delete</Icon>
        </div>
      </PopUp>
    {/if}
  </div>
  <input bind:this={element} bind:value={name} class="kanpas-color-palette-name" type="text"/>
</div>

<style lang="scss">
  .kanpas-color-palette-input {
    position: relative;
    flex: 1;

    & :global(.kanpas-color-picker-wrap) {
      position: absolute;
      top: 0;
      left: 0;
    }

    & :global(.kanpas-color-pick) {
      opacity: 0;
    }

    &:first-child {
      .kanpas-color-palette-view {
        border-top-left-radius: var(--kanpas-radius);
      }

      .kanpas-color-palette-name {
        border-bottom-left-radius: var(--kanpas-radius);
      }
    }

    &:last-child {
      .kanpas-color-palette-view {
        border-top-right-radius: var(--kanpas-radius);
      }

      .kanpas-color-palette-name {
        border-bottom-right-radius: var(--kanpas-radius);
      }
    }
  }

  .kanpas-color-palette-input:not(:first-child) {
    .kanpas-color-palette-name,
    .kanpas-color-palette-view {
      border-left: 1px solid var(--kanpas-color-line);
    }
  }

  .kanpas-color-palette-view {
    position: relative;
    height: 32px;
    border-bottom: 1px solid var(--kanpas-color-line);
    transition: box-shadow 0.2s ease-in-out;
    z-index: 0;

    &:hover {
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      z-index: 1;
    }
  }

  .kanpas-color-palette-picker {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 0;
    opacity: 0;
  }

  .kanpas-color-palette-value {
    position: relative;
    z-index: 1;
    font-size: var(--kanpas-font-subtitle);
    pointer-events: none;
  }

  .kanpas-color-palette-name {
    padding: var(--kanpas-space-6) var(--kanpas-space-8);
    width: 100%;
    text-align: center;
    transition: all 0.2s ease-in-out;
    font-size: var(--kanpas-font-subtitle);
    border: none;
    border-radius: 0;

    &:hover {
      box-shadow: inset 0 0 0 1px var(--kanpas-color-input-line-hover);
    }

    &:focus {
      box-shadow: inset 0 0 0 1px var(--kanpas-color-input-line-active);
    }
  }

  .kanpas-color-variable {
    font-size: var(--kanpas-font-subtitle);
    white-space: nowrap;
    margin-right: var(--kanpas-space);
  }
</style>
