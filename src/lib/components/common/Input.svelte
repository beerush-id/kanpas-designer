<script lang="ts">
  export let type = 'text';
  export let placeholder = '';
  export let value = '';
</script>

<div class="kanpas-input">
  {#if placeholder}
    <span class="kanpas-placeholder">{placeholder}</span>
  {/if}
  {#if type === "text"}
    <input type="text" bind:value {...$$restProps}/>
  {:else if type === "number"}
    <input type="number" bind:value {...$$restProps}/>
  {:else if type === "search"}
    <input type="search" bind:value {...$$restProps}/>
  {:else if type === "password"}
    <input type="password" bind:value {...$$restProps}/>
  {:else if type === "email"}
    <input type="email" bind:value {...$$restProps}/>
  {:else if type === "tel"}
    <input type="tel" bind:value {...$$restProps}/>
  {:else if type === "url"}
    <input type="url" bind:value {...$$restProps}/>
  {:else if type === "date"}
    <input type="date" bind:value {...$$restProps}/>
  {:else if type === "datetime-local"}
    <input type="datetime-local" bind:value {...$$restProps}/>
  {:else if type === "month"}
    <input type="month" bind:value {...$$restProps}/>
  {:else if type === "time"}
    <input type="time" bind:value {...$$restProps}/>
  {:else if type === "week"}
    <input type="week" bind:value {...$$restProps}/>
  {/if}
</div>

<style lang="scss">
  .kanpas-input {
    display: inline-flex;
    flex-direction: column;
  }

  .kanpas-placeholder {
    font-size: var(--kanpas-font-subtitle);
    opacity: 0.8;
    margin-bottom: var(--kanpas-space-4);
  }
</style>
