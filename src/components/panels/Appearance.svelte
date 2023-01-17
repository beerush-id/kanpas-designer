<script lang="ts">
  import { createStyles } from '@utils/panel';
  import ColorPickerTrigger from '../colors/ColorPickerTrigger.svelte';
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

<Panel title="Appearance">
  <svelte:fragment slot="panel-head">
    <Icon class="mdr-6">format_color_fill</Icon>
    <ColorPickerTrigger tooltip="Background Color"
                        class="mdr-10"
                        bind:value={$styles.backgroundColor}
                        bind:variable={$styles.backgroundColorVar}></ColorPickerTrigger>
    <Icon class="mdr-6">format_color_text</Icon>
    <ColorPickerTrigger tooltip="Foreground Color"
                        bind:value={$styles.color} bind:variable={$styles.colorVar}></ColorPickerTrigger>
    <div class="kanpas-separator-y"></div>
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
  <div class="kanpas-panel-section flex-row-center-y">
    <span class="kanpas-panel-prop-label mdr-10">Opacity</span>
    <input type="range" min="0" max="1" step="0.01" class="flex" bind:value={$styles.opacity}>
    <span class="kanpas-prop-unit">{typeof $styles.opacity === 'undefined' ? 'auto' : $styles.opacity}</span>
    <Icon clickable
          tooltip="Revert"
          class="mdl-10"
          active={typeof $styles.opacity !== 'undefined'}
          on:click={delete styles.opacity}>
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
