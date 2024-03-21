<script lang="ts">
  import { resistant, watch } from '@beerush/reactor';
  import Canvas from '@components/Canvas.svelte';
  import CanvasSwitch from '@components/CanvasSwitch.svelte';
  import Icon from '@components/common/Icon.svelte';
  import ImmersiveOption from '@components/common/ImmersiveOption.svelte';
  import Portal from '@components/common/Portal.svelte';
  import EditorPanel from '@components/EditorPanel.svelte';
  import HistorySwitch from '@components/HistorySwitch.svelte';
  import Mockup from '@components/Mockup.svelte';
  import MockupSwitch from '@components/MockupSwitch.svelte';
  import VariableShortcuts from '@components/VariableShortcuts.svelte';

  import typos from '@data/typos.json';
  import { mockup } from '@services/mockup.js';
  import { dragmove, focusAssist, hoverAssist, selector } from '@services/selector';
  import { copy } from '@utils/clipboard';
  import { cssVarName, states, swatches, toCssVar, variables } from '@utils/colors';
  import { createOptions, createStyles } from '@utils/panel';
  import { onDestroy } from 'svelte';

  export let styles = createStyles();
  export let options = createOptions();

  let activeElem: HTMLElement;
  const elements = resistant('global-typos', typos, true);

  for (const elem of elements.headings) {
    if (!elem.styles) {
      elem.styles = createStyles();
    }

    if (!elem.options) {
      elem.options = createOptions();
    }
  }

  if (!elements.body.styles) {
    elements.body.styles = createStyles({ padding: '24px' } as never);
    elements.body.options = createOptions();

    elements.paragraph.styles = createStyles();
    elements.paragraph.options = createOptions();

    elements.separator.styles = createStyles();
    elements.separator.options = createOptions();

    elements.link.styles = createStyles();
    elements.link.options = createOptions();

    elements.quote.styles = createStyles();
    elements.quote.options = createOptions();
  }

  styles = elements.body.styles;
  activeElem = elements.body;

  const switchElem = (elem) => {
    activeElem = elem;

    styles = elem.styles;
    options = elem.options;
  };

  const switchToBody = () => {
    activeElem = elements.body;

    styles = elements.body.styles;
    options = elements.body.options;
  };

  const history = watch(elements);

  let styleElement = document.querySelector('#css-variables');

  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.setAttribute('id', 'css-variables');
  }

  document.head.appendChild(styleElement);

  const createCSS = (
    root = '.kds-root',
    body = '.kds-body',
  ): string => {
    let elemCSS = '';

    for (const elem of
      [
        elements.body,
        ...elements.headings,
        elements.paragraph,
        elements.link,
        elements.quote,
        elements.separator,
      ]) {
      let propCSS = '';

      if (elem.styles) {
        for (const key of Object.keys(elem.styles)) {
          if (!key.endsWith('Var') && [ 'string', 'number' ].includes(typeof elem.styles[key])) {
            let value = elem.styles[key];

            if (elem.styles[`${ key }Var`] && elem.styles[`${ key }Var`].startsWith('--')) {
              value = cssVarName(elem.styles[`${ key }Var`]);
              // value = elem.styles[`${ key }Var`].replace(/--[\w\d_-]+/g, m => `var(${ m })`);
            }

            if (value !== '') {
              propCSS += `  ${ key.replace('webkit', '-webkit')
                .replace(/[A-Z]/g, str => '-' + str.toLowerCase()) }: ${ value };\r\n`;
            }
          }
        }
      }

      if (propCSS) {
        if (root) {
          elemCSS += `.kds-root ${ elem.name === 'body' ? '.kds-body' : elem.name } {\r\n${ propCSS }}\r\n`;
        } else {
          elemCSS += `${ elem.name === 'body' ? body : elem.name } {\r\n${ propCSS }}\r\n`;
        }
      }
    }

    return elemCSS;
  };

  const copyCSS = () => {
    const colors = toCssVar([ ...swatches, ...states, ...variables ]);
    copy(`${ colors }\r\n${ createCSS('', 'body') }`);
  };

  const exportCSS = () => {
    if ('innerHTML' in styleElement) {
      styleElement.innerHTML = `${ createCSS() }`;
    }
  };

  const unsubCSS = elements.subscribe(() => {
    setTimeout(() => {
      selector.placeFocuses();
    }, 100);
    exportCSS();
  });

  onDestroy(() => {
    history.forget();
    unsubCSS();
    if (styleElement) {
      styleElement.remove();
    }
  });
</script>

<ImmersiveOption title="Typography" collapsible></ImmersiveOption>
<Portal slot="#immersive-header">
  <div class="flex-row-center-y">
    <div class="kds-tool-group flex-row-center-y">
      <VariableShortcuts></VariableShortcuts>
      <div class="kds-separator-y"></div>
      <Icon class="tool-icon" clickable tooltip="Copy CSS" on:click={copyCSS}>css</Icon>
    </div>
    <div class="mx-1"></div>
    <div class="kds-tool-group">
      <HistorySwitch {history}></HistorySwitch>
    </div>
    <div class="mx-1"></div>
    <div class="kds-tool-group">
      <CanvasSwitch></CanvasSwitch>
    </div>
    <div class="mx-1"></div>
    <div class="kds-tool-group">
      <MockupSwitch></MockupSwitch>
    </div>
  </div>
</Portal>
<Canvas>
  <Mockup styles={elements.body.styles} on:body-focus={switchToBody}>
    {#each elements.headings as elem}
      <!-- svelte-ignore a11y-no-static-element-interactions -->
      <svelte:element this={elem.name}
                      use:dragmove="{elem.styles}"
                      use:hoverAssist={elem.styles}
                      use:focusAssist
                      on:click={() => switchElem(elem)}
                      on:keypress>{elem.text}</svelte:element>

      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <p use:hoverAssist={elements.paragraph.styles}
         use:dragmove="{elements.paragraph.styles}"
         use:focusAssist
         on:keypress
         on:click={() => switchElem(elements.paragraph)}>{elements.paragraph.text}</p>

      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <p use:hoverAssist={elements.paragraph.styles}
         use:dragmove="{elements.paragraph.styles}"
         use:focusAssist
         on:keypress
         on:click={() => switchElem(elements.paragraph)}>{elements.paragraph.text}</p>

      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <blockquote use:hoverAssist={elements.quote.styles}
                  use:dragmove="{elements.quote.styles}"
                  use:focusAssist
                  on:keypress
                  on:click={() => switchElem(elements.quote)}>{elements.quote.text}</blockquote>

      <a href="/" use:hoverAssist={elements.link.styles}
         use:dragmove="{elements.link.styles}"
         use:focusAssist
         on:keypress
         on:click|preventDefault|stopPropagation={() => switchElem(elements.link)}>{elements.link.text}</a>

      <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
      <hr use:hoverAssist={elements.separator.styles}
          use:dragmove="{elements.separator.styles}"
          use:focusAssist
          on:keypress
          on:click={() => switchElem(elements.separator)}>
    {/each}
  </Mockup>
  <div class="editor-panel kds-acrylic-bg" class:expanded={$mockup.fullScreen} slot="canvas-panel-right">
    <EditorPanel element={activeElem} {styles} {options} textMode></EditorPanel>
  </div>
</Canvas>

<style lang="scss">
  .editor-panel {
    border-radius: 0;
    height: 100%;
    border-left: 1px solid var(--kds-toolbar-line);

    &:before {
      border-radius: 0;
    }

    &.expanded {
      margin: 0;
      height: 100%;
    }
  }
</style>
