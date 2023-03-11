<script lang="ts">
  import type { DirectionX, DirectionY } from '@beerush/browser-utils';
  import PopUp from './PopUp.svelte';

  export let size: 'thin' | 'small' | 'medium' | 'large' | 'strong' = 'small';
  export let boxSize = 0;
  export let width = 0;
  export let height = 0;
  export let tooltip = '';
  export let clickable = false;
  export let active = false;
  export let disabled = false;
  export let xDir: DirectionX = 'between';
  export let yDir: DirectionY = 'below';

  let className = '';
  export { className as class };
</script>

<div
  class="kanpas-icon kanpas-icon-{size}{clickable ? ' clickable' : ''} {className}"
  class:active
  class:disabled
  style:width="{width || boxSize || ''}px"
  style:height="{height || boxSize || ''}px"
  on:click
  on:keypress>
  <span class="kanpas-icon-symbol">
    <slot/>
  </span>
  {#if tooltip}
    <PopUp {xDir} {yDir}>{tooltip}</PopUp>
  {/if}
  <slot name="tooltip"/>
</div>

<style lang="scss">
  .kanpas-icon {
    position: relative;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    user-select: none;

    &.clickable {
      cursor: pointer;
      transition: all 0.2s ease-in-out;

      &:hover {
        opacity: 0.8;
      }
    }

    &.tool-icon {
      width: var(--kanpas-tool-size);
      height: var(--kanpas-tool-button-size);
    }

    &.active {
      //color: var(--kanpas-color-icon-button-active);
      //background-image: var(--kanpas-button-gradient);

      .kanpas-icon-symbol {
        background-image: var(--kanpas-button-gradient);
        background-clip: text;
        -webkit-background-clip: text;
        color: transparent;
        //filter: drop-shadow(-4px 0 20px var(--kanpas-color-blue-500)) drop-shadow(4px 0 20px var(--kanpas-color-red-500));
      }
    }

    &.disabled {
      pointer-events: none;
      opacity: 0.5;
    }
  }

  .kanpas-icon-symbol {
    font-family: 'Material Symbols Rounded', sans-serif;
    font-weight: normal;
    font-style: normal;
    line-height: 1;
    letter-spacing: normal;
    text-transform: none;
    display: inline-block;
    white-space: nowrap;
    word-wrap: normal;
    direction: ltr;
    -webkit-font-feature-settings: 'liga';
    -webkit-font-smoothing: antialiased;
    transition: all .2s ease-in-out;
    user-select: none;
  }

  .kanpas-icon-thin {
    font-size: 14px;
  }

  .kanpas-icon-small {
    font-size: 18px;
  }

  .kanpas-icon-medium {
    font-size: 24px;
  }

  .kanpas-icon-large {
    font-size: 32px;
  }

  .kanpas-icon-xl {
    font-size: 48px;
  }

  .kanpas-icon-xxl {
    font-size: 72px;
  }

  .kanpas-icon-strong {
    font-size: 128px;
  }
</style>
