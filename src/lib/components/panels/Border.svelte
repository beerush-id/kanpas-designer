<script lang="ts">
  import { i18n } from '@actions/i18n.js';
  import { createStyles } from '@utils/panel';
  import ColorPickerTrigger from '../colors/ColorPickerTrigger.svelte';
  import InputUnit from '../common/InputUnit.svelte';
  import Panel from '../common/Panel.svelte';

  export let styles = createStyles();

  const borderStyles = [
    {
      label: 'Style',
    },
    {
      value: 'solid',
      label: 'Solid',
    },
    {
      value: 'dotted',
      label: 'Dotted',
    },
    {
      value: 'dashed',
      label: 'Dashed',
    },
    {
      value: 'double',
      label: 'Double',
    },
    {
      value: 'groove',
      label: 'Groove',
    },
    {
      value: 'ridge',
      label: 'Ridge',
    },
    {
      value: 'inset',
      label: 'Inset',
    },
    {
      value: 'outset',
      label: 'Outset',
    },
    {
      value: 'none',
      label: 'None',
    },
  ];

  const dirs = [ 'Left', 'Top', 'Right', 'Bottom' ];

  const borderChange = (name: string) => {
    if (name === 'border') {
      if (!styles.borderStyle) {
        styles.borderStyle = 'solid';
      }

      if (!styles.borderWidth) {
        delete styles.borderStyle;
        delete styles.borderColor;
        delete styles.borderColorVar;
      }

      for (const dir of dirs) {
        delete styles[`border${ dir }Width`];
        delete styles[`border${ dir }Style`];
        delete styles[`border${ dir }Color`];
        delete styles[`border${ dir }ColorVar`];
      }
    } else {
      delete styles.borderWidth;
      delete styles.borderStyle;
      delete styles.borderColor;
      delete styles.borderColorVar;

      if (!styles[`border${ name }Style`]) {
        styles[`border${ name }Style`] = 'solid';
      }

      if (!styles[`border${ name }Width`]) {
        delete styles[`border${ name }Style`];
        delete styles[`border${ name }Color`];
        delete styles[`border${ name }ColorVar`];
      }
    }
  };
</script>

<Panel icon="border_all" title="Border" collapsible collapsed>
  <svelte:fragment slot="panel-head">
    <InputUnit placeholder="Size" class="small"
               bind:value={$styles.borderWidth}
               on:input={() => borderChange('border')}></InputUnit>
    <select class="mdl-4"
            bind:value={$styles.borderStyle}
            on:change={() => borderChange('border')} style:width="70px">
      {#each borderStyles as pos}
        <option value={pos.value}>{pos.label}</option>
      {/each}
    </select>
    <ColorPickerTrigger tooltip="Border Color"
                        bind:value={$styles.borderColor}
                        bind:variable={$styles.borderColorVar}
                        class="mdl-4"
                        on:change={() => borderChange('border')}></ColorPickerTrigger>
  </svelte:fragment>
  {#each dirs as dir}
    <div class="flex-row-center-y mdb-10">
      <span class="kds-panel-prop-label flex" use:i18n={dir}></span>
      <InputUnit class="mdr-4"
                 placeholder="Size"
                 bind:value={$styles[`border${dir}Width`]}
                 on:input={() => borderChange(dir)}></InputUnit>
      <select class="mdr-4" name="position"
              bind:value={$styles[`border${dir}Style`]}
              on:change={() => borderChange(dir)}>
        {#each borderStyles as pos}
          <option value={pos.value}>{pos.label}</option>
        {/each}
      </select>
      <ColorPickerTrigger tooltip="Border Color"
                          bind:value={$styles[`border${dir}Color`]}
                          bind:variable={$styles[`border${dir}ColorVar`]}
                          on:change={() => borderChange(dir)}></ColorPickerTrigger>
    </div>
  {/each}
</Panel>
