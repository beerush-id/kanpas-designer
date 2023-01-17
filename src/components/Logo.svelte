<script lang="ts">
  import Icon from '@components/common/Icon.svelte';
  import { navigation } from '@services/navigation.js';

  export let mode: 'full' | 'mono' | 'black' | 'white' | 'adaptive' = 'adaptive';
</script>
{#if $navigation.navigating}
  <div class="loading flex-row-center">
    <Icon size="medium">downloading</Icon>
  </div>
{:else}
  <svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="{mode}">
    <path class="primary-fill"
          d="M372.41,96.54H134.93c-11.19,0-20.25,9.07-20.25,20.25v237.48c0,18.04,21.82,27.08,34.58,14.32l237.48-237.48c12.76-12.76,3.72-34.58-14.32-34.58Z"/>
    <path class="secondary-fill"
          d="M392.31,386.45l-87.37-87.41c-6.64-6.64-17.4-6.64-24.03,0l-47.77,47.77c-6.64,6.63-6.64,17.39,0,24.03l39.61,39.64c3.19,3.19,7.51,4.98,12.02,4.98h95.53c15.14,0,22.72-18.3,12.02-29.01Z"/>
  </svg>
{/if}
<style lang="scss">
  .primary-fill, .secondary-fill {
    transition: all .3s ease-in-out;
  }

  .full {
    .primary-fill {
      fill: var(--kanpas-color-logo-primary);
    }

    .secondary-fill {
      fill: var(--kanpas-color-logo-secondary);
    }
  }

  .mono .primary-fill, .mono .secondary-fill {
    fill: var(--kanpas-color-foreground);
  }

  .black {
    .primary-fill {
      fill: var(--kanpas-color-grey-950);
    }

    .secondary-fill {
      fill: var(--kanpas-color-grey-800);
    }
  }

  .white {
    .primary-fill {
      fill: var(--kanpas-color-grey-10);
    }

    .secondary-fill {
      fill: var(--kanpas-color-grey-300);
    }
  }

  .adaptive {
    .primary-fill {
      fill: var(--kanpas-color-adaptive-primary);
    }

    .secondary-fill {
      fill: var(--kanpas-color-adaptive-secondary);
    }
  }

  .loading {
    animation: fadeIn .5s cubic-bezier(.47, 1.64, .41, .8) infinite;
    color: var(--kanpas-color-logo-secondary);
  }
</style>
