<script lang="ts">
  import ColorPickerTrigger from '@components/colors/ColorPickerTrigger.svelte';
  import Icon from '@components/common/Icon.svelte';
  import Panel from '@components/common/Panel.svelte';
  import { createOptions, createStyles, joinBackgrounds } from '@utils/panel.js';

  export let styles = createStyles();
  export let options = createOptions();

  const onImage = (e) => {
    const { files } = e.target as HTMLInputElement;
    const file = files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        options.backgroundImage = `url(${ reader.result })`;
        styles.backgroundImage = joinBackgrounds(options);
        e.target.value = '';
      };
      reader.readAsDataURL(file);
    }
  };

  const useCustomSize = () => {
    const { x, y } = options.backgroundSize;
    delete options.backgroundSize.v;

    if (x && y) {
      styles.backgroundSize = `${ options.backgroundSize.x } ${ options.backgroundSize.y }`;
    } else {
      delete styles.backgroundSize;
    }
  };

  const useVarSize = () => {
    delete options.backgroundSize.x;
    delete options.backgroundSize.y;

    if (options.backgroundSize.v) {
      styles.backgroundSize = `${ options.backgroundSize.v }`;
    } else {
      delete styles.backgroundSize;
    }
  };

  const useCustomPos = () => {
    const { x, y } = options.backgroundPosition;
    delete options.backgroundPosition.v;

    if (x && y) {
      styles.backgroundPosition = `${ options.backgroundPosition.x } ${ options.backgroundPosition.y }`;
    } else {
      delete styles.backgroundPosition;
    }
  };

  const useVarPos = () => {
    delete options.backgroundPosition.x;
    delete options.backgroundPosition.y;

    if (options.backgroundPosition.v) {
      styles.backgroundPosition = `${ options.backgroundPosition.v }`;
    } else {
      delete styles.backgroundPosition;
    }
  };

  const toggleClip = () => {
    options.backgroundClip = !options.backgroundClip;

    if (options.backgroundClip) {
      styles.backgroundClip = 'text';
      styles.webkitBackgroundClip = 'text';
      styles.webkitTextFillColor = 'transparent';
    } else if (styles.backgroundClip) {
      delete styles.backgroundClip;
      delete styles.webkitBackgroundClip;
      delete styles.webkitTextFillColor;
    }
  };

  const clear = () => {
    delete styles.backgroundColor;
    delete styles.backgroundRepeat;
    delete styles.backgroundClip;
    delete styles.webkitBackgroundClip;
    delete styles.webkitTextFillColor;

    delete options.backgroundClip;

    resetBgImage();
    resetSize();
    resetPosition();
  };

  const resetBgImage = () => {
    delete options.backgroundImage;
    styles.backgroundImage = joinBackgrounds(options);
  };

  const resetSize = () => {
    delete options.backgroundSize.x;
    delete options.backgroundSize.y;
    delete options.backgroundSize.v;
    delete styles.backgroundSize;
  };

  const resetPosition = () => {
    delete options.backgroundPosition.x;
    delete options.backgroundPosition.y;
    delete options.backgroundPosition.v;
    delete styles.backgroundPosition;
  };
</script>

<Panel title="Background" collapsible collapsed>
  <svelte:fragment slot="panel-head">
    <Icon class="mdr-6">format_color_fill</Icon>
    <ColorPickerTrigger tooltip="Background Color"
                        bind:value={$styles.backgroundColor}
                        bind:variable={$styles.backgroundColorVar}></ColorPickerTrigger>
    <div class="kanpas-separator-y"></div>
    <Icon clickable tooltip="Clip Text"
          active={$options.backgroundClip} on:click={toggleClip}>join_inner
    </Icon>
    <div class="kanpas-separator-y"></div>
    <Icon clickable tooltip="Reset Backgrounds"
          on:click={clear}>settings_backup_restore
    </Icon>
  </svelte:fragment>
  <div class="kanpas-panel-section flex-row">
    <div class="background-image flex-column-center"
         style:background-image={$styles.backgroundImage||''}
         style:background-size={$styles.backgroundSize||''}
         style:background-position={$styles.backgroundPosition||''}
         style:background-repeat={$styles.backgroundRepeat||''}>
      <Icon size="xl">yard</Icon>
      <span class="mdt-10">Select or Drag Image</span>
      <input type="file" on:input={onImage}>
    </div>
    <Icon clickable
          tooltip="Revert"
          class="mdl-10"
          active={typeof $options.backgroundImage !== 'undefined'}
          on:click={resetBgImage}>
      settings_backup_restore
    </Icon>
  </div>
  <div class="kanpas-panel-section flex-row-center">
    <div class="flex kanpas-panel-prop-label">Size</div>
    <select style:width="90px"
            bind:value={$options.backgroundSize.v}
            on:change={useVarSize}>
      <option value={undefined}>Default</option>
      <option value="cover">Cover</option>
      <option value="contain">Contain</option>
    </select>
    <input type="text"
           placeholder="x"
           class="mdl-4"
           style:width="52px"
           bind:value={$options.backgroundSize.x}
           on:input={useCustomSize}>
    <input type="text"
           placeholder="y"
           class="mdl-4"
           style:width="52px"
           bind:value={$options.backgroundSize.y}
           on:input={useCustomSize}>
    <Icon clickable
          tooltip="Revert"
          class="mdl-10"
          active={typeof $styles.backgroundSize !== 'undefined'}
          on:click={resetSize}>
      settings_backup_restore
    </Icon>
  </div>
  <div class="kanpas-panel-section flex-row-center">
    <div class="flex kanpas-panel-prop-label">Position</div>
    <select style:width="90px"
            bind:value={$options.backgroundPosition.v}
            on:change={useVarPos}>
      <option value={undefined}>Default</option>
      <option value="top">Top</option>
      <option value="left">Left</option>
      <option value="center">Center</option>
    </select>
    <input type="text"
           placeholder="x"
           class="mdl-4"
           style:width="52px"
           bind:value={$options.backgroundPosition.x}
           on:input={useCustomPos}>
    <input type="text"
           placeholder="y"
           class="mdl-4"
           style:width="52px"
           bind:value={$options.backgroundPosition.y}
           on:input={useCustomPos}>
    <Icon clickable
          tooltip="Revert"
          class="mdl-10"
          active={typeof $styles.backgroundPosition !== 'undefined'}
          on:click={resetPosition}>
      settings_backup_restore
    </Icon>
  </div>
  <div class="kanpas-panel-section flex-row-center">
    <div class="flex kanpas-panel-prop-label">Repeat</div>
    <select style:width="108px"
            bind:value={$styles.backgroundRepeat}>
      <option value={undefined}>Default</option>
      <option value="repeat">Repeat</option>
      <option value="no-repeat">No Repeat</option>
    </select>
    <Icon clickable
          tooltip="Revert"
          class="mdl-10"
          active={typeof $styles.backgroundRepeat !== 'undefined'}
          on:click={delete styles.backgroundRepeat}>
      settings_backup_restore
    </Icon>
  </div>
</Panel>

<style lang="scss">
  .background-image {
    width: 100%;
    height: 128px;
    background-color: var(--kanpas-color-input-bg);
    border-radius: var(--kanpas-radius-small);
    position: relative;
    border: 1px solid var(--kanpas-color-input-line);
    font-size: var(--kanpas-font-subtitle);
  }

  input[type="file"] {
    width: 100%;
    height: 100%;
    appearance: none;
    opacity: 0;
    position: absolute;
    z-index: 1;
  }
</style>
