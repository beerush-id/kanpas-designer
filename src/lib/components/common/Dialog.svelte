<script lang="ts">
  import Portal from '@components/common/Portal.svelte';
  import { fadeIn, fadeOut } from '@services/transition';

  export let role: 'dialog' | 'drawer' = 'dialog';
  export let xDir: 'left' | 'right' | 'center' = 'left';

  let opened = false;

  export const toggle = () => {
    opened = !opened;
  };

  export const open = () => {
    opened = true;
  };

  export const close = () => {
    opened = false;
  };
</script>

{#if opened}
  <Portal slot="#kanpas-popup">
    <div out:fadeOut class="kanpas-dialog {xDir}"
         class:dialog={role === 'dialog'}
         class:drawer={role === 'drawer'}
         on:wheel|stopPropagation>
      <div in:fadeIn class="kanpas-dialog-overlay" on:click={close} on:keypress></div>
      <div class="kanpas-dialog-content">
        <slot></slot>
      </div>
    </div>
  </Portal>
{/if}

<style lang="scss">
  .kanpas-dialog {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 989;

    &.dialog {
      align-items: center;
      justify-content: center;

      .kanpas-dialog-content {
        max-width: calc(100% - 80px);
        max-height: calc(100% - 80px);
      }
    }

    &.drawer {
      justify-content: flex-start;

      &.right {
        align-items: flex-end;

        .kanpas-dialog-content {
          animation: slideInLeft .2s ease-in-out;
          margin-right: var(--kanpas-space-tight);
        }
      }

      &.center {
        align-items: center;

        .kanpas-dialog-content {
          animation: slideInTop .2s ease-in-out;
        }
      }

      &.left {
        align-items: flex-start;

        .kanpas-dialog-content {
          animation: slideInRight .2s ease-in-out;
          margin-left: var(--kanpas-space-tight);
        }
      }

      .kanpas-dialog-content {
        height: calc(100% - 16px);
        max-width: calc(100% - 40px);
        margin-top: var(--kanpas-space-tight);
      }
    }
  }

  .kanpas-dialog-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .kanpas-dialog-content {
    position: relative;
    z-index: 1;
  }
</style>
