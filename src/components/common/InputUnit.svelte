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
<div class="kanpas-input-unit flex-row-center-y {className}"
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
    <div class="kanpas-panel-value-unit flex-row-center">
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
  .kanpas-input-unit {
    position: relative;
    background-color: var(--kanpas-color-input-bg);
    border: 1px solid var(--kanpas-color-input-line);
    border-radius: var(--kanpas-radius-small);
    transition: all .2s ease-in-out;
    height: 24px;

    &.changed {
      border-color: var(--kanpas-color-icon-button-active);
    }

    &.disabled {
      pointer-events: none;
      opacity: 0.5;
    }

    &:hover {
      border-color: var(--kanpas-color-input-line-hover);
    }

    &.focus {
      border-color: var(--kanpas-color-input-line-active);
    }

    &.small input {
      width: 32px;
    }
  }

  .kanpas-panel-value-unit {
    width: 24px;
    height: 100%;
    cursor: pointer;
    transition: all .2s ease-in-out;

    &:hover {
      opacity: 1;
    }
  }

  .unit-menu {
    background-color: var(--kanpas-color-input-bg);
    border-radius: var(--kanpas-radius);
    padding: 6px 0;
  }

  .unit-item {
    font-size: var(--kanpas-font-subtitle);
    cursor: pointer;
    transition: all .2s ease-in-out;
    padding: 8px 16px;
    color: var(--kanpas-color-foreground);

    &:hover {
      color: var(--kanpas-color-icon-button-active-fg);
      background-color: var(--kanpas-color-icon-button-active);

      span {
        color: var(--kanpas-color-icon-button-active-fg);
      }
    }

    span {
      font-weight: 600;
      color: var(--kanpas-color-success-normal);
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
