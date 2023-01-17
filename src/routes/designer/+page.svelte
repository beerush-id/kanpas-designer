<script lang="ts">
  import Page from '@components/common/Page.svelte';
  import EditorPanel from '@components/EditorPanel.svelte';
  import Mockup from '@components/Mockup.svelte';
</script>

<Page leftSidebar expanded rightSidebar expandedRightSidebar>
  <Mockup>
    <h1>Heading</h1>
    <p>Paragraph</p>
  </Mockup>
  <svelte:fragment slot="right-sidebar">
    <EditorPanel></EditorPanel>
  </svelte:fragment>
</Page>
