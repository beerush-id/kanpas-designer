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
  <Portal slot="#kds-popup">
    <div out:fadeOut class="kds-dialog {xDir}"
         class:dialog={role === 'dialog'}
         class:drawer={role === 'drawer'}
         on:wheel|stopPropagation>
      <div in:fadeIn class="kds-dialog-overlay" on:click={close} on:keypress></div>
      <div class="kds-dialog-content">
        <slot></slot>
      </div>
    </div>
  </Portal>
{/if}

<style lang="scss">
  .kds-dialog {
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

      .kds-dialog-content {
        max-width: calc(100% - 80px);
        max-height: calc(100% - 80px);
      }
    }

    &.drawer {
      justify-content: flex-start;

      &.right {
        align-items: flex-end;

        .kds-dialog-content {
          animation: slideInLeft .2s ease-in-out;
          margin-right: var(--kds-space-tight);
        }
      }

      &.center {
        align-items: center;

        .kds-dialog-content {
          animation: slideInTop .2s ease-in-out;
        }
      }

      &.left {
        align-items: flex-start;

        .kds-dialog-content {
          animation: slideInRight .2s ease-in-out;
          margin-left: var(--kds-space-tight);
        }
      }

      .kds-dialog-content {
        height: calc(100% - 16px);
        max-width: calc(100% - 40px);
        margin-top: var(--kds-space-tight);
      }
    }
  }

  .kds-dialog-overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }

  .kds-dialog-content {
    position: relative;
    z-index: 1;
  }
</style>
