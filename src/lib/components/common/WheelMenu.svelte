<script lang="ts">
  import { type Reactive, reactive } from '@beerush/reactor';
  import Icon from '@components/common/Icon.svelte';
  import type { WheelMenuItem } from '@utils/menu';
  import { createEventDispatcher } from 'svelte';

  export let menuItems: Reactive<WheelMenuItem[]> = reactive<WheelMenuItem[]>([]);
  export let label = 'Add Element';
  export let stacked = false;

  export let wheelSize = 200;
  export let wheelAngle = 0;
  export let wheelScale = menuItems.length;
  export let sliceSize = (wheelSize / wheelScale) * 3.3;
  export let sliceAngle = 360 / wheelScale;
  export let outerAngle = (sliceAngle * (menuItems.length - 1)) / 2;

  let activeLabel = '';
  let activeWheel: WheelMenuItem;

  const dispatch = createEventDispatcher();

  const activate = (e: MouseEvent, menu: WheelMenuItem, angle: number) => {
    resetAll();

    menu.angle = angle;

    if (activeWheel) {
      activeWheel.active = false;
    }

    if (menu && menu.children) {
      if (e) {
        e.stopPropagation();
        e.preventDefault();
      }

      if (activeWheel === menu) {
        dismiss();
      } else {
        activeWheel = menu;
        activeWheel.active = true;
      }
    } else {
      dismiss();

      if (typeof menu.click === 'function') {
        menu.click();
      }
    }
  };

  const dismiss = () => {
    activeWheel = null as never;
  };

  const resetAll = (items: WheelMenuItem[] = menuItems) => {
    for (const menu of items) {
      if (menu.children) {
        resetAll(menu.children);
      }

      menu.active = false;
    }
  };

  const spinOut = (e: HTMLElement) => {
    e.classList.add('remove');
    return { duration: 200 };
  };

  const createChildProps = ({ children = [], angle = 0 }: WheelMenuItem) => {
    const width = wheelSize + 80;
    const scale = children?.length > wheelScale ? children?.length : wheelScale + 5;
    const piece = (width / scale) * 3.3;
    const slice = piece > sliceSize ? sliceSize : piece;
    const inner = slice === sliceSize ? sliceAngle : 360 / scale;
    const outer = (inner * (children?.length - 1)) / 2;

    return {
      wheelSize: width,
      wheelAngle: angle + wheelAngle / 1.875,
      wheelScale: scale,
      sliceSize: slice,
      sliceAngle: inner,
      outerAngle: outer
    };
  };

  const setLabel = (label: string = '') => {
    activeLabel = label;
    dispatch('label-change', label);
  };

  const labelChange = (e: CustomEvent) => {
    activeLabel = e.detail;
    dispatch('label-change', activeLabel);
  };
</script>

<div class="kanpas-wheel-stack" style="--wheel-size: {wheelSize}px" class:stacked>
  {#if activeWheel && activeWheel.active}
    <svelte:self
      stacked
      menuItems={activeWheel.children}
      on:label-change={labelChange}
      {...createChildProps(activeWheel)}/>
  {/if}
  <div
    class="kanpas-wheel-menu"
    out:spinOut
    class:stacked
    style="--wheel-size: {wheelSize}px; --wheel-angle: {wheelAngle}deg;">
    <div class="kanpas-wheel-outer" style="--outer-angle: -{stacked ? outerAngle : 0}deg">
      {#each $menuItems || [] as menu, i}
        <div
          class="wheel-menu-item"
          style="--rotation: {sliceAngle * i}deg; width: {sliceSize}px"
          class:placeholder={!menu.icon}
          class:active={menu.active}
          on:mouseenter={() => setLabel(menu.label)}
          on:mouseleave={() => setLabel('')}>
          <div
            class="wheel-menu-value"
            on:click={(e) => activate(e, menu, sliceAngle * i)}
            on:keypress>
            {#if menu.icon}
              <Icon>{menu.icon}</Icon>
            {/if}
          </div>
        </div>
      {/each}
    </div>
    <div class="wheel-label">{activeLabel || (activeWheel ? activeWheel.label : label)}</div>
  </div>
</div>

<style lang="scss">
  @keyframes spinIn {
    0% {
      transform: rotate3d(0, 0, 1, 0deg);
    }
    100% {
      transform: rotate3d(0, 0, 1, 360deg);
    }
  }

  @keyframes spinOut {
    0% {
      transform: rotate3d(0, 0, 1, 0deg);
      opacity: 1;
    }
    100% {
      transform: rotate3d(0, 0, 1, -360deg);
      opacity: 0;
    }
  }

  .kanpas-wheel-stack {
    width: var(--wheel-size);
    height: var(--wheel-size);
    position: relative;

    &.stacked {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate3d(-50%, -50%, 0);
    }

    :global(.kanpas-wheel-menu.remove) {
      animation: spinOut 0.3s cubic-bezier(0.47, 1.64, 0.41, 0.8);
    }
  }

  .kanpas-wheel-menu {
    width: var(--wheel-size);
    height: var(--wheel-size);
    position: absolute;
    top: calc(50% - (var(--wheel-size) / 2));
    left: calc(50% - (var(--wheel-size) / 2));
    border-radius: 50%;
    animation: spinIn 0.3s cubic-bezier(0.47, 1.64, 0.41, 0.8);
    z-index: 0;
    rotate: var(--wheel-angle);
    background-color: var(--kanpas-color-node-bg);
    filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.4));
    transition: all 0.3s cubic-bezier(0.47, 1.64, 0.41, 0.8);

    &:before {
      content: '';
      display: block;
      width: calc(100% + -80px);
      height: calc(100% + -80px);
      background-color: var(--kanpas-color-node-bg-alt);
      position: absolute;
      top: 40px;
      left: 40px;
      border-radius: 50%;
      z-index: 1;
      pointer-events: none;
      opacity: 1;
    }

    &:not(.stacked):not(:first-child) {
      filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.4));
    }

    &.stacked:first-child {
      background-color: transparent;
      filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.4));
      box-shadow: none;

      &:before {
        opacity: 0;
        visibility: hidden;
      }
    }
  }

  .kanpas-wheel-outer {
    width: 100%;
    height: 100%;
    position: relative;
    border-radius: 50%;
    overflow: hidden;
    rotate: var(--outer-angle);
  }

  .wheel-label {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    text-align: center;
    font-size: var(--kanpas-font-subtitle);
    width: calc(var(--wheel-size) - 100px);
    z-index: 1;
    border-radius: 50%;
    cursor: default;
    color: var(--kanpas-color-foreground);
  }

  .wheel-menu-item {
    width: 40px;
    height: 100%;
    position: absolute;
    top: 0;
    left: 50%;
    translate: -50% 0;
    text-align: center;
    pointer-events: none;
    rotate: var(--rotation);
    clip-path: polygon(100% 0, 0 0, 50% 50%, 50% 50%);

    &:before {
      content: "";
      display: block;
      width: var(--wheel-size);
      height: var(--wheel-size);
      position: absolute;
      top: 0;
      left: calc(50% - (var(--wheel-size) / 2));
      border-top: 2px solid var(--kanpas-color-node-bg);
      box-shadow: inset 0 0 0 40px var(--kanpas-color-node-bg);
      border-radius: 50%;
      transition: all .2s ease-in-out;
    }

    &:hover:before {
      border-top: 2px solid var(--kanpas-color-node-bg-alt);
    }

    &.active:before {
      border-top: 2px solid var(--kanpas-color-node-line);
    }

    &.placeholder {
      pointer-events: none;
      opacity: 0;
      visibility: hidden;
    }
  }

  .wheel-menu-value {
    width: 100%;
    height: 50px;
    padding-bottom: 10px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    pointer-events: fill;
    color: var(--kanpas-color-foreground);
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
  }
</style>
