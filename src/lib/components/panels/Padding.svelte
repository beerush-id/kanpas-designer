<script lang="ts">
  import { i18n } from '@actions/i18n.js';
  import { createStyles } from '@utils/panel';
  import Icon from '../common/Icon.svelte';
  import InputUnit from '../common/InputUnit.svelte';
  import Panel from '../common/Panel.svelte';

  export let styles = createStyles();

  let linkedX = false;
  let linkedY = false;

  const useLinked = () => {
    delete styles.paddingLeft;
    delete styles.paddingTop;
    delete styles.paddingRight;
    delete styles.paddingBottom;
  };
  const useCustom = (event: InputEvent) => {
    const { name, value } = event.detail as HTMLInputElement;

    switch (name) {
      case 'left':
        if (linkedX) {
          styles.paddingRight = value;
        }
        break;
      case 'top':
        if (linkedY) {
          styles.paddingBottom = value;
        }
        break;
      case 'right':
        if (linkedX) {
          styles.paddingLeft = value;
        }
        break;
      case 'bottom':
        if (linkedY) {
          styles.top = value;
        }
        break;
      default:
        break;
    }

    delete styles.padding;
  };

  const toggleLinkX = () => {
    linkedX = !linkedX;

    if (linkedX) {
      styles.paddingRight = styles.paddingLeft;
    }
  };
  const toggleLinkY = () => {
    linkedY = !linkedY;

    if (linkedY) {
      styles.paddingBottom = styles.paddingTop;
    }
  };

  const reset = () => {
    delete styles.padding;
    delete styles.paddingTop;
    delete styles.paddingRight;
    delete styles.paddingBottom;
    delete styles.paddingLeft;
  };
</script>

<Panel title="Padding" icon="padding" collapsible collapsed>
  <svelte:fragment slot="panel-head">
    {#if $styles.padding || $styles.paddingLeft || $styles.paddingRight || $styles.paddingTop || $styles.paddingBottom}
      <Icon clickable tooltip="Clear Paddings" class="mdr-10" active on:click={reset}>settings_backup_restore</Icon>
    {/if}
    <InputUnit name="padding"
               placeholder="auto"
               bind:value={$styles.padding}
               on:input={useLinked}></InputUnit>
  </svelte:fragment>
  <div class="kds-panel-section flex-row-center-y">
    <div class="kds-input-group mdr-12">
      <div class="kds-input flex-row-center-y">
        <span class="kds-panel-prop-label mdr-10 flex" use:i18n={'Left'}></span>
        <InputUnit name="left"
                   placeholder='auto'
                   bind:value={$styles.paddingLeft}
                   on:input={useCustom}></InputUnit>
      </div>
      <div class="flex-row-center-y mdy-4">
        <div class="flex"></div>
        <div class="flex-row-center mdr-16" style="width: 56px;">
          <Icon tooltip="Link left and right padding"
                clickable
                active={linkedX}
                on:click={toggleLinkX}>{linkedX ? 'link' : 'add_link'}</Icon>
        </div>
      </div>
      <div class="kds-input flex-row-center-y">
        <span class="kds-panel-prop-label mdr-10 flex" use:i18n={'Right'}></span>
        <InputUnit name="right"
                   placeholder='auto'
                   disabled={linkedX}
                   bind:value={$styles.paddingRight}
                   on:input={useCustom}></InputUnit>
      </div>
    </div>
    <div class="kds-input-group">
      <div class="kds-input flex-row-center-y">
        <span class="kds-panel-prop-label mdr-10 flex" use:i18n={'Top'}></span>
        <InputUnit name="top"
                   placeholder='auto'
                   bind:value={$styles.paddingTop}
                   on:input={useCustom}></InputUnit>
      </div>
      <div class="flex-row-center-y mdy-4">
        <div class="flex"></div>
        <div class="flex-row-center mdr-16" style="width: 56px;">
          <Icon tooltip="Link top and bottom padding"
                clickable
                active={linkedY}
                on:click={toggleLinkY}>{linkedY ? 'link' : 'add_link'}</Icon>
        </div>
      </div>
      <div class="kds-input flex-row-center-y">
        <span class="kds-panel-prop-label mdr-10 flex" use:i18n={'Bottom'}></span>
        <InputUnit name="bottom"
                   placeholder='auto'
                   disabled={linkedY}
                   bind:value={$styles.paddingBottom}
                   on:input={useCustom}></InputUnit>
      </div>
    </div>
  </div>
</Panel>
