<script lang="ts">
  import Canvas from '@components/Canvas.svelte';
  import CanvasSwitch from '@components/CanvasSwitch.svelte';
  import ColorEditor from '@components/ColorEditor.svelte';
  import Icon from '@components/common/Icon.svelte';
  import ImmersiveOption from '@components/common/ImmersiveOption.svelte';
  import Portal from '@components/common/Portal.svelte';
  import Mockup from '@components/Mockup.svelte';
  import MockupSwitch from '@components/MockupSwitch.svelte';

  import { mockup } from '@services/mockup';

  mockup.use('laptop');

  let editor: {
    copyAllCss: () => void
  };
  const copyAllCss = () => {
    editor.copyAllCss();
  };
</script>

<ImmersiveOption title="Colors" collapsible></ImmersiveOption>
<Portal slot="#immersive-header">
  <div class="flex-row-center-y">
    <div class="kds-tool-group">
      <CanvasSwitch></CanvasSwitch>
    </div>
    <div class="mdr-24"></div>
    <div class="kds-tool-group">
      <MockupSwitch>
        <Icon clickable tooltip="Copy All CSS" on:click={copyAllCss} class="tool-icon">css</Icon>
        <div class="kds-separator-y"></div>
      </MockupSwitch>
    </div>
  </div>
</Portal>
<Canvas>
  <Mockup viewport="desktop">
    <ColorEditor bind:this={editor}></ColorEditor>
  </Mockup>
</Canvas>
