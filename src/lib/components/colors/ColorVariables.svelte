<script lang="ts">
  import { reactive } from '@beerush/reactor';
  import { toast } from '@services/toast';
  import { copy } from '@utils/clipboard';
  import { type ColorInput, colorName, randomize, theme, toCssVar } from '@utils/colors';
  import { createEventDispatcher, onMount } from 'svelte';
  import Icon from '../common/Icon.svelte';
  import Input from './ColorInput.svelte';

  export let name = '';
  export let colors = reactive<ColorInput[]>([]);

  let className = '';
  export { className as class };

  const addColor = () => {
    const color = randomize();
    colors.push({
      name: '',
      color: color,
      darkColor: color,
    });
  };

  const copyCss = () => {
    const css = toCssVar([ { name, colors } ]);
    copy(css, 'CSS copied to clipboard.');
  };

  const dispatch = createEventDispatcher();
  const remove = () => {
    dispatch('remove');
  };

  const copyColor = (input: ColorInput) => {
    copy(colorName(name, input), 'Color copied to clipboard');
  };
  const removeColor = (input: ColorInput) => {
    toast
      .ask({
        title: 'Remove Color',
        subtitle: `Are you sure want to remove color: ${ colorName(name, input) }?`
      })
      .then(() => {
        colors.splice(colors.indexOf(input), 1);
      })
      .catch(() => {});
  };

  let nameInput: HTMLInputElement;
  onMount(() => {
    if ((!name || name === 'New Group') && nameInput) {
      nameInput.focus();
    }
  });
</script>
<div class="kds-color-variables {className}">
  <div class="kds-color-variables-head flex-row-center-y">
    <h6 contenteditable bind:innerHTML={name} bind:this={nameInput}>{name}</h6>
    <span class="kds-color-head-count">&nbsp;({$colors.length} Colors)</span>
    <span class="flex"></span>
    <Icon tooltip="Add Variable" yDir="above" clickable="true" on:click={addColor}>add</Icon>
    <Icon tooltip="Copy CSS" yDir="above" clickable="true" on:click={copyCss} class="mdl-10">code</Icon>
    <Icon tooltip="Remove Group" yDir="above" clickable="true" on:click={remove} class="mdl-10">delete</Icon>
  </div>
  {#if !$colors.length}
    <div class="empty-colors flex-column-center">
      <Icon size="medium">format_color_reset</Icon>
      <span class="mdt-10">Now lets add some color!</span>
    </div>
  {/if}
  {#each $colors as input}
    <div class="mdb-10 flex-row-center-y">
      <div class="flex">
        {#if $theme.darkMode}
          <Input group={name}
                 bind:name={input.name}
                 bind:value={input.darkColor}
                 bind:variable={input.darkVariable}></Input>
        {:else}
          <Input group={name}
                 bind:name={input.name}
                 bind:value={input.color}
                 bind:variable={input.variable}></Input>
        {/if}
      </div>
      <Icon clickable tooltip="Copy" class="mdl-10" on:click={() => copyColor(input)}>content_copy</Icon>
      <Icon clickable tooltip="Remove" class="mdl-10" on:click={() => removeColor(input)}>remove</Icon>
    </div>
  {/each}
</div>

<style lang="scss">
  .kds-color-variables-head {
    margin-bottom: 10px;
  }

  .empty-colors {
    background-color: rgba(0, 0, 0, 0.1);
    padding: var(--kds-space);
    border-radius: var(--kds-radius);
    color: var(--kds-color-subtitle);
    font-size: var(--kds-font-subtitle);
  }

  .kds-color-head-count {
    font-size: var(--kds-font-subtitle);
    font-weight: 500;
    color: var(--kds-color-subtitle);
    margin-left: 4px;
  }
</style>
