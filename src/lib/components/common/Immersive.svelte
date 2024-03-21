<script lang="ts">
  import type { Reactive } from '@beerush/reactor';
  import Icon from '@components/common/Icon.svelte';
  import PopUp from '@components/common/PopUp.svelte';
  import Logo from '@components/Logo.svelte';
  import ThemeSwitch from '@components/ThemeSwitch.svelte';
  import UserAvatar from '@components/UserAvatar.svelte';
  import { mockup } from '@services/mockup';
  import { navigation, type Route } from '@services/navigation.js';
  import { blurAssist } from '@services/selector';

  const { main }: {
    main: Reactive<Route[]>
  } = navigation.routerGroups;

  export let title = '';
  export let statusbar = false;
</script>

<svelte:head>
  {#if title}
    <title>{title} | Kanpas</title>
  {/if}
</svelte:head>

<div class="kds-immersive" class:expanded={$mockup?.fullScreen} class:with-statusbar={statusbar}>
  <div class="kds-immersive-header kds-acrylic-bg kds-reset" class:maximize={$mockup?.fullScreen}>
    <div class="kds-header-menu flex-row-center" use:blurAssist>
      <a href="/" class="header-menu header-menu-icon">
        <Logo></Logo>
      </a>
    </div>
    <div class="kds-immersive-breadcrumb kds-tool-group pdy-6 pdx-12 flex-row-center-y kds-accept-events mdl-12">
      {#each $navigation?.routes.filter(route => route.active) as route}
        <a href={route.path} class="flex-row-center-y">
          <span>{route.title}</span>
        </a>
      {/each}
    </div>
    <div class="flex"></div>
    <div id="immersive-header" class="kds-header-extras flex-row-center-y" use:blurAssist>
      <slot name="header"></slot>
    </div>
    <div class="flex"></div>
    <div class="kds-tool-group flex-row-center-y kds-accept-events">
      <span class="mdx-16">Dev Server</span>
      <div class="kds-separator-y"></div>
      <Icon clickable tooltip="Restart Dev Server" class="tool-icon" active>replay</Icon>
    </div>
    <div class="kds-header-tools flex-row-center-y" use:blurAssist>
      <UserAvatar class="mx-1"></UserAvatar>
    </div>
  </div>
  <div class="kds-immersive-menu kds-accept-events kds-acrylic-bg kds-reset"
       class:collapse={$mockup?.fullScreen}>
    <div class="kds-immersive-menu-list pdy-4">
      {#each $main || [] as route}
        {#if !route.hidden}
          <div class="immersive-menu-item">
            <a href={route.path} class="kds-tool-button immersive-menu-button" class:active={route.active}>
              <Icon>{route.icon}</Icon>
              {#if !route.children || (
                route.children && !route.children.length
              )}
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
              <div class="kds-separator-x"></div>
              {#each route.children as child}
                <a href={child.path} class="kds-tool-button immersive-menu-button" class:active={child.active}>
                  <Icon>{child.icon}</Icon>
                  {#if !child.children || (
                    child.children && !child.children.length
                  )}
                    <PopUp xDir="after" yDir="between">{child.title}</PopUp>
                  {/if}
                </a>
              {/each}
              <div class="kds-separator-x"></div>
            {/if}
          </div>
        {/if}
      {/each}
    </div>
    <div id="immersive-menu"></div>
    <div class="flex"></div>
    <div class="mdy-8">
      <Icon clickable
            xDir="after"
            yDir="between"
            tooltip={$mockup?.fullScreen ? 'Collapse' : 'Expand'}
            class="header-menu-icon"
            on:click={() => mockup.toggleMax()}>
        {$mockup?.fullScreen ? 'close_fullscreen' : 'open_in_full'}
      </Icon>
      <ThemeSwitch xDir="after" yDir="between" class="header-menu-icon" />
      <!--      <Icon clickable-->
      <!--            xDir="after"-->
      <!--            yDir="between"-->
      <!--            tooltip="Settings"-->
      <!--            class="header-menu-icon"-->
      <!--            on:click={() => navigation.goto('/settings')}>-->
      <!--        settings-->
      <!--      </Icon>-->
    </div>
  </div>
  <div class="kds-immersive-body">
    <slot></slot>
  </div>
  {#if statusbar}
    <div class="kds-immersive-footer kds-acrylic-bg kds-reset" class:expanded={$mockup?.fullScreen}>
      <div class="kds-immersive-breadcrumb flex-row-center-y kds-accept-events">
        {#each $navigation?.routes.filter(route => route.active) as route}
          <a href={route.path} class="flex-row-center-y">
            <span>{route.title}</span>
          </a>
        {/each}
      </div>
      <div class="flex"></div>
      <span>&copy; 2023 Beerush. All rights reserved.</span>
    </div>
  {/if}
</div>
<div class="minimize kds-acrylic flex-row-center" class:maximize={$mockup?.fullScreen}>
  <Icon clickable tooltip="Collapse" class="tool-icon" on:click={() => mockup.minimize()}>
    close_fullscreen
  </Icon>
</div>

<style lang="scss">
  .kds-immersive {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding-top: var(--kds-toolbar-height);
    padding-left: var(--kds-sidemenu-width);
    transition: all .2s ease-in-out;

    &.expanded {
      padding: 0;
    }

    &.with-statusbar:not(.expanded) {
      padding-bottom: var(--kds-statusbar-height);
    }

    &.with-statusbar {
      .kds-immersive-menu {
        height: calc(100% - var(--kds-toolbar-height) - var(--kds-statusbar-height));
      }
    }
  }

  .kds-immersive-body {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    transition: all .2s ease-in-out;
    position: relative;
    z-index: 0;
  }

  .kds-immersive-header, .kds-immersive-menu, .kds-immersive-footer {
    //background-color: var(--kds-toolbar-bg);
    position: fixed;
    z-index: 1;
    border-radius: 0;

    &:before {
      border-radius: 0;
    }
  }

  .kds-immersive-header {
    width: 100%;
    height: var(--kds-toolbar-height);
    display: flex;
    flex-direction: row;
    align-items: center;
    pointer-events: none;
    transition: transform .2s ease-in-out;
    border-bottom: 1px solid var(--kds-toolbar-line);
    top: 0;
    left: 0;
    z-index: 2;

    &.maximize {
      transform: translate3d(0, -100%, 0);
    }

    :global(.header-menu-icon) {
      width: var(--kds-tool-size);
      height: var(--kds-tool-size);
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }

    :global(.kds-separator-y) {
      margin: 0;
    }
  }

  .kds-immersive-footer {
    //background-color: var(--kds-toolbar-bg);
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: var(--kds-statusbar-height);
    font-size: var(--kds-font-hints);
    padding: 0 var(--kds-space-tight);
    border-radius: 0;
    border-top: 1px solid var(--kds-toolbar-line);
    transition: all .2s ease-in-out;
    left: 0;
    bottom: 0;

    &:before {
      border-radius: 0;
    }

    &.expanded {
      transform: translate3d(0, 100%, 0);
    }
  }

  .kds-header-menu,
  .kds-header-tools,
  .kds-header-extras {
    pointer-events: fill;
  }

  .header-menu {
    color: var(--kds-color-foreground);
    padding: 6px;

    &:hover {
      color: var(--kds-color-menu-hover);
    }
  }

  .kds-header-menu {
    width: var(--kds-sidemenu-width);
    height: var(--kds-tool-size);
  }

  .header-submenu {
    color: var(--kds-color-menu);
    margin-bottom: 18px;

    &:last-child {
      margin-bottom: 0;
    }

    &:hover {
      color: var(--kds-color-menu-hover);
    }

    &.active {
      color: var(--kds-color-menu-active);
    }
  }

  .kds-immersive-menu {
    width: var(--kds-sidemenu-width);
    display: flex;
    flex-direction: column;
    align-items: center;
    height: calc(100% - var(--kds-toolbar-height));
    border-right: 1px solid var(--kds-toolbar-line);
    transition: transform .2s ease-in-out;
    left: 0;
    top: var(--kds-toolbar-height);

    &.collapse {
      transform: translate3d(-100%, 0, 0);
    }

    :global(.header-menu-icon) {
      width: var(--kds-tool-size);
      height: var(--kds-tool-size);
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }

    :global(.kds-separator-y) {
      margin: 0;
    }

    :global(.immersive-menu-button) {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      color: var(--kds-color-foreground);

      &:hover {
        color: var(--kds-color-icon-button-active);
      }
    }

    :global(.immersive-menu-button:hover .kds-icon) {
      //background-image: var(--kds-button-gradient);
      //color: transparent;
      //background-clip: text;
      //-webkit-background-clip: text;
    }

    :global(.immersive-menu-button.active .kds-icon) {
      color: var(--kds-color-icon-button-active);
      //background-image: var(--kds-button-gradient);
      //color: transparent;
      background-clip: text;
      -webkit-background-clip: text;
    }

    :global(.kds-separator-y) {
      margin: 0;
    }
  }

  .kds-immersive-breadcrumb {
    a {
      font-weight: 500;
      color: var(--kds-color-menu);

      &:not(:last-of-type):hover {
        color: var(--kds-color-menu-hover);
      }

      &:not(:last-of-type):after {
        content: "arrow_forward_ios";
        font-family: "Material Symbols Outlined", sans-serif;
        margin: 0 6px;
        opacity: 0.5;
        color: var(--kds-color-menu);
      }

      &:last-of-type {
        pointer-events: none;
      }
    }
  }

  .minimize {
    position: fixed;
    bottom: 0;
    left: 0;
    z-index: 999999;
    width: var(--kds-tool-size);
    height: var(--kds-tool-size);
    transform: translate3d(-100%, 100%, 0);
    transition: all .2s ease-in-out;

    &.maximize {
      transform: translate3d(0, 0, 0);
      bottom: var(--kds-space-tight);
      left: var(--kds-space-tight);
    }
  }
</style>
