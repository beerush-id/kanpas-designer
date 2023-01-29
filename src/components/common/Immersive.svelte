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
  } = navigation.routerGroups as never;

  export let title = '';
  export let statusbar = false;
</script>

<svelte:head>
  {#if title}
    <title>{title} | Kanpas</title>
  {/if}
</svelte:head>

<div class="kanpas-immersive" class:expanded={$mockup?.fullScreen} class:with-statusbar={statusbar}>
  <div class="kanpas-immersive-header kanpas-acrylic-bg kanpas-reset" class:maximize={$mockup?.fullScreen}>
    <div class="kanpas-header-menu flex-row-center" use:blurAssist>
      <a href="/" class="header-menu header-menu-icon">
        <Logo></Logo>
      </a>
    </div>
    <div class="kanpas-immersive-breadcrumb kanpas-tool-group pdy-6 pdx-12 flex-row-center-y kanpas-accept-events mdl-12">
      {#each $navigation.routes.filter(route => route.active) as route}
        <a href={route.path} class="flex-row-center-y">
          <span>{route.title}</span>
        </a>
      {/each}
    </div>
    <div class="flex"></div>
    <div id="immersive-header" class="kanpas-header-extras flex-row-center-y" use:blurAssist>
      <slot name="header"></slot>
    </div>
    <div class="flex"></div>
    <div class="kanpas-tool-group flex-row-center-y kanpas-accept-events">
      <span class="mdx-16">Dev Server</span>
      <div class="kanpas-separator-y"></div>
      <Icon clickable tooltip="Restart Dev Server" class="tool-icon" active>replay</Icon>
    </div>
    <div class="kanpas-header-tools flex-row-center-y" use:blurAssist>
      <UserAvatar class="mx-1"></UserAvatar>
    </div>
  </div>
  <div class="kanpas-immersive-menu kanpas-accept-events kanpas-acrylic-bg kanpas-reset"
       class:collapse={$mockup?.fullScreen}>
    <div class="kanpas-immersive-menu-list pdy-4">
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
    <div class="mdy-8">
      <Icon clickable
            xDir="after"
            yDir="between"
            tooltip={$mockup?.fullScreen ? 'Collapse' : 'Expand'}
            class="header-menu-icon"
            on:click={() => mockup.toggleMax()}>
        {$mockup?.fullScreen ? 'close_fullscreen' : 'open_in_full'}
      </Icon>
      <ThemeSwitch xDir="after" yDir="between" class="header-menu-icon"/>
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
  <div class="kanpas-immersive-body">
    <slot></slot>
  </div>
  {#if statusbar}
    <div class="kanpas-immersive-footer kanpas-acrylic-bg kanpas-reset" class:expanded={$mockup?.fullScreen}>
      <div class="kanpas-immersive-breadcrumb flex-row-center-y kanpas-accept-events">
        {#each $navigation.routes.filter(route => route.active) as route}
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
<div class="minimize kanpas-acrylic flex-row-center" class:maximize={$mockup?.fullScreen}>
  <Icon clickable tooltip="Collapse" class="tool-icon" on:click={() => mockup.minimize()}>
    close_fullscreen
  </Icon>
</div>

<style lang="scss">
  .kanpas-immersive {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    padding-top: var(--kanpas-toolbar-height);
    padding-left: var(--kanpas-sidemenu-width);
    transition: all .2s ease-in-out;

    &.expanded {
      padding: 0;
    }

    &.with-statusbar:not(.expanded) {
      padding-bottom: var(--kanpas-statusbar-height);
    }

    &.with-statusbar {
      .kanpas-immersive-menu {
        height: calc(100% - var(--kanpas-toolbar-height) - var(--kanpas-statusbar-height));
      }
    }
  }

  .kanpas-immersive-body {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    flex: 1;
    transition: all .2s ease-in-out;
    position: relative;
    z-index: 0;
  }

  .kanpas-immersive-header, .kanpas-immersive-menu, .kanpas-immersive-footer {
    //background-color: var(--kanpas-toolbar-bg);
    position: fixed;
    z-index: 1;
    border-radius: 0;

    &:before {
      border-radius: 0;
    }
  }

  .kanpas-immersive-header {
    width: 100%;
    height: var(--kanpas-toolbar-height);
    display: flex;
    flex-direction: row;
    align-items: center;
    pointer-events: none;
    transition: transform .2s ease-in-out;
    border-bottom: 1px solid var(--kanpas-toolbar-line);
    top: 0;
    left: 0;
    z-index: 2;

    &.maximize {
      transform: translate3d(0, -100%, 0);
    }

    :global(.header-menu-icon) {
      width: var(--kanpas-tool-size);
      height: var(--kanpas-tool-size);
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    }

    :global(.kanpas-separator-y) {
      margin: 0;
    }
  }

  .kanpas-immersive-footer {
    //background-color: var(--kanpas-toolbar-bg);
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    height: var(--kanpas-statusbar-height);
    font-size: var(--kanpas-font-hints);
    padding: 0 var(--kanpas-space-tight);
    border-radius: 0;
    border-top: 1px solid var(--kanpas-toolbar-line);
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

  .kanpas-header-menu,
  .kanpas-header-tools,
  .kanpas-header-extras {
    pointer-events: fill;
  }

  .header-menu {
    color: var(--kanpas-color-foreground);
    padding: 6px;

    &:hover {
      color: var(--kanpas-color-menu-hover);
    }
  }

  .kanpas-header-menu {
    width: var(--kanpas-sidemenu-width);
    height: var(--kanpas-tool-size);
  }

  .header-submenu {
    color: var(--kanpas-color-menu);
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

  .kanpas-immersive-menu {
    width: var(--kanpas-sidemenu-width);
    display: flex;
    flex-direction: column;
    align-items: center;
    height: calc(100% - var(--kanpas-toolbar-height));
    border-right: 1px solid var(--kanpas-toolbar-line);
    transition: transform .2s ease-in-out;
    left: 0;
    top: var(--kanpas-toolbar-height);

    &.collapse {
      transform: translate3d(-100%, 0, 0);
    }

    :global(.header-menu-icon) {
      width: var(--kanpas-tool-size);
      height: var(--kanpas-tool-size);
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
        color: var(--kanpas-color-icon-button-active);
      }
    }

    :global(.immersive-menu-button.active) {
      color: var(--kanpas-color-icon-button-active);
    }

    :global(.kanpas-separator-y) {
      margin: 0;
    }
  }

  .kanpas-immersive-breadcrumb {
    a {
      font-weight: 500;
      color: var(--kanpas-color-menu);

      &:not(:last-of-type):hover {
        color: var(--kanpas-color-menu-hover);
      }

      &:not(:last-of-type):after {
        content: "arrow_forward_ios";
        font-family: "Material Symbols Rounded", sans-serif;
        margin: 0 6px;
        opacity: 0.5;
        color: var(--kanpas-color-menu);
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
    width: var(--kanpas-tool-size);
    height: var(--kanpas-tool-size);
    transform: translate3d(-100%, 100%, 0);
    transition: all .2s ease-in-out;

    &.maximize {
      transform: translate3d(0, 0, 0);
      bottom: var(--kanpas-space-tight);
      left: var(--kanpas-space-tight);
    }
  }
</style>
