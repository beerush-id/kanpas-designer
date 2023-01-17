<script lang="ts">
  import { resistant } from '@beerush/reactor';
  import Canvas from '@components/Canvas.svelte';
  import CanvasSwitch from '@components/CanvasSwitch.svelte';
  import Icon from '@components/common/Icon.svelte';
  import ImmersiveOption from '@components/common/ImmersiveOption.svelte';
  import Portal from '@components/common/Portal.svelte';
  import EditorPanel from '@components/EditorPanel.svelte';
  import Mockup from '@components/Mockup.svelte';
  import MockupSwitch from '@components/MockupSwitch.svelte';

  import typos from '@data/typos.json';
  import { mockup } from '@services/mockup.js';
  import { dragmove, focusAssist, hoverAssist } from '@services/selector';
  import { copy } from '@utils/clipboard';
  import { states, swatches, toCssVar, variables } from '@utils/colors';
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

  const switchElem = (elem) => {
    activeElem = elem;

    styles = elem.styles;
    options = elem.options;
  };

  const switchToBody = () => {
    styles = elements.body.styles;
    options = elements.body.options;
  };

  let css = toCssVar(
    [ ...swatches, ...states, ...variables ],
    { className: '.kanpas-root', darkClass: '.dark-mode' }
  );

  let styleElement = document.querySelector('#css-variables');

  if (!styleElement) {
    styleElement = document.createElement('style');
    styleElement.setAttribute('id', 'css-variables');
  }

  styleElement.innerHTML = css;
  document.head.appendChild(styleElement);

  const createCSS = (
    root: string = '.kanpas-root',
    body: string = '.kanpas-body',
    darkClass: string = '.dark-mode'
  ): string => {
    let elemCSS = '';

    for (const elem of
      [
        elements.body,
        ...elements.headings,
        elements.paragraph,
        elements.link,
        elements.quote,
        elements.separator
      ]) {
      let propCSS = '';

      if (elem.styles) {
        for (const key of Object.keys(elem.styles)) {
          if (!key.endsWith('Var') && [ 'string', 'number' ].includes(typeof elem.styles[key])) {
            let value = elem.styles[key];

            if (elem.styles[`${ key }Var`]) {
              value = elem.styles[`${ key }Var`].replace(/--[\w\d_-]+/g, m => `var(${ m })`);
            }

            if (value !== '') {
              propCSS += `  ${ key.replace(/[A-Z]/g, str => '-' + str.toLowerCase()) }: ${ value };\r\n`;
            }
          }
        }
      }

      if (propCSS) {
        if (root) {
          elemCSS += `.kanpas-root ${ elem.name === 'body' ? '.kanpas-body' : elem.name } {\r\n${ propCSS }}\r\n`;
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
      styleElement.innerHTML = `${ css }\r\n${ createCSS() }`;
    }
  };

  const unsubCSS = elements.subscribe(() => {
    exportCSS();
  });

  onDestroy(() => {
    unsubCSS();
    if (styleElement) {
      styleElement.remove();
    }
  });
</script>

<ImmersiveOption title="Typography" collapsible></ImmersiveOption>
<Portal slot="#immersive-header">
  <div class="flex-row-center-y">
    <div class="kanpas-acrylic">
      <Icon class="tool-icon" clickable tooltip="Copy CSS" on:click={copyCSS}>css</Icon>
    </div>
    <div class="mx-1"></div>
    <CanvasSwitch></CanvasSwitch>
    <div class="mx-1"></div>
    <MockupSwitch></MockupSwitch>
  </div>
</Portal>
<Canvas>
  <Mockup styles={elements.body.styles} on:body-focus={switchToBody}>
    <div class="kanpas-preview">
      {#each elements.headings as elem}
        <svelte:element this={elem.name}
                        use:dragmove="{elem.styles}"
                        use:hoverAssist={elem.styles}
                        use:focusAssist
                        on:click={() => switchElem(elem)}
                        on:keypress>{elem.text}</svelte:element>
        <p use:hoverAssist={elements.paragraph.styles}
           use:dragmove="{elements.paragraph.styles}"
           use:focusAssist
           on:keypress
           on:click={() => switchElem(elements.paragraph)}>{elements.paragraph.text}</p>
        <p use:hoverAssist={elements.paragraph.styles}
           use:dragmove="{elements.paragraph.styles}"
           use:focusAssist
           on:keypress
           on:click={() => switchElem(elements.paragraph)}>{elements.paragraph.text}</p>

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

        <hr use:hoverAssist={elements.separator.styles}
            use:dragmove="{elements.separator.styles}"
            use:focusAssist
            on:keypress
            on:click={() => switchElem(elements.separator)}>
      {/each}
    </div>
  </Mockup>
  <div class="editor-panel kanpas-acrylic" class:expanded={$mockup.fullScreen} slot="canvas-panel-right">
    <EditorPanel {styles} {options} textMode></EditorPanel>
  </div>
</Canvas>

<style lang="scss">
  .editor-panel {
    margin-top: 56px;
    margin-right: var(--kanpas-space-tight);
    border-radius: var(--kanpas-radius);
    height: calc(100% - 56px - var(--kanpas-space-tight));

    &.expanded {
      margin: 0;
      height: 100%;
    }
  }
</style>
