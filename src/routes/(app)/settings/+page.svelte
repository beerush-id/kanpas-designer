<script lang="ts">
  import Page from '@components/common/Page.svelte';
  import { settings } from '@services/settings';
  import Input from '@components/common/Input.svelte';
</script>

<Page role="child" title="General Settings" icon="settings_applications">
  <div class="kanpas-reset">
    <div class="flex-column">
      <Input placeholder="Domain Name" bind:value={settings.domain} />
    </div>
  </div>
</Page>
