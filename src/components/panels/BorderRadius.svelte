<script lang="ts">
  import { createStyles } from '@utils/panel';
  import Icon from '../common/Icon.svelte';
  import InputUnit from '../common/InputUnit.svelte';
  import Panel from '../common/Panel.svelte';

  export let styles = createStyles();

  let linkedX = false;
  let linkedY = false;

  const useLinked = () => {
    delete styles.borderTopLeftRadius;
    delete styles.borderTopRightRadius;
    delete styles.borderBottomRightRadius;
    delete styles.borderBottomLeftRadius;
  };
  const useCustom = (event: InputEvent) => {
    const { name, value } = event.detail as HTMLInputElement;

    switch (name) {
      case 'top-left':
        if (linkedX) {
          styles.borderTopLeftRadius = value;
        }
        break;
      case 'top-right':
        if (linkedY) {
          styles.borderTopRightRadius = value;
        }
        break;
      case 'bottom-left':
        if (linkedX) {
          styles.borderBottomLeftRadius = value;
        }
        break;
      case 'bottom-right':
        if (linkedY) {
          styles.borderBottomRightRadius = value;
        }
        break;
      default:
        break;
    }

    delete styles.borderRadius;
  };

  const toggleLinkX = () => {
    linkedX = !linkedX;
  };
  const toggleLinkY = () => {
    linkedY = !linkedY;
  };

  const reset = () => {
    delete styles.borderRadius;
    delete styles.borderTopLeftRadius;
    delete styles.borderTopRightRadius;
    delete styles.borderBottomRightRadius;
    delete styles.borderBottomLeftRadius;
  };
</script>

<Panel title="Border Radius" icon="rounded_corner" collapsible collapsed>
  <svelte:fragment slot="panel-head">
    {#if $styles.borderRadius || $styles.borderBottomLeftRadius || $styles.borderTopRightRadius || $styles.borderTopLeftRadius || $styles.borderBottomRightRadius}
      <Icon clickable tooltip="Clear Radius" class="mdr-10" active on:click={reset}>settings_backup_restore</Icon>
    {/if}
    <InputUnit name="border-radius"
               placeholder="auto"
               bind:value={$styles.borderRadius}
               on:input={useLinked}></InputUnit>
  </svelte:fragment>
  <div class="kanpas-panel-section flex-row-center-y" style="height: 150px">
    <div class="kanpas-input-group">
      <div class="kanpas-input flex-row-center-y">
        <InputUnit name="top-left"
                   placeholder="auto"
                   bind:value={$styles.borderTopLeftRadius}
                   on:input={useCustom}></InputUnit>
      </div>
      <div class="flex-row-center mdy-16">
        <div class="flex-row-center mdr-4" style="width: 56px;">
          <Icon tooltip="Link top-left and bottom-left radius"
                clickable
                active={linkedX}
                on:click={toggleLinkX}>{linkedX ? 'link' : 'add_link'}</Icon>
        </div>
      </div>
      <div class="kanpas-input flex-row-center-y">
        <InputUnit name="bottom-left"
                   placeholder="auto"
                   bind:value={$styles.borderBottomLeftRadius}
                   on:input={useCustom}></InputUnit>
      </div>
    </div>
    <div class="flex flex-column-center-x pdy-2" style="height: 100%">
      <Icon tooltip="Link top-left and top-right radius"
            clickable
            active={linkedY}
            on:click={toggleLinkY}>{linkedY ? 'link' : 'add_link'}</Icon>
      <div class="flex"></div>
      <Icon tooltip="Link bottom-left and bottom-right radius"
            clickable
            active={linkedY}
            on:click={toggleLinkY}>{linkedY ? 'link' : 'add_link'}</Icon>
    </div>
    <div class="kanpas-input-group">
      <div class="kanpas-input flex-row-center-y">
        <InputUnit name="top-right"
                   placeholder="auto"
                   bind:value={$styles.borderTopRightRadius}
                   on:input={useCustom}></InputUnit>
      </div>
      <div class="flex-row-center mdy-16">
        <div class="flex-row-center mdl-6" style="width: 56px;">
          <Icon tooltip="Link top-right and bottom-right radius"
                clickable
                active={linkedY}
                on:click={toggleLinkY}>{linkedY ? 'link' : 'add_link'}</Icon>
        </div>
      </div>
      <div class="kanpas-input flex-row-center-y">
        <InputUnit name="bottom-right"
                   placeholder="auto"
                   bind:value={$styles.borderBottomRightRadius}
                   on:input={useCustom}></InputUnit>
      </div>
    </div>
  </div>
</Panel>
<style lang="scss">
  .kanpas-panel-section {
    position: relative;
    width: 200px;
    margin: 0 auto;

    &:before {
      content: "";
      display: block;
      width: calc(100% - 74px);
      height: calc(100% - 24px);
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      border: 1px solid var(--kanpas-color-line);
      border-radius: var(--kanpas-radius-large);
    }
  }
</style>
