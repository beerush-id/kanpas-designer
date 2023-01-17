<script lang="ts">
  import { focusAssist } from '@services/selector';
  import Icon from './Icon.svelte';

  export let title = '';
  export let icon = '';
  export let role: 'main' | 'child' = 'main';
  export let expanded = false;
  export let expandedLeftSidebar = false;
  export let expandedRightSidebar = false;
  export let leftSidebar = false;
  export let rightSidebar = false;
  export let captureFocus = false;

  let className = '';
  export { className as class };
</script>

<svelte:head>
  {#if title}
    <title>{title} | Kanpas</title>
  {:else}
    <title>Kanpas</title>
  {/if}
</svelte:head>

<div
  class="kanpas-page {role === 'main' ? 'kanpas-card' : 'kanpas-card-bg-alt'} {role} {className}"
  class:expanded>
  <div class="kanpas-page-body flex-row">
    {#if leftSidebar}
      <div
        class="kanpas-sidebar kanpas-sidebar-left kanpas-reset"
        class:expanded={expandedLeftSidebar}>
        {#if title}
          <div class="kanpas-page-head">
            <svelte:element this={role === 'main' ? 'h2' : 'h3'} class="flex-row-center-y flex">
              {#if icon}
                <Icon size="medium" class="mdr-10">{icon}</Icon>
              {/if}
              <span>{title}</span>
            </svelte:element>
            <slot name="head-suffix" />
          </div>
        {/if}
        <slot name="left-sidebar" />
      </div>
    {/if}
    <div class="kanpas-page-content flex" use:focusAssist={captureFocus}>
      {#if !leftSidebar && title}
        <div class="kanpas-page-head kanpas-reset">
          <svelte:element this={role === 'main' ? 'h2' : 'h3'} class="flex-row-center-y flex">
            {#if icon}
              <Icon size="medium" class="mdr-10">{icon}</Icon>
            {/if}
            <span>{title}</span>
          </svelte:element>
          <slot name="head-suffix" />
        </div>
      {/if}
      <slot />
    </div>
    {#if rightSidebar}
      <div
        class="kanpas-sidebar kanpas-sidebar-right kanpas-reset"
        class:expanded={expandedRightSidebar}>
        <slot name="right-sidebar" />
      </div>
    {/if}
  </div>
</div>

<style lang="scss">
  @keyframes slideUpFull {
    from {
      transform: translate3d(0, 10px, 0);
    }
    to {
      transform: translate3d(0, 0, 0);
    }
  }

  .kanpas-page {
    width: 100%;
    height: 100%;
    padding-bottom: 0;
    animation: slideUpFull 0.3s ease-in-out;
    overflow: hidden;

    &.expanded > .kanpas-page-body > .kanpas-page-content {
      padding: 0;
      overflow: hidden;
    }

    &.main {
      width: calc(100% - 128px);
      max-width: 960px;
      margin: 64px auto 0 auto;
      height: calc(100% - 64px);
    }
  }

  .kanpas-sidebar {
    padding: var(--kanpas-space);
    overflow: auto;

    &.expanded {
      padding: 0;
    }
  }

  .kanpas-sidebar-left {
    border-right: 1px solid var(--kanpas-color-line);
    background-color: var(--kanpas-color-background-side);
    z-index: 1;
  }

  .kanpas-sidebar-right {
    background-color: var(--kanpas-color-background-side);
    border-left: 1px solid var(--kanpas-color-line);
    z-index: 1;
  }

  .kanpas-page-head {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: var(--kanpas-space);
  }

  .kanpas-page-body {
    height: 100%;
  }

  .kanpas-page-content {
    padding: var(--kanpas-space);
    overflow: auto;
    height: 100%;
    z-index: 0;
  }
</style>
