<script lang="ts">
  import Canvas from '@components/Canvas.svelte';
  import CanvasSwitch from '@components/CanvasSwitch.svelte';
  import ColorList from '@components/colors/ColorList.svelte';
  import ColorVariables from '@components/colors/ColorVariables.svelte';
  import Icon from '@components/common/Icon.svelte';
  import ImmersiveOption from '@components/common/ImmersiveOption.svelte';
  import Portal from '@components/common/Portal.svelte';
  import Mockup from '@components/Mockup.svelte';
  import MockupSwitch from '@components/MockupSwitch.svelte';

  import { mockup } from '@services/mockup';
  import { toast } from '@services/toast';
  import { copy } from '@utils/clipboard';
  import {
    type ColorInputGroup,
    createSwatches,
    randomize,
    states,
    swatches,
    toCssVar,
    variables
  } from '@utils/colors';

  mockup.use('laptop');

  const addGroup = () => {
    variables.push({
      name: '',
      colors: []
    });
  };

  const removeGroup = (group) => {
    toast
      .ask({
        title: 'Remove Variable Group',
        subtitle: `Are you sure want to remove the variable group?`,
        icon: 'warning'
      })
      .then(() => {
        variables.splice(variables.indexOf(group), 1);
        toast.info({ subtitle: 'Variable group removed.' });
      })
      .catch(() => null);
  };

  const addState = () => {
    const color = randomize();
    states.push({
      color,
      name: '',
      colors: createSwatches(color, [ 'normal', 'hover', 'active', 'disabled' ])
    });
  };

  const removeState = (state) => {
    toast
      .ask({
        title: 'Remove State Palette',
        subtitle: `Are you sure want to remove color state palette: ${ state.name }?`,
        icon: 'warning'
      })
      .then(() => {
        states.splice(states.indexOf(state), 1);
        toast.info({ subtitle: 'Color state palette removed.' });
      })
      .catch(() => null);
  };

  const addPalette = () => {
    const color = randomize();
    swatches.push({
      color,
      name: '',
      colors: createSwatches(color)
    });
  };

  const removePalette = (group) => {
    toast
      .ask({
        title: 'Remove Palette',
        subtitle: `Are you sure want to remove color palette: ${ group.name }?`,
        icon: 'warning'
      })
      .then(() => {
        swatches.splice(swatches.indexOf(group), 1);
        toast.info({ subtitle: 'Color palette removed.' });
      })
      .catch(() => null);
  };

  const copyCss = (fromList: ColorInputGroup[] = swatches) => {
    const css = toCssVar([ ...fromList ]);
    copy(css, 'CSS copied to clipboard.');
  };

  const copyAllCss = () => {
    const css = toCssVar([ ...swatches, ...states, ...variables ]);
    copy(css, 'CSS copied to clipboard');
  };
</script>

<ImmersiveOption title="Colors" collapsible></ImmersiveOption>
<Portal slot="#immersive-header">
  <div class="flex-row-center-y">
    <CanvasSwitch></CanvasSwitch>
    <div class="mdr-24"></div>
    <MockupSwitch>
      <Icon width="48" height="40" clickable tooltip="Copy All CSS" on:click={copyAllCss}>css</Icon>
      <div class="kanpas-separator-y"></div>
    </MockupSwitch>
  </div>
</Portal>
<Canvas>
  <Mockup viewport="desktop">
    <div class="full-height flex-row kanpas-reset">
      <div class="color-variables p-2 kanpas-scroll-y">
        <h3 class="flex-row-center-y mdb-24">
          <Icon class="mdr-10" size="medium">css</Icon>
          <span class="flex">Variables</span>
          <Icon clickable="true"
                size="medium"
                tooltip="Add Group"
                xDir="between"
                yDir="above"
                on:click={addGroup}>add
          </Icon>
          <Icon clickable="true"
                size="medium"
                tooltip="Copy CSS"
                xDir="between"
                yDir="above"
                class="mdl-16"
                on:click={() => copyCss(variables)}>code
          </Icon>
        </h3>
        {#each $variables as custom}
          <ColorVariables class="mdb-24"
                          bind:name={custom.name}
                          bind:colors={custom.colors}
                          on:remove={() => removeGroup(custom)}></ColorVariables>
        {/each}
      </div>
      <div class="flex kanpas-scroll-y p-2">
        <div class="kanpas-color-palettes kanpas-reset">
          <h3 class="flex-row-center-y mdb-24">
            <Icon class="mdr-10" size="medium">smart_button</Icon>
            <span class="flex">State Colors</span>
            <Icon clickable="true"
                  size="medium"
                  tooltip="Add State"
                  xDir="between"
                  yDir="above"
                  on:click={addState}>add
            </Icon>
            <Icon clickable="true"
                  size="medium"
                  tooltip="Copy CSS"
                  xDir="between"
                  yDir="above"
                  class="mdl-16"
                  on:click={() => copyCss(states)}>code
            </Icon>
          </h3>
          {#each $states as group}
            <ColorList class="mb-2" inheritable
                       bind:name={group.name}
                       bind:color={group.color}
                       bind:colors={group.colors}
                       on:remove={() => removeState(group)}></ColorList>
          {/each}
        </div>
        <div class="kanpas-color-palettes kanpas-reset">
          <h3 class="flex-row-center-y mdb-24">
            <Icon class="mdr-10" size="medium">style</Icon>
            <span class="flex">Color Palettes</span>
            <Icon clickable="true"
                  size="medium"
                  tooltip="Add Palette"
                  xDir="between"
                  yDir="above"
                  on:click={addPalette}>add
            </Icon>
            <Icon clickable="true"
                  size="medium"
                  tooltip="Copy CSS"
                  xDir="between"
                  yDir="above"
                  class="mdl-16"
                  on:click={() => copyCss(swatches)}>code
            </Icon>
          </h3>
          {#each $swatches as group}
            <ColorList class="mb-2" monotone
                       bind:name={group.name}
                       bind:color={group.color}
                       bind:colors={group.colors}
                       on:remove={() => removePalette(group)}></ColorList>
          {/each}
        </div>
      </div>
    </div>
  </Mockup>
</Canvas>
<style>
  .color-variables {
    width: 380px;
  }
</style>
