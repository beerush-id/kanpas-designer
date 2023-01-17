<script lang="ts">
  import Icon from './Icon.svelte';

  export let title = '';
  export let icon = '';
  export let collapsible = false;
  export let collapsed = false;
</script>

<div class="kanpas-panel">
  {#if title}
    <div class="kanpas-panel-title flex-row-center-y">
      {#if icon}
        <Icon size="medium" class="kanpas-panel-head-icon mdr-10">{icon}</Icon>
      {/if}
      {#if typeof title === 'string'}
        <span class="flex">{title}</span>
      {/if}
      <slot name="panel-head" />
      {#if collapsible}
        <Icon
          class="mdl-10"
          tooltip={collapsed ? 'More' : 'Less'}
          clickable
          on:click={() => (collapsed = !collapsed)}
          >{collapsed ? 'unfold_more' : 'unfold_less'}</Icon>
      {/if}
    </div>
  {/if}
  <slot name="panel-body" />
  <div class="kanpas-panel-body" class:collapsed>
    <slot />
  </div>
</div>
