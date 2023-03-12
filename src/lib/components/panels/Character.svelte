<script lang="ts">
  import { webFonts } from '@services/font.js';
  import { createStyles } from '@utils/panel';
  import ColorPickerTrigger from '../colors/ColorPickerTrigger.svelte';
  import Icon from '../common/Icon.svelte';
  import InputUnit from '../common/InputUnit.svelte';
  import Panel from '../common/Panel.svelte';
  import PopUp from '../common/PopUp.svelte';

  export let styles = createStyles();
  export let collapsed = false;

  let weightMaps = [
    {
      name: 'light',
      label: 'Light',
      value: '300'
    },
    {
      name: 'regular',
      label: 'Regular',
      value: '400'
    },
    {
      name: 'medium',
      label: 'Medium',
      value: '500'
    },
    {
      name: 'bold',
      label: 'Bold',
      value: '600'
    },
    {
      name: 'extra-bold',
      label: 'Extra Bold',
      value: '700'
    }
  ];

  const changeFont = () => {
    const { fontFamily: name } = styles;

    if (!webFonts.activeFonts.includes(name)) {
      webFonts.activeFonts.push(name);
      webFonts.exportCss();
    }
  };

  $: {
    const { fontFamily: name } = styles;
    const font = webFonts.fonts.find(item => item.name === name);

    if (font) {
      weightMaps = font.weightMaps;
    }
  }

  const toggleBold = () => {
    if (styles.fontWeight === '600') {
      delete styles.fontWeight;
    } else {
      styles.fontWeight = '600';
    }
  };

  const toggleItalic = () => {
    if (styles.fontStyle === 'italic') {
      delete styles.fontStyle;
    } else {
      styles.fontStyle = 'italic';
    }
  };

  const toggleUnderline = () => {
    if (styles.textDecoration === 'underline') {
      delete styles.textDecoration;
    } else {
      styles.textDecoration = 'underline';
    }
  };

  const toggleStrike = () => {
    if (styles.textDecoration === 'line-through') {
      delete styles.textDecoration;
    } else {
      styles.textDecoration = 'line-through';
    }
  };

  const alignments = [
    {
      name: 'left',
      icon: 'format_align_left',
      label: 'Align Left'
    },
    {
      name: 'center',
      icon: 'format_align_center',
      label: 'Align Center'
    },
    {
      name: 'right',
      icon: 'format_align_right',
      label: 'Align Right'
    },
    {
      name: 'justify',
      icon: 'format_align_justify',
      label: 'Align Justify'
    },
  ];

  const toggleAlign = (item) => {
    if (styles.textAlign === item.name) {
      delete styles.textAlign;
    } else {
      styles.textAlign = item.name;
    }
  };

  const cases = [
    {
      name: 'uppercase',
      icon: 'text_fields',
      label: 'Upper Case'
    },
    {
      name: 'capitalize',
      icon: 'title',
      label: 'Title Case'
    },
    {
      name: 'lowercase',
      icon: 'format_size',
      label: 'Lower Case'
    },
  ];
  const toggleCase = (item) => {
    if (styles.textTransform === item.name) {
      delete styles.textTransform;
    } else {
      styles.textTransform = item.name;
    }
  };

  const toggleWrap = () => {
    if (styles.whiteSpace === 'nowrap') {
      styles.whiteSpace = 'wrap';
    } else if (styles.whiteSpace === 'wrap') {
      delete styles.whiteSpace;
    } else {
      styles.whiteSpace = 'nowrap';
    }
  };
</script>

<Panel title="Text" collapsible {collapsed}>
  <svelte:fragment slot="panel-head">
    <InputUnit class="mdl-4"
               name="height"
               placeholder="Size"
               bind:value={$styles.fontSize}>
      <PopUp>Text Size</PopUp>
    </InputUnit>
    <Icon class="mdl-10">format_color_text</Icon>
    <ColorPickerTrigger class="mdl-4"
                        tooltip="Text Color"
                        bind:value={$styles.color}
                        bind:variable={$styles.colorVar}></ColorPickerTrigger>
    <div class="kds-separator-y"></div>
    <Icon clickable
          tooltip={$styles.whiteSpace ? ($styles.whiteSpace === 'wrap' ? 'Wrap Text' : 'No Wrap') : 'Default White Space'}
          active={$styles.whiteSpace}
          on:click={toggleWrap}>{$styles.whiteSpace ? ($styles.whiteSpace === 'wrap' ? 'format_text_wrap' : 'format_text_clip') : 'wrap_text'}
    </Icon>
  </svelte:fragment>
  <div class="kds-panel-section flex-row-center-y">
    <div class="kds-input flex flex-row-center-y">
      <span class="kds-panel-prop-label flex mdr-10">Font</span>
      <select name="font-family" bind:value={$styles.fontFamily} on:change={changeFont}>
        <option value={undefined}>Default</option>
        {#each webFonts.fonts.sort((a, b) => a.name.localeCompare(b.name)) as font}
          <option value={font.name}>{font.name}</option>
        {/each}
      </select>
      <Icon clickable class="mdl-10"
            tooltip="Bold Text"
            active={$styles.fontWeight === '600'}
            on:click={toggleBold}>format_bold
      </Icon>
      <Icon clickable class="mdl-10"
            tooltip="Italic Text"
            active={$styles.fontStyle === 'italic'}
            on:click={toggleItalic}>format_italic
      </Icon>
      <div class="kds-separator-y"></div>
      <Icon clickable
            tooltip="Underlined Text"
            active={$styles.textDecoration === 'underline'}
            on:click={toggleUnderline}>format_underlined
      </Icon>
      <Icon clickable class="mdl-10"
            tooltip="Strike Through Text"
            active={$styles.textDecoration === 'line-through'}
            on:click={toggleStrike}>format_strikethrough
      </Icon>
    </div>
  </div>
  <div class="kds-panel-section flex-row-center-y">
    {#each alignments as align}
      <Icon clickable
            tooltip={align.label}
            active={$styles.textAlign === align.name}
            on:click={() => toggleAlign(align)}>{align.icon}
      </Icon>
    {/each}
    <span class="kds-separator-y"></span>
    {#each cases as align}
      <Icon clickable
            tooltip={align.label}
            active={$styles.textTransform === align.name}
            on:click={() => toggleCase(align)}>{align.icon}
      </Icon>
    {/each}
    <Icon clickable
          tooltip="No Decoration"
          active={$styles.textDecoration === 'none'}
          on:click={() => styles.textDecoration = 'none'}>format_clear
    </Icon>
  </div>
  <div class="kds-panel-section flex-row-center-y">
    <div class="kds-input flex-row-center-y">
      <Icon tooltip="Font Weight" class="mdr-4">line_weight</Icon>
      <select name="font-weight" bind:value={$styles.fontWeight}>
        <option value={undefined}>Default</option>
        {#each weightMaps.sort((a, b) => a.name.localeCompare(b.name)) as weight}
          <option value={weight.value}>{weight.label}</option>
        {/each}
      </select>
    </div>
    <div class="flex"></div>
    <div class="kds-input flex-row-center-y mdl-4">
      <Icon tooltip="Line Height" class="mdr-4">format_line_spacing</Icon>
      <input type="text" placeholder="auto" name="line-height" bind:value={$styles.lineHeight}>
    </div>
    <div class="flex"></div>
    <div class="kds-input flex-row-center-y mdl-4">
      <Icon tooltip="Letter Spacing" class="mdr-4">format_indent_increase</Icon>
      <input type="text" placeholder="auto" name="line-height" bind:value={$styles.letterSpacing}>
    </div>
  </div>
</Panel>
