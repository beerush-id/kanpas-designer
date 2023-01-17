<script lang="ts">
  import Icon from '@components/common/Icon.svelte';
  import props from '@data/css-properties.json';
  import { createStyles } from '@utils/panel';
  import { camelize } from '@utils/string';
  import Panel from './common/Panel.svelte';

  export let styles = createStyles();
  let selectedProp;
  let selectedOptn;
  let selectedValue;

  const selectProp = () => {
    if (props[selectedProp]) {
      selectedOptn = props[selectedProp];
    } else {
      selectedOptn = undefined;
      selectedValue = undefined;
    }
  };

  const addProp = () => {
    if (selectedProp && selectedValue) {
      const prop = camelize(selectedProp);

      if (!styles[prop]) {
        styles[prop] = selectedValue;
        selectedProp = undefined;
        selectedOptn = null;
        selectedValue = undefined;
      }
    }
  };

  const inputKeyUp = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      addProp();
    }
  };
</script>
<Panel title="Add Property">
  <svelte:fragment slot="panel-head">
    <div class="flex"></div>
    <Icon clickable tooltip="Add" on:click={addProp}>playlist_add</Icon>
  </svelte:fragment>
  <div class="kanpas-panel-section flex-row-center-y">
    <select name="property" class="mdr-4" bind:value={selectedProp} on:change={selectProp}>
      <option value={undefined}>Select Property</option>
      {#each Object.entries(props) as [ prop, opt ]}
        <option value={prop}>{prop}</option>
      {/each}
    </select>
    <input type="text"
           placeholder="value"
           name="css-value"
           class="flex"
           bind:value={selectedValue}
           on:keyup={inputKeyUp}>
  </div>
  {#if selectedOptn}
    <div class="kanpas-panel-section flex-row">
      <div class="kanpas-panel-prop-label mdr-10 mdt-2">Value Syntax:</div>
      <div class="kanpas-prop-values flex">
        {#each selectedOptn.syntax.split('|') as hint, i}
          <span on:keypress
                on:click={() => selectedValue = hint.replace(/[()]/g, '')}>{hint.replace(/[()]/g, '')}</span>
        {/each}
      </div>
    </div>
  {/if}
</Panel>
<div class="kanpas-separator-x"></div>
<Panel title="CSS Properties" collapsible>
  {#each Object.entries($styles) as [ prop, value ]}
    {#if value && !prop.endsWith('Var')}
      <div class="kanpas-panel-section flex-row-center-y">
        <div class="kanpas-panel-prop-label flex">{prop.replace(/[A-Z]/g, m => `-${m.toLowerCase()}`)}</div>
        <input type="text" placeholder="value" class="flex" bind:value={$styles[prop]}>
        <Icon clickable tooltip="Remove" class="mdl-10" on:click={() => delete styles[prop]}>remove</Icon>
      </div>
    {/if}
  {/each}
</Panel>

<style lang="scss">
  input {
    width: 50%;
    text-align: left;
  }

  select {
    max-width: 180px;
  }

  .kanpas-prop-values {
    span {
      cursor: pointer;
      transition: all .2s ease-in-out;

      &:hover {
        color: var(--kanpas-color-icon-button-active);
      }
    }

    span:not(:last-child):after {
      content: " | ";
      opacity: 0.2;
      color: var(--kanpas-color-foreground);
    }
  }
</style>
