<script lang="ts">
  import Icon from './Icon.svelte';

  export let title = '';
  export let icon = '';
  export let collapsible = false;
  export let collapsed = false;

  const toggle = () => {
    collapsed = !collapsed;
  };
</script>

<div class="kanpas-panel">
  {#if title}
    <div class="kanpas-panel-title flex-row-center-y">
      {#if icon}
        <Icon size="medium" class="kanpas-panel-head-icon mdr-10" on:click={toggle}>{icon}</Icon>
      {/if}
      {#if typeof title === 'string'}
        <span class="flex" on:click={toggle} on:keypress>{title}</span>
      {/if}
      <slot name="panel-head"/>
      {#if collapsible}
        <Icon
          class="mdl-10"
          tooltip={collapsed ? 'More' : 'Less'}
          clickable
          on:click={toggle}
        >{collapsed ? 'unfold_more' : 'unfold_less'}</Icon>
      {/if}
    </div>
  {/if}
  <slot name="panel-body"/>
  <div class="kanpas-panel-body" class:collapsed>
    <slot/>
  </div>
</div>
