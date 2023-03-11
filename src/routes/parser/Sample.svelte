<script lang="ts">
  import PopUp from '@components/common/PopUp.svelte';

  let count = 1;
</script>

<header>
  <h1>Test</h1>
</header>
<main>
  <p>Testing {count}</p>
  <PopUp>Testing</PopUp>
  {#if count >= 10}
    {@const message = 'You have reached 10!'}
    Hurray!! {message}
  {/if}
  <button on:click={() => count += 1}>+</button>
</main>

<style lang="scss">
  main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
</style>
