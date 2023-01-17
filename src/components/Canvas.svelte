<script lang="ts">
  import { canvas } from '@services/canvas.js';
  import Hammer from 'hammerjs';
  import { onDestroy, onMount } from 'svelte';

  export let floatingPanel = false;
  let className = '';
  export { className as class };

  let self;
  let draggable;
  let mousedrag;
  let startPoint: MouseEvent;

  let startX = 0;
  let localX = 0;

  let startY = 0;
  let localY = 0;

  let painter: HTMLElement;

  const capture = (e: KeyboardEvent) => {
    if (e.code === 'Space') {
      if (!draggable) {
        draggable = true;
      }
    }

    scaleCanvas(e);
  };

  const release = (e: KeyboardEvent) => {
    if (e.code === 'Space' && draggable) {
      draggable = false;
      dragEnd();
    }
  };

  const dragStart = (e: MouseEvent) => {
    if (e.button === 1) {
      e.stopPropagation();
      e.preventDefault();

      mousedrag = true;
      draggable = true;
      startPoint = e;
    } else if (draggable) {
      e.stopPropagation();
      e.preventDefault();

      startPoint = e;
    }
  };

  const drag = (e: MouseEvent) => {
    if (draggable && startPoint) {
      e.stopPropagation();
      e.preventDefault();

      const x = startX + ((e.x - startPoint.x) / canvas.scale);
      const y = startY + ((e.y - startPoint.y) / canvas.scale);

      localX = x;
      localY = y;

      move();
    }
  };
  const dragEnd = () => {
    if (draggable) {
      startX = localX;
      startY = localY;
    }

    startPoint = null as never;

    if (mousedrag) {
      draggable = false;
    }
  };

  const scaleWheel = (e: WheelEvent) => {
    if (e.ctrlKey) {
      e.stopPropagation();
      e.preventDefault();

      if (e.deltaY >= 0) {
        canvas.zoomOut();
      } else {
        canvas.zoomIn();
      }
    } else {
      if (e.shiftKey) {
        localX -= (e.deltaX || e.deltaY) / canvas.scale;
        startX = localX;
      } else {
        localY -= e.deltaY / canvas.scale;
        startY = localY;
      }

      move();
    }
  };
  const scaleCanvas = (e: KeyboardEvent) => {
    if (e.ctrlKey && [ '+', '-', '0' ].includes(e.key)) {
      // e.preventDefault();
      // e.stopPropagation();

      if (e.key === '+') {
        canvas.zoomIn();
      } else if (e.key === '-') {
        canvas.zoomOut();
      } else if (e.key === '0') {
        canvas.resetZoom();
      }
    }
  };

  const move = () => {
    if (painter) {
      requestAnimationFrame(() => {
        painter.style.transform = `translate3d(${ localX }px, ${ localY }px, 0)`;

        if (localX !== 0 || localY !== 0 && canvas.centered) {
          canvas.centered = false;
        }
      });
    }
  };

  $: {
    if ($canvas.requestCenter) {
      canvas.requestCenter = false;
      canvas.centered = true;

      localX = 0;
      localY = 0;
      startX = 0;
      startY = 0;

      move();
    }
  }

  window.addEventListener('keydown', capture);
  window.addEventListener('keyup', release);
  window.addEventListener('wheel', scaleWheel, { passive: false });

  onMount(() => {
    if (self) {
      const hammer = new Hammer(self);
      hammer.get('pan').set({ enable: true, pointers: 2 });
      hammer.get('pinch').set({ enable: true, threshold: 0.5 });

      hammer.on('pan', e => {
        const x = startX + (e.deltaX / canvas.scale);
        const y = startY + (e.deltaY / canvas.scale);

        localX = x;
        localY = y;

        move();
      });

      hammer.on('panend', () => {
        startX = localX;
        startY = localY;
      });

      hammer.on('pinchin', () => {
        canvas.scale -= 0.005;
      });

      hammer.on('pinchout', () => {
        canvas.scale += 0.005;
      });
    }
  });

  const captureWheel = (e: WheelEvent) => {
    if (!e.ctrlKey) {
      e.stopPropagation();
    }
  };

  onDestroy(() => {
    canvas.resetZoom();
    window.removeEventListener('keydown', capture);
    window.removeEventListener('keyup', release);
    window.removeEventListener('wheel', scaleWheel);
  });
</script>

<div class="canvas {className}">
  <div class="canvas-panel canvas-panel-left kanpas-reset" class:floating={floatingPanel} on:wheel={captureWheel}>
    <slot name="canvas-panel-left"></slot>
  </div>
  <div class="canvas-content"
       bind:this={self}
       class:draggable
       on:mousedown={dragStart}
       on:mouseup={dragEnd}
       on:mousemove={drag}
       style:transform="scale3d({$canvas.scale}, {$canvas.scale}, 1) translateZ(0)">
    <div class="canvas-paint-area" bind:this={painter}>
      <slot></slot>
    </div>
    {#if draggable}
      <div class="canvas-drag-overlay"></div>
    {/if}
  </div>
  <div class="canvas-panel canvas-panel-right kanpas-reset" class:floating={floatingPanel} on:wheel={captureWheel}>
    <slot name="canvas-panel-right"></slot>
  </div>
</div>

<style lang="scss">
  .canvas {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    position: relative;
  }

  .canvas-content {
    flex: 1;
    position: relative;
    height: 100%;
    transform: translateZ(0);
    transition: transform .2s ease-in-out;
    z-index: 0;
    -webkit-font-smoothing: subpixel-antialiased;

    &.draggable {
      cursor: grab;
      user-select: none;
    }
  }

  .canvas-panel {
    display: flex;
    flex-direction: column;
    height: 100%;
    position: relative;
    z-index: 1;
    transition: all .3s ease-in-out;

    &.floating {
      position: absolute;
      top: 0;

      &.canvas-panel-left {
        left: 0;
        transform: translate3d(-100%, 0, 0);
      }

      &.canvas-panel-right {
        right: 0;
        transform: translate3d(100%, 0, 0);
      }
    }
  }

  .canvas-drag-overlay {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
  }

  .canvas-paint-area {
    width: calc(100% - var(--kanpas-canvas-prefix));
    height: calc(100% - var(--kanpas-canvas-prefix));
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: absolute;
    z-index: 0;
    transform: translate3d(0, 0, 0);
    margin-left: var(--kanpas-canvas-prefix);
    margin-top: var(--kanpas-canvas-prefix);
    -webkit-backface-visibility: hidden;
    -webkit-font-smoothing: subpixel-antialiased;
    backface-visibility: hidden;
  }

  .canvas-ruler-h, .canvas-ruler-v {
    position: absolute;
    z-index: 1;
    opacity: 0.8;
    transition: all .2s ease-in-out;

    &.disabled {
      opacity: 0;
      visibility: hidden;
    }
  }

  .canvas-ruler-h {
    width: calc(100% - var(--kanpas-canvas-prefix));
    height: 28px;
    top: 0;
    left: var(--kanpas-canvas-prefix);
  }

  .canvas-ruler-v {
    height: calc(100% - var(--kanpas-canvas-prefix));
    width: 28px;
    top: var(--kanpas-canvas-prefix);
    left: 0;
  }
</style>
