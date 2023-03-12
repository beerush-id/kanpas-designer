<script lang="ts">
  import type { Unit } from '@utils/panel';
  import { createEventDispatcher } from 'svelte';
  import PopUp from './PopUp.svelte';

  const dispatch = createEventDispatcher();
  export let unit: Unit = undefined as never;
  export let name = '';
  export let step = 1;
  export let min = null;
  export let max = null;
  export let value = '';
  export let disabled = false;
  export let placeholder = '';
  export let lockUnit = false;
  export let hideUnit = false;

  let className = '';
  export { className as class };

  let self: HTMLInputElement;
  let units: Unit = 'px';
  let count = '';
  let focus = false;
  let unitMenuOpen = false;

  if (typeof unit === 'undefined') {
    unit = 'px';
  }

  if (typeof unit !== 'undefined') {
    units = unit;
  }

  $: {
    if (value) {
      count = parseFloat(value).toString();
      units = (value.match(/[a-z%]+$/) || [])[1] || unit;
    } else {
      count = '';
      units = unit;
    }
  }

  const changeUnit = (u: Unit) => {
    unit = u;
    units = u;

    if (count) {
      value = `${ count }${ units }`;
    }
  };

  const changeValue = (event: KeyboardEvent) => {
    const target: HTMLInputElement = event.target as HTMLInputElement;

    if (target.value) {
      value = `${ target.value }${ units }`;
    } else {
      value = '';
    }

    dispatch('input', event.target);
  };
</script>
<div class="kds-input-unit flex-row-center-y {className}"
     class:focus
     class:disabled
     class:changed={count}>
  <input type="number"
         {name}
         {placeholder}
         {disabled}
         {min}
         {max}
         {step}
         value={count}
         bind:this={self}
         on:keyup={changeValue}
         on:focus={() => focus = true}
         on:blur={()=> focus = false}
         class:expand={!count}>
  {#if !hideUnit}
    <div class="kds-panel-value-unit flex-row-center">
      <span>{units}</span>
      {#if !lockUnit}
        <PopUp role="popup" xDir="right" yDir="below" trigger="click" expanded bind:active={unitMenuOpen}>
          <div class="unit-menu">
            <div class="unit-item" on:keypress on:click={() => changeUnit('%')}>Percent - <span>%</span></div>
            <div class="unit-item" on:keypress on:click={() => changeUnit('px')}>Pixel - <span>px</span></div>
            <div class="unit-item" on:keypress on:click={() => changeUnit('em')}>Font - <span>em</span></div>
            <div class="unit-item" on:keypress on:click={() => changeUnit('vw')}>Viewport Width - <span>vw</span></div>
            <div class="unit-item" on:keypress on:click={() => changeUnit('vh')}>Viewport Height - <span>vh</span></div>
            <div class="unit-item" on:keypress on:click={() => changeUnit('deg')}>Degree - <span>deg</span></div>
          </div>
        </PopUp>
      {/if}
    </div>
  {/if}
  {#if !unitMenuOpen}
    <slot></slot>
  {/if}
</div>

<style lang="scss">
  .kds-input-unit {
    position: relative;
    background-color: var(--kds-color-input-bg);
    border: 1px solid var(--kds-color-input-line);
    border-radius: var(--kds-radius-small);
    transition: all .2s ease-in-out;
    height: 24px;

    &:before, &:after {
      content: "";
      display: block;
      position: absolute;
      z-index: 0;
      border-radius: var(--kds-radius-small);
      pointer-events: none;
      transition: all .2s ease-in-out;
      opacity: 0;
    }

    &:before {
      width: calc(100% + 2px);
      height: calc(100% + 2px);
      top: -1px;
      left: -1px;
      background-image: var(--kds-button-gradient);
    }

    &:after {
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      background-color: var(--kds-color-input-bg);
      border-radius: 2px;
    }

    &.changed {
      //border-color: var(--kds-color-icon-button-active);
      //filter: drop-shadow(-2px -2px 48px var(--kds-color-red-500)) drop-shadow(2px 2px 48px var(--kds-color-blue-500));

      &:before, &:after {
        opacity: 1;
      }
    }

    &.disabled {
      pointer-events: none;
      opacity: 0.5;
    }

    &:hover {
      border-color: var(--kds-color-input-line-hover);
    }

    &.focus {
      border-color: var(--kds-color-input-line-active);
      //filter: drop-shadow(-1px 0 2px var(--kds-color-red-500)) drop-shadow(1px 0 2px var(--kds-color-blue-500));
    }

    &.small input {
      width: 32px;
    }

    input {
      background: transparent;
    }

    span, input, div {
      position: relative;
      z-index: 1;
    }
  }

  .kds-panel-value-unit {
    width: 24px;
    height: 100%;
    cursor: pointer;
    transition: all .2s ease-in-out;

    &:hover {
      opacity: 1;
    }
  }

  .unit-menu {
    background-color: var(--kds-color-input-bg);
    border-radius: var(--kds-radius);
    padding: 6px 0;
  }

  .unit-item {
    font-size: var(--kds-font-subtitle);
    cursor: pointer;
    transition: all .2s ease-in-out;
    padding: 8px 16px;
    color: var(--kds-color-foreground);

    &:hover {
      color: var(--kds-color-icon-button-active-fg);
      background-color: var(--kds-color-icon-button-active);

      span {
        color: var(--kds-color-icon-button-active-fg);
      }
    }

    span {
      font-weight: 600;
      color: var(--kds-color-success-normal);
      transition: all .2s ease-in-out;
    }
  }

  input {
    width: 48px;
    text-align: left;
    border: none;
    opacity: 1;
    height: 22px;
    flex: 1;
    -moz-appearance: textfield;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    margin: 0;
    -webkit-appearance: none;
  }
</style>
