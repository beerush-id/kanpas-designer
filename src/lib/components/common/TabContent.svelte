<script lang="ts">
  import { forget, resistant } from '@beerush/reactor';
  import { onDestroy } from 'svelte';

  export let of = '';
  export let name = '';
  export let label = '';
  export let icon = '';
  export let active = false;

  let className = '';
  export { className as class };

  const state: any = resistant(of, {});

  if (state.tabs) {
    if (label || icon) {
      state.tabs.push({ name, label, icon });
    }

    if (active) {
      state.active = name;
    }
  }

  onDestroy(() => {
    forget(of);
  });
</script>

{#if of}
  <div class="kds-tab-content {className}" class:active={$state.active === name}>
    <slot/>
  </div>
{:else}
  <div class="kds-tab-content-error">
    "of" property is required and must be the same with the tab name to display a Tab Content.
  </div>
{/if}

<style lang="scss">
  .kds-tab-content {
    &:not(.active) {
      display: none;
    }
  }
</style>
