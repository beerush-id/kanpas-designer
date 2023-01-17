<script lang="ts">
  import Icon from '@components/common/Icon.svelte';
  import InputUnit from '@components/common/InputUnit.svelte';
  import Panel from '@components/common/Panel.svelte';
  import Range from '@components/common/Range.svelte';
  import { createOptions, createStyles, joinTransforms } from '@utils/panel';

  export let styles = createStyles();
  export let options = createOptions();

  let oDrag = false;

  const orgStart = (e: MouseEvent) => {
    oDrag = true;
    orgPos(e);
  };
  const orgMove = (e: MouseEvent) => {
    if (oDrag) {
      orgPos(e);
    }
  };
  const orgEnd = (e: MouseEvent) => {
    if (oDrag) {
      oDrag = false;
      orgPos(e, true);
    }
  };

  const orgPos = (e: MouseEvent, snap?: boolean) => {
    const { offsetX, offsetY } = e;
    const { offsetWidth, offsetHeight } = e.target as HTMLElement;

    let x = Math.round(((offsetX < 0 ? 0 : offsetX) / offsetWidth) * 100);
    let y = Math.round(((offsetY < 0 ? 0 : offsetY) / offsetHeight) * 100);

    if (x <= 53 && x >= 47) {
      x = 50;
    }

    if (y <= 53 && y >= 47) {
      y = 50;
    }

    if (snap) {
      if (x <= 5) {
        x = 0;
      } else if (x >= 95) {
        x = 100;
      }

      if (y <= 5) {
        y = 0;
      } else if (y >= 95) {
        y = 100;
      }
    }

    options.origin.x = `${ x }%`;
    options.origin.y = `${ y }%`;

    styles.transformOrigin = `${ x }% ${ y }%`;
  };

  const orgReset = () => {
    delete options.origin.x;
    delete options.origin.y;
    delete styles.transformOrigin;
  };

  const transform = () => {
    styles.transform = joinTransforms(options);
  };

  const reset = (key: 'scale' | 'rotate' | 'translate' | 'skew') => {
    delete options[key].x;
    delete options[key].y;
    delete options[key].z;

    transform();
  };

  const resetTransforms = () => {
    for (const key of [ 'scale', 'rotate', 'translate', 'skew' ]) {
      delete options[key].x;
      delete options[key].y;
      delete options[key].z;
    }

    transform();
  };
</script>

<Panel icon="transform" title="Transform" collapsible collapsed={!$styles.transform}>
  <svelte:fragment slot="panel-head">
    {#if $styles.transform}
      <Icon clickable tooltip="Reset Transforms" class="mdl-10"
            on:click={resetTransforms}>settings_backup_restore
      </Icon>
    {/if}
  </svelte:fragment>
  <div class="kanpas-panel-section flex-row-center-y">
    <div class="kanpas-panel-prop-label flex">Origin</div>
    <span class="flex"></span>
    <div class="origin-box"
         on:mousedown={orgStart}
         on:mousemove={orgMove}
         on:mouseup={orgEnd}
         on:mouseleave={orgEnd}>
      <div class="origin-point" style:left="{$options.origin.x||'50%'}" style:top="{$options.origin.y||'50%'}"></div>
    </div>
    <div class="flex-column-center mdl-10">
      <InputUnit unit="%" placeholder="x" bind:value={$options.origin.x}></InputUnit>
      <span class="mdy-4"></span>
      <InputUnit unit="%" placeholder="y" bind:value={$options.origin.y}></InputUnit>
    </div>
    <Icon clickable tooltip="Revert" class="mdl-10"
          on:click={orgReset}>settings_backup_restore
    </Icon>
  </div>
  <div class="kanpas-panel-section flex-row-center-y">
    <div class="kanpas-panel-prop-label flex">Translate</div>
    <InputUnit unit="%"
               class="mdl-4 small"
               placeholder="x"
               bind:value={$options.translate.x}
               on:input={transform}></InputUnit>
    <InputUnit unit="%"
               class="mdl-4 small"
               placeholder="y"
               bind:value={$options.translate.y}
               on:input={transform}></InputUnit>
    <InputUnit unit="%"
               class="mdl-4 small"
               placeholder="z"
               bind:value={$options.translate.z}
               on:input={transform}></InputUnit>
    <Icon clickable tooltip="Revert" class="mdl-10"
          on:click={() => reset('translate')}>settings_backup_restore
    </Icon>
  </div>
  <div class="kanpas-panel-section flex-row-center-y">
    <div class="kanpas-panel-prop-label flex">Rotation</div>
    <InputUnit unit="deg"
               class="mdl-4 small"
               placeholder="x"
               bind:value={$options.rotate.x}
               on:input={transform}></InputUnit>
    <InputUnit unit="deg"
               class="mdl-4 small"
               placeholder="y"
               bind:value={$options.rotate.y}
               on:input={transform}></InputUnit>
    <InputUnit unit="deg"
               class="mdl-4 small"
               placeholder="z"
               bind:value={$options.rotate.z}
               on:input={transform}></InputUnit>
    <Icon clickable tooltip="Revert" class="mdl-10"
          on:click={() => reset('rotate')}>settings_backup_restore
    </Icon>
  </div>
  <div class="kanpas-panel-section flex-row-center-y">
    <div class="kanpas-panel-prop-label flex">Scale</div>
    <InputUnit unit="" min="0" step={0.1}
               class="mdl-4 small"
               placeholder="x"
               bind:value={$options.scale.x}
               on:input={transform}></InputUnit>
    <InputUnit unit="" min="0" step={0.1}
               class="mdl-4 small"
               placeholder="y"
               bind:value={$options.scale.y}
               on:input={transform}></InputUnit>
    <InputUnit unit="" min="0" step={0.1}
               class="mdl-4 small"
               placeholder="z"
               bind:value={$options.scale.z}
               on:input={transform}></InputUnit>
    <Icon clickable tooltip="Revert" class="mdl-10"
          on:click={() => reset('scale')}>settings_backup_restore
    </Icon>
  </div>
  <div class="kanpas-panel-section flex-row-center-y">
    <div class="kanpas-panel-prop-label flex">Scew</div>
    <InputUnit unit="deg"
               class="mdl-4 small"
               placeholder="x"
               bind:value={$options.skew.x}
               on:input={transform}></InputUnit>
    <InputUnit unit="deg"
               class="mdl-4 small"
               placeholder="y"
               bind:value={$options.skew.y}
               on:input={transform}></InputUnit>
    <Icon clickable tooltip="Revert" class="mdl-10"
          on:click={() => reset('skew')}>settings_backup_restore
    </Icon>
  </div>
</Panel>

<style lang="scss">
  .origin-box {
    width: 56px;
    height: 56px;
    border: 1px solid var(--kanpas-color-input-line);
    position: relative;
    user-select: none;
  }

  .origin-point {
    width: 8px;
    height: 8px;
    border: 1px solid var(--kanpas-color-input-line-active);
    border-radius: 50%;
    position: absolute;
    transform: translate3d(-50%, -50%, 0);
    pointer-events: none;

    &:before, &:after {
      content: "";
      display: block;
      background-color: var(--kanpas-color-input-line-active);
      position: absolute;
    }

    &:before {
      top: 50%;
      left: -5px;
      transform: translate3d(0, -50%, 0);
      width: calc(100% + 10px);
      height: 2px;
    }

    &:after {
      height: calc(100% + 10px);
      width: 2px;
      left: 50%;
      transform: translate3d(-50%, 0, 0);
      top: -5px;
    }
  }
</style>
