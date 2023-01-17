<script lang="ts">
  export let href = '';
  export let color: 'primary' | 'warn' | 'accent' | 'default' = 'primary';
  export let variant: 'flat' | 'borderless' | 'icon' = 'flat';
  export let disabled = false;

  let element: HTMLElement;
  let className = '';
  export { className as class };
</script>

<svelte:element
  this={href && !disabled ? 'a' : 'button'}
  bind:this={element}
  role={href && !disabled ? 'button' : undefined}
  href={href && !disabled ? href : undefined}
  class="kanpas-button style-{variant} color-{color} {className}"
  on:click
  {...$$restProps}>
  <slot />
</svelte:element>

<style lang="scss">
  .kanpas-button {
    display: inline-flex;
    font-weight: 600;
    appearance: none;
    border: 1px solid transparent;
    outline: none;
    background-color: transparent;
    border-radius: var(--kanpas-radius);
    padding: 8px 16px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    letter-spacing: 1px;
    text-transform: uppercase;
  }

  .style-hyperlink {
    background-color: transparent;
  }

  .color-primary:not(.style-borderless) {
    background-color: var(--kanpas-color-primary-normal);
    color: var(--kanpas-white);

    &:hover {
      background-color: var(--kanpas-color-primary-hover);
    }

    &:active {
      background-color: var(--kanpas-color-primary-active);
    }

    &:focus {
      border-color: var(--kanpas-color-primary-active);
    }
  }

  .kanpas-button :global(.kanpas-icon:not(:last-child)) {
    margin-right: 6px;
  }
</style>
