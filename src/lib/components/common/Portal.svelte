<script lang="ts">
  import { portal } from '@actions/portal';
  import { onMount } from 'svelte';

  export let slot: HTMLElement | string = '';
  export let draw: HTMLElement | null = null;

  let fragment: HTMLElement;

  if (draw) {
    onMount(() => {
      fragment.appendChild(draw as HTMLElement);
    });
  }
</script>

{#if slot}
  <fragment use:portal={slot}>
    <slot />
  </fragment>
{/if}
{#if draw}
  <fragment bind:this={fragment} />
{/if}

<style>
  fragment {
    display: contents;
  }
</style>
