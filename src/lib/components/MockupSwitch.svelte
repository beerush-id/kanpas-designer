<script lang="ts">
  import Icon from '@components/common/Icon.svelte';
  import ThemeSwitch from '@components/ThemeSwitch.svelte';
  import { mockup } from '@services/mockup.js';

  const use = (name: string) => {
    mockup.use(name);
  };
</script>

<div class="kds-mockup-switch flex-row-center">
  <slot></slot>
  <div class="mdl-8"></div>
  <ThemeSwitch role="toggle"></ThemeSwitch>
  <Icon clickable
        tooltip="Full View Mode"
        class="tool-icon"
        active={!$mockup.enabled}
        on:click={() => mockup.enabled = !mockup.enabled}>document_scanner
  </Icon>
  <div class="kds-separator-y"></div>
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
  <div class="kds-separator-y"></div>
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
  .kds-mockup-switch :global(.kds-icon.light) {
    color: var(--kds-color-orange-300);
  }
</style>
