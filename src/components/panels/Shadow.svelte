<script lang="ts">
  import ColorPickerTrigger from '@components/colors/ColorPickerTrigger.svelte';
  import Icon from '@components/common/Icon.svelte';
  import InputUnit from '@components/common/InputUnit.svelte';
  import Panel from '@components/common/Panel.svelte';
  import PopUp from '@components/common/PopUp.svelte';
  import { createOptions, createStyles, type Shadow } from '@utils/panel';

  export let styles = createStyles();
  export let options = createOptions();
  export let role: 'box' | 'text' = 'box';

  const optKey = `${ role }Shadows`;
  const varKey = `${ role }ShadowVar`;
  const propKey = `${ role }Shadow`;

  const updateShadow = () => {
    if (options[optKey]) {
      const shadows = options[optKey].map(({ x, y, b, c, s, v }: Shadow) => {
        if (x && y && b && c) {
          const color = `${ x } ${ y } ${ b }${ s ? ' ' + s : '' } ${ c }`;

          if (v) {
            return { color, colorVar: `${ x } ${ y } ${ b }${ s ? ' ' + s : '' } ${ v }` };
          } else {
            return { color };
          }
        }
      });

      const color = shadows.filter(item => item).map(({ color }) => color).join(', ');
      const colorVar = shadows.filter(item => item).map((item) => item.colorVar || item.color).join(', ');

      if (color) {
        styles[propKey] = color;
      } else {
        delete styles[propKey];
      }

      if (colorVar && colorVar !== styles[propKey]) {
        styles[varKey] = colorVar;
      } else {
        delete styles[varKey];
      }
    }
  };

  const remove = (shadow) => {
    options[optKey].splice(options[optKey].indexOf(shadow), 1);
    updateShadow();
  };

  const reset = () => {
    options[optKey] = [];

    delete styles[propKey];
    delete styles[varKey];
  };
</script>

<Panel title={role === 'box' ? 'Box Shadow' : 'Text Shadow'}
       icon={role === 'box' ? 'token' : 'hdr_auto'}
       collapsible
       collapsed={!$options[optKey].length}>
  <svelte:fragment slot="panel-head">
    {#if $options[optKey].length}
      <Icon clickable tooltip="Clear Shadows" on:click={reset}>settings_backup_restore</Icon>
    {/if}
    <Icon clickable tooltip="Add Shadow" class="mdl-10" on:click={() => options[optKey].push({})}>add</Icon>
  </svelte:fragment>
  {#each $options[optKey] as shadow}
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
      {#if role === 'box'}
        <InputUnit class="flex mdr-6" hideUnit placeholder="Spread" bind:value={shadow.s} on:input={updateShadow}>
          <PopUp>Spread Radius</PopUp>
        </InputUnit>
      {/if}
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
