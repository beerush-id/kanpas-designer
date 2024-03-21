<script lang="ts">
  import Icon from '@components/common/Icon.svelte';
  import PopUp from '@components/common/PopUp.svelte';
  import Viewport from '@components/common/Viewport.svelte';
  import { mockup } from '@services/mockup';
  import { blurAssist } from '@services/selector';
  import { theme } from '@utils/colors.js';
  import { createStyles } from '@utils/panel';
  import { createEventDispatcher } from 'svelte';

  export let showPanel = false;
  export let viewport: 'desktop' | 'browser' = 'browser';
  export let styles = createStyles();

  let device, screen;

  const dispatch = createEventDispatcher();
  const bodyFocus = (event: MouseEvent) => {
    dispatch('body-focus', event);
  };

  const captureWheel = (e: WheelEvent) => {
    if (!e.ctrlKey) {
      e.stopPropagation();
    }
  };
</script>

{#if $mockup.enabled}
  <div bind:this={device} class="kds-device {$mockup.active.name} {$mockup.mode}" class:full-view={!$mockup.enabled}>
    <div class="kds-device-layer" use:blurAssist></div>
    <div class="flex"></div>
    <div class="kds-device-frame" class:view-3d={$mockup.view3d}>
      <div class="kds-device-side-frame"></div>
      <div bind:this={screen}
           class="kds-device-screen"
           style:width="{$mockup.width}px"
           style:height="{$mockup.height}px" on:wheel={captureWheel}>
        {#if viewport === 'browser'}
          <Viewport {styles} on:focus={bodyFocus}>
            <slot></slot>
          </Viewport>
        {:else}
          <div class="kds-desktop" class:dark={$theme.darkMode} class:light={!$theme.darkMode}>
            <slot></slot>
          </div>
        {/if}
        <div class="kds-device-notch" class:active={$mockup.notch}></div>
      </div>
    </div>
    <div class="flex"></div>
    {#if showPanel}
      <div class="kds-device-control kds-reset"
           class:collapse={$mockup.controlHide}
           class:full-screen={$mockup.fullScreen}>
        <!-- svelte-ignore a11y-no-static-element-interactions -->
        <div class="kds-device-control-handle kds-acrylic"
             on:click={() => $mockup.controlHide = !$mockup.controlHide} on:keypress>
          <Icon>{$mockup.controlHide ? 'chevron_left' : 'chevron_right'}</Icon>
          <PopUp xDir="before" yDir="between">{$mockup.controlHide ? 'Show' : 'Hide'}</PopUp>
        </div>
        <slot name="control-panel"></slot>
      </div>
    {/if}
  </div>
{:else}
  <div class="kds-preview" style:width="{$mockup.width}px">
    <div class="kds-preview-body kds-acrylic {$theme.scheme}">
      {#if viewport === 'browser'}
        <Viewport {styles} on:focus={bodyFocus}>
          <slot></slot>
        </Viewport>
      {:else}
        <slot></slot>
      {/if}
    </div>
  </div>
{/if}

<style lang="scss">
  .kds-preview {
    width: 100%;
    height: 100%;

    .kds-preview-body {
      min-height: calc(100% - 56px - 8px);
      margin-top: 56px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
    }
  }

  .kds-device {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    min-width: 100%;
    min-height: 100%;
    position: relative;
    transform: translateZ(0);

    &.mobile .kds-device-notch {
      border-radius: 32px;
      top: 16px;
      height: 36px;
    }

    &.laptop {
      .kds-device-frame:before, .kds-device-side-frame {
        border-radius: 26px;
      }

      .kds-device-frame.view-3d .kds-device-side-frame {
        width: calc(100% + 28px);
        border-radius: 26px;
        top: -12px;
        left: -22px;
      }

      .kds-device-screen {
        border-radius: 10px;
      }

      .kds-device-notch {
        transform: translate3d(0, -60px, 0);
      }
    }

    &.desktop {
      .kds-device-frame:before, .kds-device-side-frame {
        width: calc(100% + 48px);
        height: calc(100% + 48px);
        top: -22px;
        left: -24px;
        border-radius: 10px;
      }

      .kds-device-frame.view-3d .kds-device-side-frame {
        width: calc(100% + 32px);
        height: calc(100% + 46px);
        border-radius: 10px;
        top: -18px;
        left: -30px;
      }

      .kds-device-screen {
        border-radius: 0;
      }

      .kds-device-notch {
        transform: translate3d(0, -60px, 0);
      }
    }
  }

  .kds-device-layer {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
  }

  .kds-device-frame {
    position: relative;
    z-index: 0;
    transition: all .3s ease-in-out;

    &.view-3d {
      transform: perspective(3000px) rotate3d(1, 1, -1, 60deg);

      .kds-device-side-frame {
        width: calc(100% + 48px);
        height: calc(100% + 30px);
        top: -10px;
        left: -38px;
        box-shadow: -5px 2px 10px rgba(0, 0, 0, 0.6);
        border-radius: 90px 86px 86px 72px;
      }
    }

    &:before, &:after {
      content: "";
      display: block;
      position: absolute;
    }

    &:before {
      width: calc(100% + 32px);
      height: calc(100% + 32px);
      background-color: #000;
      top: -16px;
      left: -16px;
      z-index: 1;
      border-radius: 72px;
      box-shadow: inset 0 0 0 5px rgba(255, 255, 255, 0.2),
      inset 0 0 3px rgba(255, 255, 255, 0.6);
      transition: all .2s ease-in-out;
    }

    &:after {
      width: calc(100% + 64px);
      height: 64px;
      top: 100%;
      margin-top: 16px;
      left: -32px;
      border-radius: 5px 5px 25px 25px;
      background-color: #6a6b70;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.5),
      inset 0 0 3px rgba(255, 255, 255, 0.6);
      opacity: 0;
    }
  }

  .kds-device-side-frame {
    position: absolute;
    width: calc(100% + 32px);
    height: calc(100% + 32px);
    background-color: #111;
    top: -16px;
    left: -16px;
    z-index: 0;
    border-radius: 72px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
    transition: all .3s ease-in-out;
  }

  .kds-device-screen {
    position: relative;
    z-index: 1;
    border-radius: 56px;
    overflow: hidden;
    transition: all .2s ease-in-out;
    max-width: 100%;
    max-height: 100%;
  }

  .kds-device-notch {
    width: 150px;
    height: 32px;
    background-color: #000;
    position: absolute;
    z-index: 2;
    top: -4px;
    left: 50%;
    margin-left: -75px;
    border-bottom-left-radius: 10px;
    border-bottom-right-radius: 10px;
    transition: all .2s ease-in-out;
    opacity: 1;
    pointer-events: none;
    transform: translate3d(0, -60px, 0);

    &.active {
      transform: translate3d(0, 0, 0);
    }

    &:before {
      content: "";
      display: block;
      width: 16px;
      height: 16px;
      background-color: #241979;
      border-radius: 50%;
      position: absolute;
      top: 50%;
      right: 16px;
      margin-top: -8px;
      box-shadow: inset 0 0 5px rgba(255, 255, 255, 0.3),
      inset 0 0 5px 2px rgba(0, 0, 0, 0.6),
      inset 0 0 2px 5px rgba(0, 0, 0, 0.8);
      z-index: 0;
    }

    &:after {
      content: "";
      display: block;
      width: 4px;
      height: 4px;
      position: absolute;
      z-index: 1;
      top: 50%;
      right: 23px;
      margin-top: -3px;
      background-color: #fff;
      border-radius: 50%;
      opacity: 0.3;
    }
  }

  .kds-desktop {
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: var(--kds-color-background);
    color: var(--kds-color-foreground);
    transition: color .2s ease-in-out, background-color .2s ease-in-out;
  }

  .kds-device-control {
    height: 100%;
    position: relative;
    transition: all .2s ease-in-out;
    padding-top: 52px;

    &.floating {
      height: 100%;
      position: fixed;
      right: 0;
      top: 0;
      z-index: 1;
    }

    &.collapse {
      width: 0;
    }

    &.full-screen {
      padding-top: 0;
    }
  }

  .kds-device-control-handle {
    position: absolute;
    top: 50%;
    left: 0;
    margin-left: -18px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 18px;
    height: 32px;
    cursor: pointer;
    transition: all .2s ease-in-out;

    &:hover {
      background-color: var(--kds-color-success-hover);
    }
  }

  .h-ruler {
    width: 100%;
    height: 32px;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
  }
</style>
