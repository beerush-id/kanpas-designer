<script lang="ts">
  import { canvas } from '@services/canvas';
  import { selector } from '@services/selector';
  import { offsetRect, scaledClientRect } from '@utils/element';
  import { onDestroy } from 'svelte';

  const { hoverStyles } = selector;

  let hoverElem: HTMLElement;

  const unsubHover = hoverStyles.subscribe(() => {
    if (hoverElem) {
      for (const [ key, value ] of Object.entries(hoverStyles)) {
        hoverElem.style[key] = value;
      }

      if (selector.styles) {
        setTimeout(() => {
          placeMargin();
        }, 200);
        placePadding();
        placeBounds();
      }
    }
  });

  let marginElem: HTMLElement;
  const placeMargin = () => {
    if (marginElem) {
      marginElem.removeAttribute('style');

      const { width, height } = scaledClientRect(hoverElem, canvas.scale);
      const { margin, marginLeft, marginTop, marginRight, marginBottom } = selector.styles;

      if (margin) {
        const size = parseInt(margin);

        if (size) {
          marginElem.style.display = 'block';
          marginElem.style.width = `${ width + size + size }px`;
          marginElem.style.height = `${ height + size + size }px`;
          marginElem.style.marginLeft = `-${ size + 1 }px`;
          marginElem.style.marginTop = `-${ size + 1 }px`;
          marginElem.style.borderWidth = `${ size }px`;
        }
      } else if (marginLeft || marginTop || marginRight || marginBottom) {
        let eWidth = width;
        let eHeight = height;
        let eLeft = 0;
        let eTop = 0;

        if (marginLeft) {
          marginElem.style.borderLeftWidth = marginLeft;
          eWidth += parseInt(marginLeft);
          eLeft += parseInt(marginLeft);
        }

        if (marginRight) {
          marginElem.style.borderRightWidth = marginRight;
          eWidth += parseInt(marginRight);
        }

        if (marginTop) {
          marginElem.style.borderTopWidth = marginTop;
          eHeight += parseInt(marginTop);
          eTop += parseInt(marginTop);
        }

        if (marginBottom) {
          marginElem.style.borderBottomWidth = marginBottom;
          eHeight += parseInt(marginBottom);
        }

        marginElem.style.display = 'block';
        marginElem.style.width = `${ eWidth }px`;
        marginElem.style.height = `${ eHeight }px`;
        marginElem.style.marginLeft = `-${ eLeft + 1 }px`;
        marginElem.style.marginTop = `-${ eTop + 1 }px`;
      } else {
        marginElem.style.display = 'none';
      }
    }
  };

  let paddingElem: HTMLElement;
  const placePadding = () => {
    if (paddingElem) {
      paddingElem.removeAttribute('style');

      const { padding, paddingLeft, paddingTop, paddingRight, paddingBottom } = selector.styles;

      if (padding) {
        const size = parseInt(padding);

        if (size) {
          paddingElem.style.display = 'block';
          paddingElem.style.borderWidth = `${ size }px`;
        }
      } else if (paddingLeft || paddingTop || paddingRight || paddingBottom) {
        if (paddingLeft) {
          paddingElem.style.borderLeftWidth = paddingLeft;
        }

        if (paddingRight) {
          paddingElem.style.borderRightWidth = paddingRight;
        }

        if (paddingTop) {
          paddingElem.style.borderTopWidth = paddingTop;
        }

        if (paddingBottom) {
          paddingElem.style.borderBottomWidth = paddingBottom;
        }

        paddingElem.style.display = 'block';
      } else {
        paddingElem.style.display = 'none';
      }
    }
  };

  let lLine: HTMLElement, tLine: HTMLElement, rLine: HTMLElement, bLine: HTMLElement;
  let bLeft = 0, bTop = 0, bRight = 0, bBottom = 0;
  const placeBounds = () => {
    const { element, styles } = selector;

    if (element) {
      const { left, top, right, bottom } = offsetRect(element, selector.viewport, canvas.scale);

      bLeft = left;
      bTop = top;
      bRight = right;
      bBottom = bottom;

      if (styles) {
        const { left: l, top: t, right: r, bottom: b } = selector.styles;

        if (l) {
          bLeft = parseInt(l);
        }

        if (t) {
          bTop = parseInt(t);
        }

        if (r) {
          bRight = parseInt(r);
        }

        if (b) {
          bBottom = parseInt(b);
        }
      }

      lLine.style.width = `${ bLeft }px`;
      rLine.style.width = `${ bRight }px`;
      tLine.style.height = `${ bTop }px`;
      bLine.style.height = `${ bBottom }px`;
    }
  };

  onDestroy(() => {
    if (typeof unsubHover === 'function') {
      unsubHover();
    }
  });
</script>

<div bind:this={hoverElem} class="kanpas-box-hover">
  <div class="margin-box" bind:this={marginElem}></div>
  <div class="padding-box" bind:this={paddingElem}></div>

  <div class="vt-line" bind:this={tLine}>
    <div class="value" class:active={$selector.extended}>{bTop.toLocaleString(2)}</div>
  </div>
  <div class="vb-line" bind:this={bLine}>
    <div class="value" class:active={$selector.extended}>{bBottom.toLocaleString(2)}</div>
  </div>
  <div class="hl-line" bind:this={lLine}>
    <div class="value" class:active={$selector.extended}>{bLeft.toLocaleString(2)}</div>
  </div>
  <div class="hr-line" bind:this={rLine}>
    <div class="value" class:active={$selector.extended}>{bRight.toLocaleString(2)}</div>
  </div>
  <div class="size" class:active={$selector.extended}>{parseInt($hoverStyles.width).toLocaleString(2)}
    x {parseInt($hoverStyles.height).toLocaleString(2)}</div>
</div>
{#each $selector.focusBounds as focus}
  <div class="kanpas-box-focus"
       style:width={focus.width}
       style:height={focus.height}
       style:left={focus.left}
       style:top={focus.top}>
    <div class="focus-frame top"></div>
    <div class="focus-frame right"></div>
    <div class="focus-frame bottom"></div>
    <div class="focus-frame left"></div>
  </div>
{/each}

<style lang="scss">
  .margin-box, .padding-box {
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
    border-width: 0;
    border-style: solid;
    opacity: 0.2;
  }

  .margin-box {
    border-color: var(--kanpas-color-accent-hover);
  }

  .padding-box {
    border-color: var(--kanpas-color-primary-hover);
    width: 100%;
    height: 100%;
  }

  .kanpas-box-hover, .kanpas-box-focus {
    border: 1px dashed var(--kanpas-color-accent-hover);
    position: fixed;
    z-index: 999;
    pointer-events: none;
  }

  .kanpas-box-hover {
    display: none;
    transition: all .2s ease-in-out;

    &:before, &:after {
      display: block;
      content: "";
      position: absolute;
    }

    &:before {
      width: 100%;
      height: calc(100vh * 2);
      border-left: 1px dashed var(--kanpas-color-primary-hover);
      border-right: 1px dashed var(--kanpas-color-primary-hover);
      top: 50%;
      left: -1px;
      transform: translateY(-50%);
    }

    &:after {
      height: 100%;
      width: calc(100vw * 2);
      border-top: 1px dashed var(--kanpas-color-primary-hover);
      border-bottom: 1px dashed var(--kanpas-color-primary-hover);
      left: 50%;
      top: -1px;
      transform: translateX(-50%);
    }
  }

  .kanpas-box-focus {
    border-color: var(--kanpas-color-success-active);
    transition: all .2s ease-in-out;
  }

  .focus-frame {
    position: absolute;

    &:before, &:after {
      content: "";
      display: block;
      width: 6px;
      height: 6px;
      background-color: var(--kanpas-color-success-active);
      border-radius: 50%;
      position: absolute;
    }

    &.left, &.right {
      top: 0;
      height: 100%;
    }

    &.left {
      left: 0;
    }

    &.right {
      right: 0;
    }

    &.left:before {
      top: -3px;
      left: -3px;
    }

    &.left:after {
      bottom: -3px;
      left: -3px;
    }

    &.right:before {
      top: -3px;
      right: -3px;
    }

    &.right:after {
      bottom: -3px;
      right: -3px;
    }

    &.top {
      top: 0;
      left: 50%;
      height: 100%;

      &:before {
        top: -3px;
        left: -3px;
      }

      &:after {
        bottom: -3px;
        left: -3px;
      }
    }

    &.bottom {
      width: 100%;
      top: 50%;
      left: 0;

      &:before {
        left: -3px;
        top: -3px;
      }

      &:after {
        right: -3px;
        top: -3px;
      }
    }
  }

  .vt-line, .vb-line, .hl-line, .hr-line {
    position: absolute;

    &:before {
      content: "";
      display: block;
      position: absolute;
    }
  }

  .vt-line, .vb-line {
    height: 100vh;
    left: 50%;
    border-right: 1px dashed var(--kanpas-color-accent-hover);
    writing-mode: vertical-lr;
    text-orientation: mixed;

    &:before {
      border-top: 1px dashed var(--kanpas-color-accent-hover);
      width: 64px;
      left: 50%;
      transform: translateX(-50%);
    }

    .value {
      left: 50%;
      transform: translateX(-50%);
      padding: 8px 4px;
    }
  }

  .hl-line, .hr-line {
    width: 100vw;
    top: 50%;
    border-bottom: 1px dashed var(--kanpas-color-accent-hover);

    &:before {
      border-right: 1px dashed var(--kanpas-color-accent-hover);
      height: 64px;
      top: 50%;
      transform: translateY(-50%);
    }

    .value {
      top: 50%;
      transform: translateY(-50%);
    }
  }

  .vt-line {
    bottom: 100%;

    &:before {
      top: -1px;
    }

    .value {
      top: 10px;
    }
  }

  .vb-line {
    top: 100%;

    &:before {
      bottom: -1px;
    }

    .value {
      bottom: 10px;
    }
  }

  .hr-line {
    left: 100%;

    &:before {
      right: -1px;
    }

    .value {
      right: 10px;
    }
  }

  .hl-line {
    right: 100%;

    &:before {
      left: -1px;
    }

    .value {
      left: 10px;
    }
  }

  .size, .value {
    padding: 4px 8px;
    position: absolute;
    color: var(--kanpas-color-tooltip);
    border-radius: var(--kanpas-radius-small);
    font-size: var(--kanpas-font-subtitle);
    backdrop-filter: blur(10px);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);

    &:before {
      display: block;
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--kanpas-color-tooltip-bg);
      z-index: -1;
      border-radius: var(--kanpas-radius-small);
      opacity: 0.7;
    }
  }

  .size {
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    border: 1px solid var(--kanpas-color-accent-hover);
    white-space: nowrap;

    &:not(.active) {
      display: none;
    }
  }

  .value {
    border: 1px dashed var(--kanpas-color-accent-hover);

    &:not(.active) {
      display: none;
    }
  }
</style>
