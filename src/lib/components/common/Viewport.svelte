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

<div class="kanpas-viewport" bind:this={viewport}>
  <div class="kanpas-html kanpas-root" class:dark-mode={$theme?.darkMode}>
    <div
      class="kanpas-body"
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
  .kanpas-viewport,
  .kanpas-html,
  .kanpas-body {
    display: block;
    width: 100%;
    height: 100%;
  }

  .kanpas-viewport {
    position: relative;
    transform: translateZ(0);
  }

  .kanpas-root {
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

  .kanpas-body {
    overflow: auto;
    cursor: default;
  }
</style>
