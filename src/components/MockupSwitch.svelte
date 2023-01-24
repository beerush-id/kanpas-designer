<script lang="ts">
  import Icon from '@components/common/Icon.svelte';
  import { mockup } from '@services/mockup.js';
  import { theme } from '@utils/colors';

  const use = (name: string) => {
    mockup.use(name);
  };

  const toggleDarkMode = () => {
    if (theme.scheme === 'dark') {
      theme.scheme = 'light';
    } else {
      theme.scheme = 'dark';
    }
  };
</script>

<div class="kanpas-mockup-switch flex-row-center">
  <slot></slot>
  <Icon clickable
        tooltip={$theme.scheme === 'light' ? 'Switch to Dark Mode' : 'Switch to Light Mode'}
        class="{$theme.scheme} tool-icon"
        on:click={toggleDarkMode}>{$theme.scheme}_mode
  </Icon>
  <Icon clickable
        tooltip="Full View Mode"
        class="tool-icon"
        active={!$mockup.enabled}
        on:click={() => mockup.enabled = !mockup.enabled}>document_scanner
  </Icon>
  <div class="kanpas-separator-y"></div>
  <Icon clickable
        tooltip="Desktop Mode"
        class="tool-icon"
        active={$mockup.active.name === 'desktop'}
        on:click={() => use('desktop')}>desktop_windows
  </Icon>
  <Icon clickable
        tooltip="Laptop Mode"
        class="tool-icon"
        active={$mockup.active.name === 'laptop'}
        on:click={() => use('laptop')}>laptop
  </Icon>
  <Icon clickable
        tooltip="Tablet Mode"
        class="tool-icon"
        active={$mockup.active.name === 'tablet'}
        on:click={() => use('tablet')}>tablet
  </Icon>
  <Icon clickable
        tooltip="Mobile Mode"
        class="tool-icon"
        active={$mockup.active.name === 'mobile'}
        on:click={() => use('mobile')}>phone_iphone
  </Icon>
  <div class="kanpas-separator-y"></div>
  <Icon clickable
        tooltip="Show Notch"
        class="tool-icon"
        active={$mockup.notch}
        on:click={() => mockup.notch = !mockup.notch}>camera_rear
  </Icon>
  <Icon clickable
        tooltip="3D View"
        class="tool-icon"
        active={$mockup.view3d}
        on:click={() => mockup.view3d = !mockup.view3d}>view_in_ar
  </Icon>
  {#if $mockup.active.portraitSupport}
    <Icon clickable
          tooltip="Rotate Screen"
          class="tool-icon"
          on:click={() => mockup.rotate()}>screen_rotation
    </Icon>
  {/if}
</div>

<style lang="scss">
  .kanpas-mockup-switch :global(.kanpas-icon.light) {
    color: var(--kanpas-color-orange-300);
  }
</style>
