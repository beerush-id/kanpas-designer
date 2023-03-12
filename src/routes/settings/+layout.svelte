<script lang="ts">
  import Icon from '@components/common/Icon.svelte';
  import Page from '@components/common/Page.svelte';
  import { navigation } from '@services/navigation.js';

  const route = navigation.get('setting');
  const { path, icon, title, children } = route;
</script>
<Page title="Settings" icon="settings" expanded="true" leftSidebar="true">
  <svelte:fragment slot="left-sidebar">
    <div class="kds-side-menu">
      <a href="{path}" class="kds-side-menu-item flex-row-center-y">
        <Icon class="mdr-10">{icon}</Icon>
        <span>General</span>
      </a>
      {#each $children as child}
        <a href="{child.path}" class="kds-side-menu-item flex-row-center-y" class:active={child.active}>
          <Icon class="mdr-10">{child.icon}</Icon>
          <span>{child.title}</span>
        </a>
      {/each}
    </div>
  </svelte:fragment>
  <slot></slot>
</Page>
<style lang="scss">
  .kds-side-menu {
    min-width: 200px;
    padding-right: var(--kds-space);
  }

  .kds-side-menu-item {
    padding: var(--kds-space-12);
    padding-left: 0;
    color: var(--kds-color-menu);
    font-weight: 500;

    &:not(:last-child) {
      margin-bottom: 4px;
    }

    &:hover {
      color: var(--kds-color-menu-hover);
    }

    &.active {
      color: var(--kds-color-menu-active);
    }
  }
</style>
