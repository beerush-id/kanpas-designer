<script lang="ts">
  import ColorPickerTrigger from '@components/colors/ColorPickerTrigger.svelte';
  import Icon from '@components/common/Icon.svelte';
  import Panel from '@components/common/Panel.svelte';
  import PopUp from '@components/common/PopUp.svelte';
  import { randomize } from '@utils/colors';
  import { createOptions, createStyles, type Gradient, type GradientValue, joinBackgrounds } from '@utils/panel';
  import { capitalize } from '@utils/string.js';

  export let styles = createStyles();
  export let options = createOptions();

  const shapes = [ 'circle', 'ellipse', 'closest-side', 'closest-corner', 'farthest-side', 'farthest-corner' ];

  const add = () => {
    const grad: Gradient = {
      type: 'linear',
      angle: 90,
      shape: 'circle',
      values: [
        {
          stop: 0,
          color: '#000'
        },
        {
          stop: 100,
          color: '#fff'
        }
      ]
    };

    options.gradients.push(grad);
    updateCssValues();
  };

  const rem = (grad: Gradient) => {
    options.gradients.splice(options.gradients.indexOf(grad), 1);
    updateCssValues();
  };

  const clear = () => {
    options.gradients = [];
    updateCssValues();
  };

  const toggleMode = (grad: Gradient) => {
    grad.type = grad.type === 'linear' ? 'radial' : 'linear';
    updateCssValues();
  };

  const updateCssValues = () => {
    styles.backgroundImage = joinBackgrounds(options);
  };

  const addStep = (e: MouseEvent, grad: Gradient) => {
    const { offsetX } = e;
    const { offsetWidth } = e.target;

    grad.values.push({
      color: randomize(),
      stop: Math.round((offsetX / offsetWidth) * 100),
    });

    updateCssValues();
  };

  const remStep = (grad: Gradient, step: GradientValue) => {
    grad.values.splice(grad.values.indexOf(step), 1);

    updateCssValues();
  };
</script>

<Panel icon="gradient"
       title="Gradient"
       collapsible
       collapsed={!$options.gradients.length}>
  <svelte:fragment slot="panel-head">
    {#if $options.gradients.length}
      <Icon clickable tooltip="Clear Gradients" class="mdr-10" active
            on:click={clear}>settings_backup_restore
      </Icon>
    {/if}
    <Icon clickable tooltip="Add Gradient" on:click={add}>add</Icon>
  </svelte:fragment>
  {#each $options.gradients as grad}
    <div class="kds-panel-section flex-row-center-y">
      <Icon clickable
            tooltip={grad.type === 'linear' ? 'Switch to Radial' : 'Switch to Linear'}
            class="mdr-16" on:click={() => toggleMode(grad)}>{grad.type === 'linear' ? 'contrast' : 'blur_on'}</Icon>
      <div class="gradient-preview flex"
           style:background-image={grad.value} on:click={e => addStep(e, grad)} on:keypress>
        {#each grad.values as step}
          <div class="gradient-step"
               style:left="{step.stop}%"
               style:background-color={step.color}
               on:click|stopPropagation on:keypress>
            <ColorPickerTrigger
              bind:value={step.color}
              bind:variable={step.variable}
              on:change={updateCssValues}></ColorPickerTrigger>
            <PopUp role="popup" xDir="between" yDir="above">
              <div class="flex-row-center-y">
                <input type="number"
                       min="0"
                       max="100"
                       bind:value={step.stop}
                       on:input={updateCssValues} style:width="52px">
                <span class="mdl-4 kds-prop-unit">%</span>
                <Icon clickable tooltip="Remove" class="mdl-10"
                      on:click={() => remStep(grad,step)}>delete
                </Icon>
              </div>
            </PopUp>
          </div>
        {/each}
      </div>
      {#if grad.type === 'linear'}
        <input type="number"
               placeholder="Angle"
               max="360"
               class="mdl-16"
               style:width="52px"
               bind:value={grad.angle}
               on:input={updateCssValues}/>
        <span class="mdl-4 kds-prop-unit">deg</span>
      {:else}
        <select class="mdl-16" bind:value={grad.shape} on:change={updateCssValues} style:width="80px">
          {#each shapes as shape}
            <option value={shape}>{capitalize(shape)}</option>
          {/each}
        </select>
      {/if}
      <Icon clickable tooltip="Remove" class="mdl-10" on:click={() => rem(grad)}>remove</Icon>
    </div>
  {/each}
</Panel>

<style lang="scss">
  .gradient-preview {
    height: 24px;
    border: 1px solid var(--kds-color-input-line);
    border-radius: var(--kds-radius-small);
    position: relative;
    z-index: 0;

    &:hover {
      z-index: 1;
    }
  }

  .kds-prop-unit {
    font-size: var(--kds-font-subtitle);
    opacity: 0.5;
  }

  .gradient-step {
    width: 6px;
    height: calc(100% + 8px);
    position: absolute;
    top: -4px;
    margin-left: -3px;
    border-radius: 3px;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.3);
  }

  :global(.gradient-step .kds-color-picker-trigger) {
    top: 50%;
    left: 50%;
    opacity: 0;
    transform: translate3d(-50%, -50%, 0);
  }
</style>
