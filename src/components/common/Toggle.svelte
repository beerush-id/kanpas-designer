<script lang="ts">
  import Icon from '@components/common/Icon.svelte';
  import PopUp from '@components/common/PopUp.svelte';

  export let color: 'primary' | 'accent' | 'warn' | 'positive' = 'primary';
  export let checked = false;
  export let tooltip = '';
  export let leftIcon = '';
  export let rightIcon = '';

  let className = '';
  export { className as class };
</script>
<div class="kanpas-toggle {color}{className ? ` ${className}` : ''}" on:click={() => checked = !checked} on:keypress>
  {#if leftIcon}
    <Icon size="thin">{leftIcon}</Icon>
  {/if}
  <div class="flex"></div>
  <div class="kanpas-toggle-pin {color}" class:checked></div>
  {#if rightIcon}
    <Icon size="thin">{rightIcon}</Icon>
  {/if}
  {#if tooltip}
    <PopUp performance>{tooltip}</PopUp>
  {/if}
</div>

<style lang="scss">
  @keyframes slideLeft {
    0% {
      left: 50%;
      width: 50%;
    }
    50% {
      left: 0;
      width: 100%;
    }
    100% {
      width: 50%;
    }
  }

  @keyframes slideRight {
    0% {
      left: 0;
      width: 50%;
    }
    50% {
      left: 0;
      width: 100%;
    }
    100% {
      left: 50%;
      width: 50%;
    }
  }

  .kanpas-toggle {
    display: flex;
    flex-direction: row;
    align-items: center;
    width: 48px;
    height: 24px;
    background-color: var(--kanpas-color-input-bg);
    padding: 4px;
    border-radius: 16px;
    position: relative;
    cursor: pointer;
    border: 1px solid var(--kanpas-color-input-line);
  }

  .kanpas-toggle-pin {
    position: absolute;
    left: 0;
    top: 0;
    width: 50%;
    height: 100%;
    background-color: var(--kanpas-color-input-line);
    border-radius: 16px;
    z-index: 1;
    border: 2px solid var(--kanpas-color-input-bg);
    transition: all .2s ease-in-out;

    &.primary {
      background-color: var(--kanpas-color-primary-normal);

      &:hover {
        background-color: var(--kanpas-color-primary-hover);
      }
    }

    &.accent {
      background-color: var(--kanpas-color-accent-normal);

      &:hover {
        background-color: var(--kanpas-color-accent-hover);
      }
    }

    &.warn {
      background-color: var(--kanpas-color-warn-normal);

      &:hover {
        background-color: var(--kanpas-color-warn-hover);
      }
    }

    &.positive {
      background-color: var(--kanpas-color-success-normal);

      &:hover {
        background-color: var(--kanpas-color-success-hover);
      }
    }

    &:not(.checked) {
      animation: slideLeft .3s var(--ease-bounce);
    }

    &.checked {
      left: 50%;
      animation: slideRight .3s var(--ease-bounce);
    }
  }
</style>
