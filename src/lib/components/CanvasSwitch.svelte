<script lang="ts">
  import Icon from '@components/common/Icon.svelte';
  import { canvas } from '@services/canvas.js';

  const setScale = (e: FocusEvent) => {
    const { innerHTML } = e.target as HTMLElement;

    if (innerHTML) {
      canvas.scale = parseInt(innerHTML) / 100;
    }
  };
</script>

<div class="canvas-switch flex-row-center-y">
  <Icon clickable class="tool-icon" tooltip="Zoom Out"
        on:click={() => canvas.zoomOut()}>zoom_out
  </Icon>
  <div class="flex-row-center scale-label mdx-6">
    <span contenteditable="true" on:blur={setScale}>{Math.round($canvas.scale * 100)}</span>
    <span>%</span>
  </div>
  <Icon clickable class="tool-icon" tooltip="Zoom In"
        on:click={() => canvas.zoomIn()}>zoom_in
  </Icon>
  <div class="kds-separator-y"></div>
  <Icon clickable class="tool-icon" tooltip="Reset Zoom"
        on:click={() => canvas.resetZoom()} active={$canvas.scale !== 1}>zoom_in_map
  </Icon>
  <Icon clickable class="tool-icon" tooltip="Center View" active={!$canvas.centered}
        on:click={() => canvas.center()}>center_focus_weak
  </Icon>
</div>

<style lang="scss">
  .scale-label {
    width: 48px;
    text-align: center;

    span:first-child {
      white-space: nowrap;
    }
  }
</style>
