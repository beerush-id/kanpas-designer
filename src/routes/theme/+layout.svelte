<script lang="ts">
  import Icon from '@components/common/Icon.svelte';
  import PopUp from '@components/common/PopUp.svelte';
  import Portal from '@components/common/Portal.svelte';
  import { navigation } from '@services/navigation';

  const route = navigation.get('theme');
</script>

{#if route.name === 'tt'}
  <Portal slot="#immersive-menu">
    <div class="kanpas-acrylic my-2">
      {#each $route.children as menu}
        <a href={menu.path} class="immersive-menu-button" class:active={menu.active}>
          <Icon size="medium">{menu.icon}</Icon>
          <PopUp xDir="after" yDir="between">{menu.title}</PopUp>
        </a>
      {/each}
    </div>
  </Portal>
{/if}
<slot></slot>
