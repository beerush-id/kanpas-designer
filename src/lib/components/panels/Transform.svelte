<script lang="ts">
  import Icon from '@components/common/Icon.svelte';
  import InputUnit from '@components/common/InputUnit.svelte';
  import Panel from '@components/common/Panel.svelte';
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

  const properties = [
    {
      key: 'translate',
      label: 'Translate',
      unit: '%',
      inputs: [ 'x', 'y', 'z' ]
    },
    {
      key: 'rotate',
      label: 'Rotation',
      unit: 'deg',
      min: -360,
      max: 360,
      inputs: [ 'x', 'y', 'z' ]
    },
    {
      key: 'scale',
      label: 'Scale',
      unit: '',
      inputs: [ 'x', 'y', 'z' ]
    },
    {
      key: 'skew',
      label: 'Skew',
      unit: 'deg',
      min: -360,
      max: 360,
      inputs: [ 'x', 'y' ]
    },
  ];
</script>

<Panel icon="transform" title="Transform" collapsible collapsed={!$styles.transform}>
  <svelte:fragment slot="panel-head">
    {#if $styles.transform}
      <Icon clickable tooltip="Reset Transforms" class="mdl-10"
            on:click={resetTransforms}>settings_backup_restore
      </Icon>
    {/if}
  </svelte:fragment>
  <div class="kds-panel-section flex-row-center-y">
    <div class="kds-panel-prop-label flex">Origin</div>
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
  {#each properties as prop}
    <div class="kds-panel-section flex-row-center-y">
      <div class="kds-panel-prop-label flex">{prop.label}</div>
      {#each prop.inputs as input}
        <InputUnit unit={prop.unit} min={prop.min} max={prop.max}
                   class="mdl-4 small"
                   placeholder={input}
                   bind:value={$options[prop.key][input]}
                   on:input={transform}></InputUnit>
      {/each}
      <Icon clickable tooltip="Revert" class="mdl-10"
            on:click={() => reset(prop.key)}>settings_backup_restore
      </Icon>
    </div>
  {/each}
  <div class="kds-panel-section flex-row-center-y">
    <div class="kds-panel-prop-label flex">Style</div>
    <select bind:value={$styles.transformStyle}>
      <option value={undefined}>Default</option>
      <option value="flat">Flat</option>
      <option value="preserve-3d">Preserve 3D</option>
    </select>
    <Icon clickable tooltip="Revert" class="mdl-10"
          on:click={() => delete styles.transformStyle}>settings_backup_restore
    </Icon>
  </div>
</Panel>

<style lang="scss">
  .origin-box {
    width: 56px;
    height: 56px;
    border: 1px solid var(--kds-color-input-line);
    position: relative;
    user-select: none;
  }

  .origin-point {
    width: 8px;
    height: 8px;
    border: 1px solid var(--kds-color-input-line-active);
    border-radius: 50%;
    position: absolute;
    transform: translate3d(-50%, -50%, 0);
    pointer-events: none;

    &:before, &:after {
      content: "";
      display: block;
      background-color: var(--kds-color-input-line-active);
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
