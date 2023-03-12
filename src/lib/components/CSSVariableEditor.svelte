<script lang="ts">
  import Icon from '@components/common/Icon.svelte';
  import { css } from '@services/css';

  let activeGroup = css.variableGroups[0];

  const addVar = () => {
    activeGroup.variables.push({
      name: '',
      value: ''
    });
  };
</script>

<div class="css-variables">
  <div class="group-switch flex-column-center">
    {#each css.variableGroups as group}
      <Icon class="tool-icon"
            xDir="before"
            yDir="between"
            clickable
            tooltip={group.label}
            active={activeGroup.name === group.name}
            on:click={() => activeGroup = group}>{group.icon}</Icon>
    {/each}
  </div>
  {#if activeGroup}
    <div class="group-head flex-row-center-y">
      <Icon class="mdr-10">{activeGroup.icon}</Icon>
      <h6 class="flex">{activeGroup.label}</h6>
      <Icon clickable tooltip="Add Variable" on:click={addVar}>add</Icon>
    </div>
    <div class="group-body">
      {#each $activeGroup.variables as item}
        <div class="variable-input flex-row-center-y mdb-4">
          <span class="prefix">--{activeGroup.name}-</span>
          <input class="name mdr-4 flex" type="text" placeholder="name" bind:value={item.name}>
          <input class="value flex" type="text" placeholder="value" bind:value={item.value}>
        </div>
      {/each}
    </div>
  {/if}
</div>

<style lang="scss">
  .css-variables {
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    width: 480px;
    border: 1px solid var(--kds-color-line-alt);
    border-radius: var(--kds-radius);
    border-top-left-radius: 0;
  }

  .group-switch {
    position: absolute;
    top: -1px;
    right: 100%;
    border: 1px solid var(--kds-color-line-alt);
    border-right: none;
    border-top-left-radius: var(--kds-radius-small);
    border-bottom-left-radius: var(--kds-radius-small);
    padding: var(--kds-space-tight) 0;
    background-color: var(--kds-color-background-alt);
  }

  .group-head, .group-body {
    padding: var(--kds-space);
  }

  .group-body {
    flex: 1;
    overflow-y: auto;
  }

  .variable-input {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-radius: var(--kds-radius-small);
    border: 1px solid var(--kds-color-input-line);
    background-color: var(--kds-color-input-bg);
    transition: all 0.2s ease-in-out;
    padding: 8px;

    &:hover {
      border-color: var(--kds-color-input-line-hover);
    }

    &.focus {
      border-color: var(--kds-color-input-line-active);
    }

    input.name {
      width: 72px;
    }

    input {
      display: block;
      border: none;
      border-radius: 0;
    }
  }

  .prefix {
    text-align: center;
    font-size: 11px;
    color: var(--kds-color-tooltip);
    background-color: var(--kds-color-tooltip-bg);
    padding: 4px 8px;
    border-radius: 3px;
    white-space: nowrap;
  }
</style>
