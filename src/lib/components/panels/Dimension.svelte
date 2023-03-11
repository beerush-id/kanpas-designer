<script lang="ts">
  import { i18n } from '@actions/i18n.js';
  import { createStyles } from '@utils/panel';
  import Icon from '../common/Icon.svelte';
  import InputUnit from '../common/InputUnit.svelte';
  import Panel from '../common/Panel.svelte';
  import PopUp from '../common/PopUp.svelte';

  export let styles = createStyles();

  const toggleFlex = () => {
    if (styles.flex) {
      delete styles.flex;
    } else {
      styles.flex = '1';
      delete styles.width;
      delete styles.height;
    }
  };
  const toggleVScroll = () => {
    delete styles.overflow;

    if (styles.overflowY) {
      delete styles.overflowY;
    } else {
      styles.overflowY = 'auto';
    }
  };
  const toggleHScroll = () => {
    delete styles.overflow;

    if (styles.overflowX) {
      delete styles.overflowX;
    } else {
      styles.overflowX = 'auto';
    }
  };
  const toggleNoScroll = () => {
    if (styles.overflow === 'hidden') {
      delete styles.overflow;
    } else {
      styles.overflow = 'hidden';
      delete styles.overflowX;
      delete styles.overflowY;
    }
  };
</script>

<Panel title="Bounding Box" collapsible collapsed>
  <svelte:fragment slot="panel-head">
    {#if $styles.flex}
      <Icon class="mdr-10">
        info
        <PopUp slot="tooltip" align="center">
          <span class="-strong mdr-4">Flex Mode:</span>
          <span class="-label">If the parent element flows horizontally, <br>it'll fill the horizontal space. Otherwise,<br> it'll fill the vertical space.</span>
        </PopUp>
      </Icon>
    {/if}
    <Icon tooltip="Toggle Flex Mode" clickable
          active={$styles.flex} on:click={() => toggleFlex('x')}>open_with
    </Icon>
    <div class="kanpas-separator-y"></div>
    <Icon tooltip="Vertical Scroll" clickable
          active={$styles.overflowY === 'auto'} on:click={toggleVScroll}>swap_vert
    </Icon>
    <Icon tooltip="Horizontal Scroll" clickable class="mdl-10"
          active={$styles.overflowX === 'auto'} on:click={toggleHScroll}>swap_horiz
    </Icon>
    <Icon tooltip="No Scroll" clickable class="mdl-10"
          active={$styles.overflow === 'hidden'} on:click={toggleNoScroll}>hide_source
    </Icon>
  </svelte:fragment>
  <div class="kanpas-panel-section flex-row-center-y" slot="panel-body">
    <div class="kanpas-input flex flex-row-center-y">
      <span class="kanpas-panel-prop-label flex mdr-10" use:i18n={'Width'}></span>
      <InputUnit unit="%" name="width" placeholder="auto" bind:value={$styles.width}></InputUnit>
    </div>
    <div class="kanpas-separator-y"></div>
    <div class="kanpas-input flex flex-row-center-y">
      <span class="kanpas-panel-prop-label flex mdr-10" use:i18n={'Height'}></span>
      <InputUnit unit="%" name="height" placeholder="auto" bind:value={$styles.height}></InputUnit>
    </div>
  </div>
  <div class="kanpas-panel-section flex-row-center-y">
    <div class="kanpas-input flex flex-row-center-y">
      <span class="kanpas-panel-prop-label flex mdr-10" use:i18n={'Min'}></span>
      <InputUnit name="min-width"
                 placeholder="auto"
                 bind:value={$styles.minWidth}></InputUnit>
    </div>
    <div class="kanpas-separator-y"></div>
    <div class="kanpas-input flex flex-row-center-y">
      <span class="kanpas-panel-prop-label flex mdr-10" use:i18n={'Min'}></span>
      <InputUnit name="min-height"
                 placeholder="auto"
                 bind:value={$styles.minHeight}></InputUnit>
    </div>
  </div>
  <div class="kanpas-panel-section flex-row-center-y">
    <div class="kanpas-input flex flex-row-center-y">
      <span class="kanpas-panel-prop-label flex mdr-10" use:i18n={'Max'}></span>
      <InputUnit name="max-width"
                 placeholder="auto"
                 bind:value={$styles.maxWidth}></InputUnit>
    </div>
    <div class="kanpas-separator-y"></div>
    <div class="kanpas-input flex flex-row-center-y">
      <span class="kanpas-panel-prop-label flex mdr-10" use:i18n={'Max'}></span>
      <InputUnit name="max-height"
                 placeholder="auto"
                 bind:value={$styles.maxHeight}></InputUnit>
    </div>
  </div>
</Panel>
