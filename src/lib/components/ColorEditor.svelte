<script lang="ts">
  import ThemeSwitch from '@components/ThemeSwitch.svelte';
  import { toast } from '@services/toast';
  import { copy } from '@utils/clipboard';
  import {
    type ColorInputGroup,
    createSwatches,
    createToken,
    randomize,
    states,
    swatches,
    toCssVar,
    variables,
  } from '@utils/colors';
  import ColorList from './colors/ColorList.svelte';
  import ColorVariables from './colors/ColorVariables.svelte';
  import Icon from './common/Icon.svelte';

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
      .catch(() => {});
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
      .catch(() => {});
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
      .catch(() => {});
  };

  const copyCss = (fromList: ColorInputGroup[] = swatches) => {
    const css = toCssVar([ ...fromList ]);
    copy(css, 'CSS copied to clipboard.');
  };
  const copyToken = (name: string, items: ColorInputGroup[]) => {
    name = name.toLowerCase();
    const tokens = createToken(items, name);
    copy({
      name,
      type: 'color',
      tags: ['color', 'theme'],
      tokens
    }, 'Token copied to clipboard.');
  }
</script>
<div class="full-height flex-row kds-reset">
  <div class="color-variables p-2 kds-scroll-y">
    <h3 class="flex-row-center-y mdb-24">
      <Icon class="mdr-10" size="medium">css</Icon>
      <span class="flex">Variables</span>
      <ThemeSwitch role="toggle" size="medium" class="mdr-16"/>
      <Icon clickable
            size="medium"
            tooltip="Add Group"
            xDir="between"
            yDir="above"
            on:click={addGroup}>add
      </Icon>
      <Icon clickable
            size="medium"
            tooltip="Copy CSS"
            xDir="between"
            yDir="above"
            class="mdl-16"
            on:click={() => copyCss(variables)}>code
      </Icon>
      <Icon clickable
            size="medium"
            tooltip="Copy Token"
            xDir="between"
            yDir="above"
            class="mdl-16"
            on:click={() => copyToken('color', [...$swatches, ...$variables, ...$states])}>data_object
      </Icon>
    </h3>
    {#each $variables as custom}
      <ColorVariables class="mdb-24"
                      bind:name={custom.name}
                      bind:colors={custom.colors}
                      on:remove={() => removeGroup(custom)}></ColorVariables>
    {/each}
  </div>
  <div class="flex kds-scroll-y p-2">
    <div class="kds-color-palettes kds-reset">
      <h3 class="flex-row-center-y mdb-24">
        <Icon class="mdr-10" size="medium">smart_button</Icon>
        <span class="flex">State Colors</span>
        <Icon clickable
              size="medium"
              tooltip="Add State"
              xDir="between"
              yDir="above"
              on:click={addState}>add
        </Icon>
        <Icon clickable
              size="medium"
              tooltip="Copy CSS"
              xDir="between"
              yDir="above"
              class="mdl-16"
              on:click={() => copyCss(states)}>code
        </Icon>
        <Icon clickable
              size="medium"
              tooltip="Copy Token"
              xDir="between"
              yDir="above"
              class="mdl-16"
              on:click={() => copyToken('state', $states)}>data_object
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
    <div class="kds-color-palettes kds-reset">
      <h3 class="flex-row-center-y mdb-24">
        <Icon class="mdr-10" size="medium">style</Icon>
        <span class="flex">Color Palettes</span>
        <Icon clickable
              size="medium"
              tooltip="Add Palette"
              xDir="between"
              yDir="above"
              on:click={addPalette}>add
        </Icon>
        <Icon clickable
              size="medium"
              tooltip="Copy CSS"
              xDir="between"
              yDir="above"
              class="mdl-16"
              on:click={() => copyCss(swatches)}>code
        </Icon>
        <Icon clickable
              size="medium"
              tooltip="Copy Token"
              xDir="between"
              yDir="above"
              class="mdl-16"
              on:click={() => copyToken('palette', $swatches)}>data_object
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
<style>
  .color-variables {
    width: 380px;
  }
</style>
