<script lang="ts">
  import { hoverAssist, selector } from '@services/selector';
  import { theme } from '@utils/colors.js';
  import { createStyles } from '@utils/panel';
  import { createEventDispatcher, onMount } from 'svelte';
  import SelectorBox from '../SelectorBox.svelte';

  export let styles = createStyles();
  let viewport: HTMLElement, body: HTMLElement;

  onMount(() => {
    selector.boundTo(viewport);
  });

  const dispatch = createEventDispatcher();
  const focus = (e: MouseEvent) => {
    selector.addFocus(body, e.ctrlKey);
    dispatch('focus', e);
  };
</script>

<div class="kds-viewport" bind:this={viewport}>
  <div class="kds-html kds-root" class:dark-mode={$theme?.darkMode}>
    <div
      class="kds-body"
      on:click|preventDefault|stopPropagation={focus}
      on:keypress
      use:hoverAssist={styles}
      bind:this={body}>
      <slot/>
    </div>
  </div>
  <SelectorBox/>
</div>

<style lang="scss">
  .kds-viewport,
  .kds-html,
  .kds-body {
    display: block;
    width: 100%;
    height: 100%;
  }

  .kds-viewport {
    position: relative;
    transform: translateZ(0);
  }

  .kds-root {
    color-scheme: only light;
    background-color: #fff;
    color: #000;
    transition: color 0.2s ease-in-out, background-color 0.2s ease-in-out;

    &.dark-mode {
      color-scheme: only dark;
      background-color: #111;
      color: #fff;
    }
  }

  .kds-body {
    overflow: auto;
    cursor: default;
  }
</style>
