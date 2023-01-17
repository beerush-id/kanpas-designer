<script lang="ts">
  import { forget, resistant } from '@beerush/reactor';
  import Icon from '@components/common/Icon.svelte';
  import { onDestroy, onMount } from 'svelte';

  export let name = '';

  let className = '';
  export { className as class };

  type Tab = {
    name: string;
    icon: string;
    label: string;
  };

  const state = resistant<{ active: string; tabs: Tab[] }>(name, {
    tabs: [],
    active: ''
  });

  onMount(() => {
    if (!state.active && state.tabs.length) {
      state.active = state.tabs[0].name;
    }
  });

  onDestroy(() => {
    forget(name);
  });
</script>

{#if name}
  <div class="kanpas-tab {className}">
    <div class="kanpas-tab-head flex-row-center-y">
      {#if $state}
        {#each $state.tabs as tab}
          <div
            class="kanpas-tab-button flex-row-center"
            class:active={state.active === tab.name}
            on:keypress
            on:click={() => (state.active = tab.name)}>
            {#if tab.icon}
              <Icon class={tab.label ? 'mdr-6' : ''}>{tab.icon}</Icon>
            {/if}
            {#if tab.label}
              <span>{tab.label}</span>
            {/if}
          </div>
        {/each}
      {/if}
      <slot name="tab-head" />
    </div>
    <div class="kanpas-tab-body">
      <slot />
    </div>
  </div>
{:else}
  <div class="kanpas-tab-error">Name is required to display a Tab!</div>
{/if}

<style lang="scss">
  .kanpas-tab {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .kanpas-tab-body {
    flex: 1;
    overflow: auto;
  }

  .kanpas-tab-head {
    border-bottom: 1px solid var(--kanpas-color-line);
  }

  .kanpas-tab-button {
    padding: 8px 24px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    font-weight: 500;
    flex: 1;

    &:not(:last-child) {
      border-right: 1px solid var(--kanpas-color-line);
    }

    &:hover,
    &.active {
      color: var(--kanpas-color-icon-button-active);
    }
  }
</style>
