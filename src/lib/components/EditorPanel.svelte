<script lang="ts">
  import Tab from '@components/common/Tab.svelte';
  import TabContent from '@components/common/TabContent.svelte';
  import CSSPanel from '@components/CSSPanel.svelte';
  import StylePanel from '@components/StylePanel.svelte';
  import { createOptions, createStyles } from '@utils/panel';

  export let element: HTMLElement;
  export let styles = createStyles();
  export let options = createOptions();
  export let textMode = false;
</script>

{#if element}
  <div class="kds-panel"
       style:padding="var(--kds-space-10) var(--kds-space-16)"
       style:border-bottom="1px solid var(--kds-toolbar-line)">
    <div class="kds-panel-title flex-row-center-y">
      <span class="flex">Active Element:</span>
      <code>{`<${ element.name }>`}</code>
    </div>
  </div>
{/if}

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
