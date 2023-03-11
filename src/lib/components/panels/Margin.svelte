<script lang="ts">
  import { createStyles } from '@utils/panel';
  import Icon from '../common/Icon.svelte';
  import InputUnit from '../common/InputUnit.svelte';
  import Panel from '../common/Panel.svelte';

  export let styles = createStyles();

  let linkedX = false;
  let linkedY = false;

  const useLinked = () => {
    delete styles.marginLeft;
    delete styles.marginTop;
    delete styles.marginRight;
    delete styles.marginBottom;
  };
  const useCustom = (event: InputEvent) => {
    const { name } = event.detail as HTMLInputElement;

    switch (name) {
      case 'left':
        if (linkedX) {
          styles.marginRight = styles.marginLeft;
        }
        break;
      case 'top':
        if (linkedY) {
          styles.marginBottom = styles.marginTop;
        }
        break;
      default:
        break;
    }

    delete styles.margin;
  };

  const toggleLinkX = () => {
    linkedX = !linkedX;

    if (linkedX) {
      styles.marginRight = styles.marginLeft;
    }
  };
  const toggleLinkY = () => {
    linkedY = !linkedY;

    if (linkedY) {
      styles.marginBottom = styles.marginTop;
    }
  };

  const reset = () => {
    delete styles.margin;
    delete styles.marginTop;
    delete styles.marginRight;
    delete styles.marginBottom;
    delete styles.marginLeft;
  };
</script>

<Panel title="Margin" icon="margin" collapsible collapsed>
  <svelte:fragment slot="panel-head">
    {#if $styles.margin || $styles.marginLeft || $styles.marginRight || $styles.marginTop || $styles.marginBottom}
      <Icon clickable tooltip="Clear Margins" class="mdr-10" active on:click={reset}>settings_backup_restore</Icon>
    {/if}
    <InputUnit name="margin"
               placeholder="auto"
               bind:value={$styles.margin}
               on:input={useLinked}></InputUnit>
  </svelte:fragment>
  <div class="kanpas-panel-section flex-row-center-y">
    <div class="kanpas-input-group mdr-12">
      <div class="kanpas-input flex-row-center-y">
        <span class="kanpas-panel-prop-label mdr-10 flex">Left</span>
        <InputUnit name="left"
                   placeholder='auto'
                   bind:value={$styles.marginLeft}
                   on:input={useCustom}></InputUnit>
      </div>
      <div class="flex-row-center-y mdy-4">
        <div class="flex"></div>
        <div class="flex-row-center mdr-16" style="width: 56px;">
          <Icon tooltip="Link left and right margin"
                clickable
                active={linkedX}
                on:click={toggleLinkX}>{linkedX ? 'link' : 'add_link'}</Icon>
        </div>
      </div>
      <div class="kanpas-input flex-row-center-y">
        <span class="kanpas-panel-prop-label mdr-10 flex">Right</span>
        <InputUnit name="right"
                   placeholder='auto'
                   disabled={linkedX}
                   bind:value={$styles.marginRight}
                   on:input={useCustom}></InputUnit>
      </div>
    </div>
    <div class="kanpas-input-group">
      <div class="kanpas-input flex-row-center-y">
        <span class="kanpas-panel-prop-label mdr-10 flex">Top</span>
        <InputUnit name="top"
                   placeholder='auto'
                   bind:value={$styles.marginTop}
                   on:input={useCustom}></InputUnit>
      </div>
      <div class="flex-row-center-y mdy-4">
        <div class="flex"></div>
        <div class="flex-row-center mdr-16" style="width: 56px;">
          <Icon tooltip="Link top and bottom margin"
                clickable
                active={linkedY}
                on:click={toggleLinkY}>{linkedY ? 'link' : 'add_link'}</Icon>
        </div>
      </div>
      <div class="kanpas-input flex-row-center-y">
        <span class="kanpas-panel-prop-label mdr-10 flex">Bottom</span>
        <InputUnit name="bottom"
                   placeholder='auto'
                   disabled={linkedY}
                   bind:value={$styles.marginBottom}
                   on:input={useCustom}></InputUnit>
      </div>
    </div>
  </div>
</Panel>
