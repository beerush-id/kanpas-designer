<script lang="ts">
  import { afterNavigate, beforeNavigate } from '$app/navigation';
  import { persistent } from '@beerush/reactor';
  import Immersive from '@components/common/Immersive.svelte';
  import Toast from '@components/common/Toast.svelte';
  import { css } from '@services/css';
  import { navigation } from '@services/navigation';
  import { selector } from '@services/selector';
  import type { AfterNavigate } from '@sveltejs/kit';
  import { theme } from '@utils/colors';
  import { onDestroy } from 'svelte';
  import '../app.scss';

  css.subscribe();

  persistent('app-settings', {
    domain: 'www.myapp.com'
  });

  const setDarkMode = (dark?: boolean) => {
    theme.darkMode = theme.scheme === 'system' ? dark : theme.scheme === 'dark';
  };

  const darkMode = window.matchMedia('(prefers-color-scheme: dark)');

  darkMode.addEventListener('change', (e: any) => {
    setDarkMode(e.target.matches);
  });

  setDarkMode(darkMode.matches);

  const unsubScheme = theme.subscribe((o, f, v, a, path) => {
    const dark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    document.body.classList.remove('kanpas-light');
    document.body.classList.remove('kanpas-dark');

    if ([ 'light', 'dark' ].includes(theme.scheme as never)) {
      document.body.classList.add(`kanpas-${ theme.scheme }`);
    }

    if (!path || path === 'scheme') {
      theme.darkMode = theme.scheme === 'system' ? dark : theme.scheme === 'dark';
    }
  });

  beforeNavigate(() => {
    selector.clearFocus();
    navigation.navigating = true;
  });

  afterNavigate((nav: AfterNavigate) => {
    navigation.activate(nav);
    navigation.navigating = false;
  });

  onDestroy(() => {
    css.unsubscribe();
    if (typeof unsubScheme === 'function') {
      unsubScheme();
    }
  });
</script>

<Immersive>
  <slot/>
</Immersive>
<div id="kanpas-popup" class="kanpas-reset">
  <Toast/>
</div>
