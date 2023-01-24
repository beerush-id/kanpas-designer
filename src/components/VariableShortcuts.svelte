<script lang="ts">
  import Dialog from '@components/common/Dialog.svelte';
  import Icon from '@components/common/Icon.svelte';
  import ColorEditor from './ColorEditor.svelte';

  let colorDialog;
</script>

<div class="flex-row-center-y">
  <Icon clickable tooltip="Color Variables" class="tool-icon"
        on:click={colorDialog.toggle}>palette
  </Icon>
</div>

<Dialog bind:this={colorDialog} role="drawer" xDir="right">
  <div class="color-drawer kanpas-acrylic">
    <ColorEditor></ColorEditor>
  </div>
</Dialog>

<style lang="scss">
  .color-drawer {
    max-width: 1280px;
    height: 100%;
  }
</style>
