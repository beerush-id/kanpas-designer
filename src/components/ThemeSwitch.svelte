<script lang="ts">
  import Icon from '@components/common/Icon.svelte';
  import Toggle from '@components/common/Toggle.svelte';
  import { theme } from '@utils/colors.js';

  export let role: 'switch' | 'toggle' = 'switch';
  export let size = 'small';
  export let xDir = 'between';
  export let yDir = 'below';

  let className = '';
  export { className as class };

  const toggleDarkMode = () => {
    switch (theme.scheme) {
      case 'system':
        theme.scheme = 'dark';
        break;
      case 'dark':
        theme.scheme = 'light';
        break;
      case 'light':
        theme.scheme = 'system';
        break;
      default:
        break;
    }
  };
</script>

{#if role === 'switch'}
  <Icon clickable
        {size}
        {xDir}
        {yDir}
        tooltip={$theme.scheme === 'system' ? 'Switch to Dark Theme' : $theme.scheme === 'light' ? 'Switch to System Theme' : 'Switch to Light Theme'}
        class="theme-switch {$theme.scheme === 'system' ? '' : `${$theme.scheme} `}{className ? ` ${className}` : ''}"
        on:click={toggleDarkMode}>{$theme.scheme === 'system' ? 'contrast' : `${theme.scheme}_mode`}
  </Icon>
{:else if role === 'toggle'}
  <Toggle color="positive"
          tooltip={$theme.darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          leftIcon="dark_mode"
          rightIcon="light_mode"
          class={className}
          bind:checked={$theme.darkMode}/>
{/if}

<style lang="scss">
  :global(.theme-switch.dark) {
    color: var(--kanpas-color-blue-300);
  }

  :global(.theme-switch.light) {
    color: var(--kanpas-color-orange-300);
  }
</style>
