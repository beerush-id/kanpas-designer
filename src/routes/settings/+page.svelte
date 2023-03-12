<script lang="ts">
  import Input from '@components/common/Input.svelte';
  import Page from '@components/common/Page.svelte';
  import { settings } from '@services/settings';
</script>

<Page role="child" title="General Settings" icon="settings_applications">
  <div class="kds-reset">
    <div class="flex-column">
      <Input placeholder="Domain Name" bind:value={settings.domain}/>
    </div>
  </div>
</Page>
