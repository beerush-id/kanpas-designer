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
  import { browser } from '@utils/logger';
  import { onDestroy } from 'svelte';
  import '../app.scss';

  css.subscribe();

  persistent('app-settings', {
    domain: 'www.myapp.com'
  });

  const setDarkMode = (dark?: boolean) => {
    if (dark) {
      theme.scheme = 'dark';
      theme.darkMode = true;
    } else {
      theme.scheme = 'light';
      theme.darkMode = false;
    }
  };

  if (browser.isBrowser) {
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)');

    darkMode.addEventListener('change', (e: any) => {
      setDarkMode(e.target.matches);
    });

    setDarkMode(darkMode.matches);
  }

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
  });
</script>

<Immersive>
  <slot/>
</Immersive>
<div id="kanpas-popup" class="kanpas-reset">
  <Toast/>
</div>
