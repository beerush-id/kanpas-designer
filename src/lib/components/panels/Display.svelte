<script lang="ts">
  import { createStyles } from '@utils/panel';
  import Icon from '../common/Icon.svelte';
  import Panel from '../common/Panel.svelte';

  export let styles = createStyles();

  const displays = [
    {
      label: 'Default',
    },
    {
      value: 'flex',
      label: 'Flex',
    },
    {
      value: 'inline-flex',
      label: 'Inline Flex',
    },
    {
      value: 'block',
      label: 'Block',
    },
    {
      value: 'inline-block',
      label: 'Inline Block',
    },
    {
      value: 'inline',
      label: 'Inline',
    },
    {
      value: 'none',
      label: 'None',
    },
    {
      value: 'inherit',
      label: 'Inherit',
    },
    {
      value: 'initial',
      label: 'Initial',
    },
  ];

  const alignments = [
    {
      icon: 'align_horizontal_left',
      label: 'Align Horizontal Left',
      value: 'left'
    },
    {
      icon: 'align_horizontal_center',
      label: 'Align Horizontal Center',
      value: 'center'
    },
    {
      icon: 'align_horizontal_right',
      label: 'Align Horizontal Right',
      value: 'right'
    },
    {
      icon: 'align_vertical_Top',
      label: 'Align Vertical Top',
      value: 'top'
    },
    {
      icon: 'align_vertical_center',
      label: 'Align Vertical Center',
      value: 'middle'
    },
    {
      icon: 'align_vertical_bottom',
      label: 'Align Vertical Bottom',
      value: 'bottom'
    },
  ];

  const changeDisplay = () => {
    if (![ 'flex', 'inline-flex' ].includes(styles.display)) {
      delete styles.flexDirection;
    }
    resetAlignments();
  };

  let wrapLabel = 'Default wrapping';
  let wrapIcon = 'wrap_text';
  const toggleWrap = () => {
    if (styles.display && styles.display.includes('flex')) {
      if (!styles.flexWrap) {
        styles.flexWrap = 'wrap';
        wrapLabel = 'Chop down if reach max width';
        wrapIcon = 'format_text_wrap';
      } else if (styles.flexWrap === 'wrap') {
        styles.flexWrap = 'nowrap';
        wrapLabel = 'No wrapping';
        wrapIcon = 'format_text_overflow';
      } else if (styles.flexWrap === 'nowrap') {
        delete styles.flexWrap;
        wrapLabel = 'Default wrapping';
        wrapIcon = 'wrap_text';
      }
    } else {
      if (!styles.whiteSpace) {
        styles.whiteSpace = 'wrap';
        wrapLabel = 'Chop down if reach max width';
        wrapIcon = 'format_text_wrap';
      } else if (styles.whiteSpace === 'wrap') {
        styles.whiteSpace = 'nowrap';
        wrapLabel = 'No wrapping';
        wrapIcon = 'format_text_overflow';
      } else if (styles.whiteSpace === 'nowrap') {
        delete styles.whiteSpace;
        wrapLabel = 'Default wrapping';
        wrapIcon = 'wrap_text';
      }
    }
  };

  let dirLabel = 'Default content flow';
  let dirIcon = 'multiple_stop';
  const toggleFlow = () => {
    if (!styles.flexDirection) {
      styles.flexDirection = 'row';
      dirLabel = 'Content flows horizontally';
      dirIcon = 'start';
    } else if (styles.flexDirection === 'row') {
      styles.flexDirection = 'column';
      dirLabel = 'Content flows vertically';
      dirIcon = 'vertical_align_bottom';
    } else if (styles.flexDirection === 'column') {
      delete styles.flexDirection;
      dirLabel = 'Default content flow';
      dirIcon = 'multiple_stop';
    }

    resetAlignments();
  };

  let alignH = '';
  let alignV = '';
  const alignContent = (dir: string) => {
    if ([ 'left', 'right', 'center' ].includes(dir)) {
      if (alignH === dir) {
        alignH = '';
      } else {
        alignH = dir;
      }

      if (styles.display && styles.display.includes('flex')) {
        if (styles.flexDirection === 'column') {
          if (alignH === 'left') {
            styles.alignItems = 'flex-start';
          } else if (alignH === 'center') {
            styles.alignItems = 'center';
          } else if (alignH === 'right') {
            styles.alignItems = 'flex-end';
          } else {
            delete styles.alignItems;
          }
        } else {
          if (alignH === 'left') {
            styles.justifyContent = 'flex-start';
          } else if (alignH === 'center') {
            styles.justifyContent = 'center';
          } else if (alignH === 'right') {
            styles.justifyContent = 'flex-end';
          } else {
            delete styles.justifyContent;
          }
        }
      } else {
        styles.textAlign = alignH;
      }
    }

    if ([ 'top', 'bottom', 'middle' ].includes(dir)) {
      if (alignV === dir) {
        alignV = '';
      } else {
        alignV = dir;
      }

      if (styles.display && styles.display.includes('flex')) {
        if (styles.flexDirection === 'column') {
          if (alignV === 'top') {
            styles.justifyContent = 'flex-start';
          } else if (alignV === 'middle') {
            styles.justifyContent = 'center';
          } else if (alignV === 'bottom') {
            styles.justifyContent = 'flex-end';
          } else {
            delete styles.justifyContent;
          }
        } else {
          if (alignV === 'top') {
            styles.alignItems = 'flex-start';
          } else if (alignV === 'middle') {
            styles.alignItems = 'center';
          } else if (alignV === 'bottom') {
            styles.alignItems = 'flex-end';
          } else {
            delete styles.alignItems;
          }
        }
      } else {
        styles.verticalAlign = alignV;
      }
    }
  };

  let spanH = false;
  let spanV = false;
  const changeSpan = (dir: string) => {
    if (dir === 'vertical') {
      spanV = !spanV;
    } else if (dir === 'horizontal') {
      spanH = !spanH;
    }

    if (styles.flexDirection === 'column') {
      if (spanH) {
        styles.alignItems = 'space-between';
      } else {
        delete styles.alignItems;
      }

      if (spanV) {
        styles.justifyContent = 'space-between';
      } else {
        delete styles.justifyContent;
      }
    } else {
      if (spanH) {
        styles.justifyContent = 'space-between';
      } else {
        delete styles.justifyContent;
      }

      if (spanV) {
        styles.alignItems = 'space-between';
      } else {
        delete styles.alignItems;
      }
    }

    console.log(dir, styles.alignItems, styles.justifyContent);
  };

  const resetAlignments = () => {
    alignH = '';
    alignV = '';
    spanH = false;
    spanV = false;

    [
      'textAlign',
      'verticalAlign',
      'alignItems',
      'justifyContent',
      'flexWrap',
      'whiteSpace'
    ].forEach(p => delete styles[p]);
  };

  $: {
    alignH = '';
    alignV = '';
    spanH = false;
    spanV = false;

    if (styles.textAlign) {
      alignH = styles.textAlign;
    }

    if (styles.verticalAlign) {
      alignV = styles.verticalAlign;
    }

    if (styles.display && styles.display.includes('flex')) {
      if (styles.flexDirection === 'column') {
        switch (styles.alignItems) {
          case 'flex-start':
            alignH = 'left';
            break;
          case 'center':
            alignH = 'center';
            break;
          case 'flex-end':
            alignH = 'right';
            break;
          case 'space-between':
            spanH = true;
            break;
          default:
            break;
        }

        switch (styles.justifyContent) {
          case 'flex-start':
            alignV = 'top';
            break;
          case 'center':
            alignV = 'middle';
            break;
          case 'flex-end':
            alignV = 'bottom';
            break;
          case 'space-between':
            spanV = true;
            break;
          default:
            break;
        }
      } else {
        switch (styles.justifyContent) {
          case 'flex-start':
            alignH = 'left';
            break;
          case 'center':
            alignH = 'center';
            break;
          case 'flex-end':
            alignH = 'right';
            break;
          case 'space-between':
            spanH = true;
            break;
          default:
            break;
        }

        switch (styles.alignItems) {
          case 'flex-start':
            alignV = 'top';
            break;
          case 'center':
            alignV = 'middle';
            break;
          case 'flex-end':
            alignV = 'bottom';
            break;
          case 'space-between':
            spanV = true;
            break;
          default:
            break;
        }
      }
    }

    if (styles.flexDirection === 'column') {
      dirLabel = 'Content flows vertically';
      dirIcon = 'vertical_align_bottom';
    } else if (styles.flexDirection === 'row') {
      dirLabel = 'Content flows horizontally';
      dirIcon = 'start';
    } else {
      dirLabel = 'Default content flow';
      dirIcon = 'multiple_stop';
    }

    if (styles.flexWrap === 'wrap' || styles.whiteSpace === 'wrap') {
      wrapLabel = 'Chop down if reach max width';
      wrapIcon = 'format_text_wrap';
    } else if (styles.flexWrap === 'nowrap' || styles.whiteSpace === 'nowrap') {
      wrapLabel = 'No wrapping';
      wrapIcon = 'format_text_overflow';
    } else {
      wrapLabel = 'Default wrapping';
      wrapIcon = 'wrap_text';
    }
  }
</script>
<Panel title="Display">
  <svelte:fragment slot="panel-head">
    <select name="display"
            bind:value={styles.display}
            on:change={changeDisplay}
            class:active={$styles.display}>
      {#each displays as display}
        <option value={display.value}>{display.label}</option>
      {/each}
    </select>
    {#if styles.display === 'flex' || styles.display === 'inline-flex'}
      <Icon clickable class="mdl-10"
            tooltip={dirLabel}
            on:click={toggleFlow}
            active={$styles.flexDirection}>{dirIcon}</Icon>
    {/if}
    <Icon clickable class="mdl-10"
          tooltip={wrapLabel}
          on:click={toggleWrap}
          active={$styles.flexWrap||$styles.whiteSpace}>{wrapIcon}</Icon>
  </svelte:fragment>
  <div class="kds-panel-section flex-row-center-y">
    {#each alignments as align}
      <Icon clickable tooltip={align.label}
            active={alignH === align.value || alignV === align.value}
            on:click={() => alignContent(align.value)}>{align.icon}</Icon>
    {/each}
    {#if styles.display && styles.display.includes('flex')}
      <span class="kds-separator-y"></span>
      <Icon clickable tooltip='Fill Horizontal Space'
            active={spanH}
            on:click={() => changeSpan('horizontal')}>horizontal_distribute
      </Icon>
      <Icon clickable tooltip='Fill Vertical Space'
            active={spanV}
            on:click={() => changeSpan('vertical')}>vertical_distribute
      </Icon>
    {/if}
  </div>
</Panel>
