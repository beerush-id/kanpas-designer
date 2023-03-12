<script lang="ts">
  import Dialog from '@components/common/Dialog.svelte';
  import Icon from '@components/common/Icon.svelte';
  import CSSVariableEditor from '@components/CSSVariableEditor.svelte';
  import ColorEditor from './ColorEditor.svelte';

  let colorDialog;
  let variableDialog;
</script>

<div class="flex-row-center-y">
  <Icon clickable tooltip="Color Variables" class="tool-icon"
        on:click={colorDialog.toggle}>palette
  </Icon>
  <Icon clickable tooltip="CSS Variables" class="tool-icon"
        on:click={variableDialog.toggle}>auto_awesome_mosaic
  </Icon>
</div>

<Dialog bind:this={colorDialog} role="drawer" xDir="right">
  <div class="color-drawer kds-acrylic">
    <ColorEditor></ColorEditor>
  </div>
</Dialog>

<Dialog bind:this={variableDialog} role="drawer" xDir="right">
  <div class="variable-drawer kds-acrylic-bg">
    <CSSVariableEditor></CSSVariableEditor>
  </div>
</Dialog>

<style lang="scss">
  .color-drawer, .variable-drawer {
    height: 100%;
    position: relative;
  }

  .color-drawer {
    max-width: 1280px;
  }

  .variable-drawer {
    filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.2));
    border-radius: var(--kds-radius);
    border-top-left-radius: 0;

    &:before {
      border-radius: var(--kds-radius);
      border-top-left-radius: 0;
    }
  }
</style>
