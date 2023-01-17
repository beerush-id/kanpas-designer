<script lang="ts">
  import type { Reactive } from '@beerush/reactor';
  import Icon from '@components/common/Icon.svelte';
  import PopUp from '@components/common/PopUp.svelte';
  import Logo from '@components/Logo.svelte';
  import UserAvatar from '@components/UserAvatar.svelte';
  import { mockup } from '@services/mockup';
  import { navigation, type Route } from '@services/navigation.js';
  import { blurAssist } from '@services/selector';

  const { main }: {
    main: Reactive<Route[]>
  } = navigation.routerGroups as never;

  export let title = '';
  export let expanded = false;
  export let collapsible = false;
</script>

<svelte:head>
  {#if title}
    <title>{title} | Kanpas</title>
  {/if}
</svelte:head>

<div class="kanpas-immersive-header kanpas-reset" class:maximize={$mockup?.fullScreen}>
  <div class="kanpas-header-menu flex-row-center-y kanpas-acrylic" class:expanded use:blurAssist>
    <a href="/" class="header-menu header-menu-icon">
      <Logo></Logo>
    </a>
  </div>
  <div class="flex"></div>
  <div id="immersive-header" class="kanpas-header-extras" use:blurAssist>
    <slot name="header"></slot>
  </div>
  <div class="flex"></div>
  <div class="kanpas-header-tools flex-row-center-y kanpas-acrylic" use:blurAssist>
    <UserAvatar class="mx-1"></UserAvatar>
  </div>
</div>
{#if collapsible}
  <div class="minimize kanpas-acrylic flex-row-center" class:maximize={$mockup?.fullScreen}>
    <Icon clickable tooltip="Collapse" on:click={() => mockup.minimize()}>
      close_fullscreen
    </Icon>
  </div>
{/if}

<div class="kanpas-immersive-menu kanpas-accept-events kanpas-reset" class:collapse={$mockup?.fullScreen}>
  <div class="flex"></div>
  <div class="kanpas-immersive-menu-list kanpas-acrylic pdy-4">
    {#each $main || [] as route}
      <div class="immersive-menu-item">
        <a href={route.path} class="kanpas-tool-button immersive-menu-button" class:active={route.active}>
          <Icon>{route.icon}</Icon>
          {#if !route.children || (route.children && !route.children.length)}
            <PopUp xDir="after" yDir="between">{route.title}</PopUp>
          {/if}
          {#if route.children && route.children.length && !route.active}
            <PopUp xDir="after" yDir="top" role="popup" dismiss>
              <div class="flex-column pd-4">
                {#each route.children as child}
                  <a href={child.path} class="header-submenu flex-row-center-y" class:active={child.active}>
                    {#if child.icon}
                      <Icon>{child.icon}</Icon>
                    {/if}
                    <span class="mdl-10">{child.title}</span>
                  </a>
                {/each}
              </div>
            </PopUp>
          {/if}
        </a>
        {#if route.active && route.children && route.children.length}
          <div class="kanpas-separator-x"></div>
          {#each route.children as child}
            <a href={child.path} class="kanpas-tool-button immersive-menu-button" class:active={child.active}>
              <Icon>{child.icon}</Icon>
              {#if !child.children || (child.children && !child.children.length)}
                <PopUp xDir="after" yDir="between">{child.title}</PopUp>
              {/if}
            </a>
          {/each}
          <div class="kanpas-separator-x"></div>
        {/if}
      </div>
    {/each}
  </div>
  <div id="immersive-menu"></div>
  <div class="flex"></div>
  <div class="kanpas-acrylic mdb-8">
    {#if collapsible}
      <Icon clickable
            xDir="after"
            yDir="between"
            tooltip={$mockup?.fullScreen ? 'Collapse' : 'Expand'}
            class="header-menu-icon"
            on:click={() => mockup.toggleMax()}>
        {$mockup?.fullScreen ? 'close_fullscreen' : 'open_in_full'}
      </Icon>
    {/if}
    <Icon clickable
          xDir="after"
          yDir="between"
          tooltip="Settings"
          class="header-menu-icon"
          on:click={() => navigation.goto('/settings')}>
      settings
    </Icon>
  </div>
</div>

<slot></slot>

<style lang="scss">
  .kanpas-immersive-menu {
    display: flex;
    flex-direction: column;
    height: calc(100% - 56px);
    padding-left: var(--kanpas-space-tight);
    position: fixed;
    top: 56px;
    left: 0;
    z-index: 999;
    transition: transform .2s ease-in-out;

    &.collapse {
      transform: translate3d(-100%, 0, 0);
    }

    :global(.header-menu-icon) {
      width: 40px;
      height: 40px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }

    :global(.kanpas-separator-y) {
      margin: 0;
    }

    :global(.immersive-menu-button) {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      color: var(--kanpas-color-foreground);

      &:hover {
        //transform: scale3d(1.2, 1.2, 1);
        color: var(--kanpas-color-icon-button-active);
      }
    }

    :global(.immersive-menu-button.active) {
      color: var(--kanpas-color-icon-button-active);
    }

    :global(.immersive-menu-button.active .kanpas-icon) {
      //background: radial-gradient(var(--kanpas-color-orange-500) 20%, var(--kanpas-color-red-300) 30%, var(--kanpas-color-blue-500) 50%, var(--kanpas-color-red-300) 60%);
      //-webkit-background-clip: text;
      //-webkit-text-fill-color: transparent;
    }

    :global(.kanpas-separator-y) {
      margin: 0;
    }
  }

  .minimize {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999999;
    width: 40px;
    height: 40px;
    transform: translate3d(-100%, 100%, 0);
    transition: all .2s ease-in-out;

    &.maximize {
      transform: translate3d(0, 0, 0);
      bottom: var(--kanpas-space-tight);
      left: var(--kanpas-space-tight);
    }
  }

  .kanpas-immersive-header {
    width: 100%;
    display: flex;
    flex-direction: row;
    padding: var(--kanpas-space-tight);
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    pointer-events: none;
    transition: transform .2s ease-in-out;

    &.maximize {
      transform: translate3d(0, -100%, 0);
    }

    :global(.header-menu-icon) {
      width: 40px;
      height: 40px;
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }

    :global(.kanpas-separator-y) {
      margin: 0;
    }
  }

  .kanpas-header-menu,
  .kanpas-header-tools,
  .kanpas-header-extras {
    pointer-events: fill;
  }

  .header-menu {
    color: var(--kanpas-color-foreground);

    &:hover {
      color: var(--kanpas-color-menu-hover);
    }
  }

  .kanpas-header-menu {
    height: 40px;
  }

  .header-submenu {
    color: var(--kanpas-color-tooltip);
    margin-bottom: 18px;

    &:last-child {
      margin-bottom: 0;
    }

    &:hover {
      color: var(--kanpas-color-menu-hover);
    }

    &.active {
      color: var(--kanpas-color-menu-active);
    }
  }
</style>
