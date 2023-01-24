<script lang="ts">
  import Button from './Button.svelte';
  import Icon from './Icon.svelte';
  import { toast } from '@services/toast';

  const { messages, questions } = toast;
</script>

<div class="kanpas-toast-list" on:wheel|stopPropagation>
  {#if $messages}
    {#each $messages as message}
      <div class="kanpas-toast-item flex-row-center-y {message.color}">
        {#if message.icon}
          <Icon size="medium" class="mdr-8">{message.icon}</Icon>
          <div class="kanpas-toast-message flex">
            {#if message.title}
              <div class="kanpas-toast-title">{message.title}</div>
            {/if}
            {#if message.subtitle}
              <div class="kanpas-toast-subtitle">{message.subtitle}</div>
            {/if}
          </div>
          {#if message.keepOpen}
            <Icon
              clickable
              class="kanpas-toast-close mdl-24"
              tooltip="Close"
              on:click={() => toast.close(message)}
              >close
            </Icon>
          {/if}
        {/if}
      </div>
    {/each}
  {/if}
</div>
<div class="kanpas-prompt-list" class:visible={$questions?.length} on:wheel|stopPropagation>
  {#if $questions}
    {#each $questions as prompt}
      <div class="kanpas-prompt-item {prompt.message.color}">
        <div class="kanpas-prompt-head flex-row-center-y">
          {#if prompt.message.icon}
            <Icon size="medium" class="mdr-16">{prompt.message.icon}</Icon>
          {/if}
          <h5 class="flex">{prompt.message.title}</h5>
          <Icon clickable on:click={() => toast.decline(prompt)}>close</Icon>
        </div>
        <div class="kanpas-prompt-body">
          <p>{prompt.message.subtitle}</p>
        </div>
        <div class="kanpas-prompt-foot flex-row-center-y">
          <div class="flex" />
          <Button
            autofocus
            class="mdr-10"
            variant="borderless"
            on:click={() => toast.decline(prompt)}>Cancel</Button>
          <Button on:click={() => toast.confirm(prompt)}>Confirm</Button>
        </div>
      </div>
    {/each}
  {/if}
</div>

<style lang="scss">
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate3d(0, 4px, 0);
    }
    to {
      opacity: 1;
      transform: translate3d(0, 0, 0);
    }
  }

  @keyframes slideUp {
    from {
      opacity: 0;
      margin-top: 8px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }

  .kanpas-toast-list {
    position: fixed;
    right: var(--kanpas-space);
    bottom: var(--kanpas-space);
    z-index: 999;
  }

  .kanpas-toast-item {
    border-radius: var(--kanpas-radius);
    color: var(--kanpas-color-tooltip);
    padding: 8px 12px;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
    position: relative;
    animation: fadeIn 0.2s ease-in-out;
    backdrop-filter: blur(10px);

    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -1;
      background-color: var(--kanpas-color-tooltip-bg);
      border-radius: var(--kanpas-radius);
      opacity: 0.8;
    }

    &:not(:last-child) {
      margin-bottom: 12px;
    }

    &.primary {
      color: var(--kanpas-color-green-50);

      &:before {
        background-color: var(--kanpas-color-green-600);
      }
    }

    &.accent {
      color: var(--kanpas-color-orange-50);

      &:before {
        background-color: var(--kanpas-color-orange-600);
      }
    }

    &.warn {
      color: var(--kanpas-color-red-50);

      &:before {
        background-color: var(--kanpas-color-red-600);
      }
    }
  }

  .kanpas-toast-title {
    font-weight: 600;
    margin-bottom: 2px;
  }

  .kanpas-toast-subtitle {
    font-size: var(--kanpas-font-subtitle);
    opacity: 0.8;
  }

  .kanpas-toast-close {
    position: absolute;
    top: 0;
    right: 0;
  }

  .kanpas-prompt-list {
    position: fixed;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    z-index: 999;
    visibility: hidden;
    background-color: rgba(0, 0, 0, 0.5);

    &.visible {
      visibility: visible;
    }
  }

  .kanpas-prompt-item {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate3d(-50%, -50%, 0);
    padding: var(--kanpas-space);
    backdrop-filter: blur(30px);
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.4);
    border-radius: var(--kanpas-radius);
    animation: slideUp 0.2s ease-in-out;
    color: var(--kanpas-color-tooltip);

    h5 {
      margin: 0;
    }

    &:before {
      content: '';
      display: block;
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: var(--kanpas-color-tooltip-bg);
      z-index: -1;
      opacity: 0.8;
      border-radius: var(--kanpas-radius);
    }
  }

  .kanpas-prompt-head {
    margin-bottom: var(--kanpas-space);
  }

  .kanpas-prompt-body {
    margin-bottom: var(--kanpas-space-48);
  }
</style>
