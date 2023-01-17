<script lang="ts">
  import Range from '@components/common/Range.svelte';
  import { createStyles } from '@utils/panel';
  import { capitalize } from '@utils/string.js';
  import Icon from '../common/Icon.svelte';
  import Panel from '../common/Panel.svelte';

  export let styles = createStyles();

  let visibility = '';
  const toggleVisibility = () => {
    if (!visibility) {
      visibility = 'visible';
    } else if (visibility === 'visible') {
      visibility = 'hidden';
    } else if (visibility === 'hidden') {
      visibility = '';
    }

    styles.visibility = visibility;
  };

  const blendings = [
    'normal',
    'multiply',
    'screen',
    'overlay',
    'darken',
    'lighten',
    'color-dodge',
    'color-burn',
    'difference',
    'exclusion',
    'hue',
    'saturation',
    'luminosity'
  ];

  $: {
    visibility = styles.visibility;
  }

  const toggleNoAppearance = () => {
    if (styles.appearance) {
      delete styles.appearance;
    } else {
      styles.appearance = 'none';
    }
  };
</script>

<Panel title="Appearance" collapsible collapsed>
  <svelte:fragment slot="panel-head">
    <Icon clickable class="mdr-10"
          tooltip={!visibility ? 'Visibility' : visibility === 'visible' ? 'Visible': 'Hidden'}
          active={visibility}
          on:click={toggleVisibility}>{!visibility ? 'visibility' : visibility === 'visible' ? 'visibility' : 'visibility_off'}</Icon>
    <Icon clickable
          tooltip="Disable Browser Style"
          active={$styles.appearance === 'none'}
          on:click={toggleNoAppearance}>disabled_visible
    </Icon>
  </svelte:fragment>
  <div class="kanpas-panel-section flex-row-center-y" slot="panel-body">
    <span class="kanpas-panel-prop-label mdr-10">Opacity</span>
    <Range max="1" step="0.01" fill="1" class="flex" bind:value={$styles.opacity}></Range>
    <span class="kanpas-prop-unit">{typeof $styles.opacity === 'undefined' ? 'auto' : $styles.opacity}</span>
    <Icon clickable
          tooltip="Revert"
          class="mdl-10"
          active={typeof $styles.opacity !== 'undefined'}
          on:click={delete styles.opacity}>
      settings_backup_restore
    </Icon>
  </div>
  <div class="kanpas-panel-section flex-row-center-y">
    <span class="kanpas-panel-prop-label mdr-10 flex">Blending Mode</span>
    <select class="flex" bind:value={$styles.mixBlendMode}>
      <option value={undefined}>Default</option>
      {#each blendings as mode}
        <option value={mode}>{capitalize(mode)}</option>
      {/each}
    </select>
    <Icon clickable
          tooltip="Revert"
          class="mdl-10"
          active={typeof $styles.mixBlendMode !== 'undefined'}
          on:click={delete styles.mixBlendMode}>
      settings_backup_restore
    </Icon>
  </div>
  <div class="kanpas-panel-section flex-row-center-y">
    <span class="kanpas-panel-prop-label mdr-10 flex">Background Blend</span>
    <select class="flex" bind:value={$styles.backgroundBlendMode}>
      <option value={undefined}>Default</option>
      {#each blendings as mode}
        <option value={mode}>{capitalize(mode)}</option>
      {/each}
    </select>
    <Icon clickable
          tooltip="Revert"
          class="mdl-10"
          active={typeof $styles.backgroundBlendMode !== 'undefined'}
          on:click={delete styles.backgroundBlendMode}>
      settings_backup_restore
    </Icon>
  </div>
</Panel>

<style lang="scss">
  .kanpas-prop-unit {
    width: 36px;
    text-align: right;
    font-size: var(--kanpas-font-subtitle);
    opacity: 0.5;
  }
</style>
