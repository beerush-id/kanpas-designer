<script lang="ts">
  import Tab from '@components/common/Tab.svelte';
  import TabContent from '@components/common/TabContent.svelte';
  import CSSPanel from '@components/CSSPanel.svelte';
  import StylePanel from '@components/StylePanel.svelte';
  import { createOptions, createStyles } from '@utils/panel';

  export let styles = createStyles();
  export let options = createOptions();
  export let textMode = false;
</script>

<Tab name="editor-tab">
  <TabContent of="editor-tab" name="style" label="Style" icon="style">
    <div class="kds-editor-content">
      <StylePanel {styles} {options} {textMode}></StylePanel>
    </div>
  </TabContent>
  <TabContent of="editor-tab" name="css" label="CSS" icon="function">
    <div class="kds-editor-content">
      <CSSPanel {styles}></CSSPanel>
    </div>
  </TabContent>
</Tab>

<style lang="scss">
  .kds-editor-content {
    width: 320px;
    padding: var(--kds-space-small) 0;
  }

  .kds-editor-content :global(.kds-panel) {
    padding: 0 var(--kds-space-16);
  }
</style>
