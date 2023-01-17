<script lang="ts">
  import { mockup } from '@services/mockup';
  import { onDestroy } from 'svelte';

  export let expanded = false;
  export let collapsible = false;
  export let title = '';

  mockup.expandedHeaderMenu = expanded;
  mockup.collapsibleHeader = collapsible;

  onDestroy(() => {
    mockup.expandedHeaderMenu = false;
    mockup.collapsibleHeader = false;
  });
</script>

<svelte:head>
  {#if title}
    <title>{title} | Kanpas</title>
  {/if}
</svelte:head>
