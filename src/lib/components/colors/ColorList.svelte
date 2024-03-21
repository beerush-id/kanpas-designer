<script lang="ts">
  import { reactive } from '@beerush/reactor';
  import { toast } from '@services/toast';
  import { copy } from '@utils/clipboard';
  import { type ColorInput, createToken, randomize, replaceSwatches, theme, toCssVar } from '@utils/colors';
  import { createEventDispatcher, onMount } from 'svelte';
  import Icon from '../common/Icon.svelte';
  import PopUp from '../common/PopUp.svelte';
  import ColorPaletteInput from './ColorPaletteInput.svelte';

  const dispatch = createEventDispatcher();

  let className = '';
  export { className as class };

  export let name = '';
  export let color = '';
  export let colors = reactive<ColorInput[]>([]);
  export let monotone = false;
  export let inheritable = false;

  const addColor = () => {
    colors.push({
      name: '',
      color: color || randomize('light'),
      darkColor: color || randomize('dark'),
    });
  };

  const remColor = (item: ColorInput) => {
    toast
      .ask({
        title: 'Remove Color',
        subtitle: `Are you sure want to remove color: ${ item.name || item.color }?`,
        icon: 'warning',
      })
      .then(() => {
        colors.splice(colors.indexOf(item), 1);
        toast.info({
          subtitle: 'Color removed',
        });
      })
      .catch(() => null);
  };

  const regenerateColors = () => {
    replaceSwatches(color, colors);
  };

  const copyCss = () => {
    const css = toCssVar([ { name, color, colors } ]);
    copy(css, 'CSS copied to clipboard.');
  };

  const copyToken = () => {
    const tokens = createToken([ { name, color, colors } ]);
    copy(tokens[0], 'Token copied to clipboard.');
  };

  const copyColor = (group: ColorInput) => {
    if (monotone) {
      if (group.darkColor !== group.color) {
        group.darkColor = group.color;
      }

      if (group.darkVariable !== group.variable) {
        group.darkVariable = group.variable;
      }
    }
  };

  let nameInput: HTMLHeadingElement;
  onMount(() => {
    if (!name && nameInput) {
      setTimeout(() => {
        nameInput.focus();
      }, 50);
    }
  });
</script>

<div class="kds-color-list {className}">
  <div class="kds-color-head flex-row-center-y">
    {#if color}
      <div class="kds-color-view" style="background-color: {color}">
        <input type="color" bind:value={color} on:input={regenerateColors} />
        <PopUp>Change Base Color</PopUp>
      </div>
    {/if}
    <h6 class="kds-color-name" contenteditable bind:innerHTML={name} bind:this={nameInput}></h6>
    <span class="kds-color-head-count">&nbsp;({$colors?.length} Colors)</span>
    <span class="flex"></span>
    <Icon
      clickable
      xDir="between"
      yDir="above"
      tooltip="Add Color"
      on:click={addColor}
      class="mdl-10">add
    </Icon>
    <Icon clickable xDir="between" yDir="above" tooltip="Copy CSS" on:click={copyCss} class="mdl-10">code
    </Icon>
    <Icon clickable xDir="between" yDir="above" tooltip="Copy Token" on:click={copyToken} class="mdl-10">data_object
    </Icon>
    <Icon
      clickable
      xDir="between"
      yDir="above"
      tooltip="Remove Palette"
      on:click={() => dispatch('remove', name)}
      class="mdl-10">delete
    </Icon>
  </div>
  <div class="kds-color-group flex-row">
    {#if $colors}
      {#each $colors as group}
        {#if $theme?.scheme === 'light' || monotone}
          <ColorPaletteInput
            parent={name}
            {inheritable}
            bind:name={group.name}
            bind:value={group.color}
            bind:variable={group.variable}
            on:delete={() => remColor(group)}
            on:input={() => copyColor(group)} />
        {:else}
          <ColorPaletteInput
            parent={name}
            {inheritable}
            bind:name={group.name}
            bind:value={group.darkColor}
            bind:variable={group.darkVariable}
            on:delete={() => remColor(group)} />
        {/if}
      {/each}
    {/if}
  </div>
</div>

<style lang="scss">
  .kds-color-head {
    margin-bottom: 10px;
    line-height: 1;
  }

  .kds-color-view {
    width: 16px;
    height: 16px;
    margin-right: 8px;
    border-radius: 50%;

    input {
      width: 100%;
      height: 100%;
      opacity: 0;
    }
  }

  .kds-color-head-count {
    font-size: var(--kds-font-subtitle);
    font-weight: 500;
    color: var(--kds-color-subtitle);
    margin-left: 4px;
  }

  .kds-color-group {
    width: 100%;
    border-radius: var(--kds-radius);
    box-shadow: 0 0 0 2px var(--kds-color-shadow);
  }
</style>
