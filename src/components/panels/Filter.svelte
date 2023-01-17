<script lang="ts">
  import Icon from '@components/common/Icon.svelte';
  import Panel from '@components/common/Panel.svelte';
  import { createOptions, createStyles, joinFilters } from '@utils/panel';

  export let styles = createStyles();
  export let options = createOptions();
  export let role: 'filter' | 'backdrop' = 'filter';

  const key = role === 'filter' ? 'filters' : 'backdropFilters';
  const propKey = role === 'filter' ? 'filter' : 'backdropFilter';

  const removeFilter = (name: string) => {
    if (typeof options[key][name] === 'number') {
      delete options[key][name];
    }

    updateFilter();
  };

  const updateFilter = () => {
    const { filter, filterVar } = joinFilters(options[key], role === 'filter' ? options.dropShadows : []);

    if (filter || filterVar) {
      if (filter) {
        styles[propKey] = filter;
      } else {
        delete styles[propKey];
      }

      if (filterVar) {
        styles[`${ propKey }Var`] = filterVar;
      } else {
        delete styles[`${ propKey }Var`];
      }
    } else {
      delete styles[propKey];
      delete styles[`${ propKey }Var`];
    }
  };

  const clearFilter = () => {
    options[key] = {} as never;
    updateFilter();
  };
</script>

<Panel title collapsible collapsed>
  <svelte:fragment slot="panel-head">
    <Icon size="medium"
          tooltip={role === 'filter' ? 'Filter' : 'Backdrop Filter'}
          class="kanpas-panel-head-icon mdr-24">{role === 'filter' ? 'contrast' : 'background_replace'}</Icon>
    <div class="kanpas-panel-prop-label mdr-10">Blur</div>
    <input name="blur"
           class="flex"
           type="range"
           min="0"
           max="50"
           step="0.1"
           bind:value={$options[key].blur}
           on:input={updateFilter}>
    <span class="kanpas-prop-unit mdl-10">{($options[key].blur || 0)}px</span>
    <Icon clickable class="mdl-10"
          tooltip="Clear Filter"
          active={Object.keys($options[key]).length}
          on:click={clearFilter}>{Object.keys($options[key]).length ? 'filter_alt' : 'filter_alt_off'}</Icon>
  </svelte:fragment>
  <div class="kanpas-panel-section flex-row-center-y">
    <div class="kanpas-panel-prop-label flex">Brightness</div>
    <input name="brightness"
           class="flex"
           type="range"
           min="0"
           max="1"
           step="0.1"
           bind:value={$options[key].brightness}
           on:input={updateFilter}>
    <span class="kanpas-prop-unit mdl-10">{($options[key].brightness || 0) * 100}%</span>
    <Icon clickable tooltip="Revert" class="mdl-10"
          active={typeof $options[key].brightness !== 'undefined'}
          on:click={() => removeFilter('brightness')}>settings_backup_restore
    </Icon>
  </div>
  <div class="kanpas-panel-section flex-row-center-y">
    <div class="kanpas-panel-prop-label flex">Contrast</div>
    <input name="contrast"
           class="flex"
           type="range"
           min="0"
           max="200"
           step="1"
           bind:value={$options[key].contrast}
           on:input={updateFilter}>
    <span class="kanpas-prop-unit mdl-10">{($options[key].contrast || 0)}%</span>
    <Icon clickable tooltip="Revert" class="mdl-10"
          active={typeof $options[key].contrast !== 'undefined'}
          on:click={() => removeFilter('contrast')}>settings_backup_restore
    </Icon>
  </div>
  <div class="kanpas-panel-section flex-row-center-y">
    <div class="kanpas-panel-prop-label flex">Grayscale</div>
    <input name="grayscale"
           class="flex"
           type="range"
           bind:value={$options[key].grayscale}
           on:input={updateFilter}>
    <span class="kanpas-prop-unit mdl-10">{($options[key].grayscale || 0)}%</span>
    <Icon clickable tooltip="Revert" class="mdl-10"
          active={typeof $options[key].grayscale !== 'undefined'}
          on:click={() => removeFilter('grayscale')}>settings_backup_restore
    </Icon>
  </div>
  <div class="kanpas-panel-section flex-row-center-y">
    <div class="kanpas-panel-prop-label flex">Hue</div>
    <input name="hueRotate"
           class="flex"
           type="range"
           min="0"
           max="360"
           step="1"
           bind:value={$options[key].hueRotate}
           on:input={updateFilter}>
    <span class="kanpas-prop-unit mdl-10">{($options[key].hueRotate || 0)}</span>
    <Icon clickable tooltip="Revert" class="mdl-10"
          active={typeof $options[key].hueRotate !== 'undefined'}
          on:click={() => removeFilter('hueRotate')}>settings_backup_restore
    </Icon>
  </div>
  <div class="kanpas-panel-section flex-row-center-y">
    <div class="kanpas-panel-prop-label flex">Invert</div>
    <input name="invert"
           class="flex"
           type="range"
           bind:value={$options[key].invert}
           on:input={updateFilter}>
    <span class="kanpas-prop-unit mdl-10">{($options[key].invert || 0)}%</span>
    <Icon clickable tooltip="Revert" class="mdl-10"
          active={typeof $options[key].invert !== 'undefined'}
          on:click={() => removeFilter('invert')}>settings_backup_restore
    </Icon>
  </div>
  <div class="kanpas-panel-section flex-row-center-y">
    <div class="kanpas-panel-prop-label flex">Opacity</div>
    <input name="opacity"
           class="flex"
           type="range"
           bind:value={$options[key].opacity}
           on:input={updateFilter}>
    <span class="kanpas-prop-unit mdl-10">{($options[key].opacity || 0)}%</span>
    <Icon clickable tooltip="Revert" class="mdl-10"
          active={typeof $options[key].opacity !== 'undefined'}
          on:click={() => removeFilter('opacity')}>settings_backup_restore
    </Icon>
  </div>
  <div class="kanpas-panel-section flex-row-center-y">
    <div class="kanpas-panel-prop-label flex">Saturate</div>
    <input name="saturate"
           class="flex"
           type="range"
           bind:value={$options[key].saturate}
           on:input={updateFilter}>
    <span class="kanpas-prop-unit mdl-10">{($options[key].saturate || 0)}%</span>
    <Icon clickable tooltip="Revert" class="mdl-10"
          active={typeof $options[key].saturate !== 'undefined'}
          on:click={() => removeFilter('saturate')}>settings_backup_restore
    </Icon>
  </div>
  <div class="kanpas-panel-section flex-row-center-y">
    <div class="kanpas-panel-prop-label flex">Sepia</div>
    <input name="sepia"
           class="flex"
           type="range"
           bind:value={$options[key].sepia}
           on:input={updateFilter}>
    <span class="kanpas-prop-unit mdl-10">{($options[key].sepia || 0)}%</span>
    <Icon clickable tooltip="Revert" class="mdl-10"
          active={typeof $options[key].sepia !== 'undefined'}
          on:click={() => removeFilter('sepia')}>settings_backup_restore
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

  input[type="range"] {
    width: 72px;
  }
</style>
