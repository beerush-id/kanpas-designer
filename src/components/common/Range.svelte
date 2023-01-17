<script lang="ts">
  import { createEventDispatcher } from 'svelte';

  export let name = '';
  export let value = undefined;
  export let min = 0;
  export let max = 100;
  export let step = 1;
  export let fill = min;

  let count;
  const dispatch = createEventDispatcher();

  let className = '';
  export { className as class };

  $: {
    if (typeof value === 'number') {
      count = value;
    } else {
      count = fill;
    }
  }

  const update = (e: InputEvent) => {
    value = parseFloat((e.target as HTMLInputElement).value);
    dispatch('input', e.detail);
  };
</script>

<input class="{className}" type="range" {min} {max} {step} value={count} on:input={update}>
