<script lang="ts">
  import ColorPickerTrigger from '@components/colors/ColorPickerTrigger.svelte';
  import Icon from '@components/common/Icon.svelte';
  import InputUnit from '@components/common/InputUnit.svelte';
  import Panel from '@components/common/Panel.svelte';
  import PopUp from '@components/common/PopUp.svelte';
  import { createOptions, createStyles, joinFilters } from '@utils/panel';

  export let styles = createStyles();
  export let options = createOptions();

  const updateShadow = () => {
    const { filter, filterVar } = joinFilters(options.filters, options.dropShadows);

    if (filter || filterVar) {
      styles.filter = filter;
      styles.filterVar = filterVar;
    } else {
      delete styles.filter;
      delete styles.filterVar;
    }
  };

  const remove = (shadow) => {
    options.dropShadows.splice(options.dropShadows.indexOf(shadow), 1);
    updateShadow();
  };

  const reset = () => {
    options.dropShadows = [];
    updateShadow();
  };
</script>

<Panel title="Drop Shadow"
       icon="ev_shadow"
       collapsible
       collapsed={!$options.dropShadows.length}>
  <svelte:fragment slot="panel-head">
    {#if $options.dropShadows.length}
      <Icon clickable tooltip="Clear Shadows" on:click={reset}>settings_backup_restore</Icon>
    {/if}
    <Icon clickable tooltip="Add Shadow" class="mdl-10" on:click={() => options.dropShadows.push({})}>add</Icon>
  </svelte:fragment>
  {#each $options.dropShadows as shadow}
    <div class="kanpas-panel-section flex-row-center-y">
      <InputUnit class="flex mdr-6" hideUnit placeholder="X" bind:value={shadow.x} on:input={updateShadow}>
        <PopUp>Horizontal Offset</PopUp>
      </InputUnit>
      <InputUnit class="flex mdr-6" hideUnit placeholder="Y" bind:value={shadow.y} on:input={updateShadow}>
        <PopUp>Vertical Offset</PopUp>
      </InputUnit>
      <InputUnit class="flex mdr-6" hideUnit placeholder="Blur" bind:value={shadow.b} on:input={updateShadow}>
        <PopUp>Blur Radius</PopUp>
      </InputUnit>
      <ColorPickerTrigger tooltip="Shadow Color"
                          bind:value={shadow.c}
                          bind:variable={shadow.v}
                          on:change={updateShadow}></ColorPickerTrigger>
      <Icon clickable
            tooltip="Remove"
            class="mdl-10"
            on:click={() => remove(shadow)}>remove
      </Icon>
    </div>
  {/each}
</Panel>

<style lang="scss">
  .kanpas-panel-section :global(input) {
    width: 24px;
  }
</style>
