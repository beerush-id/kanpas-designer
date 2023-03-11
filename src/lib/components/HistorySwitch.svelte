<script lang="ts">
  import type { History, Reactive } from '@beerush/reactor';
  import Icon from '@components/common/Icon.svelte';

  export let history: Reactive<History<unknown>>;
</script>

{#if history}
  <Icon class="tool-icon"
        clickable
        tooltip="Undo"
        disabled={!$history.canUndo}
        on:click={history.undo}>undo
  </Icon>
  <Icon class="tool-icon"
        clickable
        tooltip="Redo"
        disabled={!$history.canRedo}
        on:click={history.redo}>redo
  </Icon>
  <Icon class="tool-icon"
        clickable
        tooltip="Reset"
        disabled={!$history.changed}
        on:click={history.reset}>restart_alt
  </Icon>
{/if}
