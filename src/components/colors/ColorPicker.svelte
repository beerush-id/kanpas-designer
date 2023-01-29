<script lang="ts">
  import type { Reactive, Unsubscribe } from '@beerush/reactor';
  import { reactive } from '@beerush/reactor';
  import type { ColorInput } from '@utils/colors';
  import { colorName, rawColorName } from '@utils/colors';
  import { states, swatches, theme, variables } from '@utils/colors.js';
  import { createEventDispatcher } from 'svelte';
  import ColorPicker from 'svelte-awesome-color-picker';
  import PopUp from '../common/PopUp.svelte';

  const dispatch = createEventDispatcher();

  let query = '';
  let className = '';
  export { className as class };

  export let value = '';
  export let variable = '';

  let unsub: Unsubscribe;
  const selectSwatch = (group: string, item: Reactive<ColorInput>) => {
    if (typeof unsub === 'function') {
      unsub();
    }

    updateColor(group, item.color, item.name);

    unsub = item.subscribe(() => {
      updateColor(group, item.color, item.name);
    });
  };

  const updateColor = (group: string, color: string, name: string) => {
    value = color;
    variable = rawColorName(group, name);
    dispatch('input', { color: value, variable });
  };

  const customize = ({ detail }: CustomEvent) => {
    const { hex } = detail;

    if (hex && hex !== value) {
      value = hex;
      variable = '';
      dispatch('input', { color: value, variable });

      if (typeof unsub === 'function') {
        unsub();
      }
    }
  };

  let fStates = reactive([]);
  let fSwatches = reactive([]);
  let fVariables = reactive([]);

  const filter = () => {
    fVariables.splice(0, fVariables.length);
    fStates.splice(0, fStates.length);
    fSwatches.splice(0, fSwatches.length);

    variables.forEach(group => {
      const colors = group.colors.filter(c => c.name.toLowerCase().includes(query));

      if (colors.length) {
        fVariables.push({ ...group, colors });
      } else if (group.name.toLowerCase().includes(query)) {
        fVariables.push(group);
      }
    });

    states.forEach(group => {
      const colors = group.colors.filter(c => c.name.toLowerCase().includes(query));

      if (colors.length) {
        fStates.push({ ...group, colors });
      } else if (group.name.toLowerCase().includes(query)) {
        fStates.push(group);
      }
    });

    swatches.forEach(group => {
      const colors = group.colors.filter(c => c.name.toLowerCase().includes(query));

      if (colors.length) {
        fSwatches.push({ ...group, colors });
      } else if (group.name.toLowerCase().includes(query)) {
        fSwatches.push(group);
      }
    });
  };

  filter();
</script>

<div class="kanpas-color-picker-wrap {className}" on:wheel|stopPropagation>
  <div class="kanpas-color-picker">
    <div class="kanpas-color-variables">
      <div class="kanpas-color-search mdb-12">
        <input type="text" placeholder="Search color" bind:value={query} style:width="100%" on:input={filter}>
      </div>
      {#if $fVariables.length}
        <div class="kanpas-color-list-label">Common</div>
        <div class="kanpas-color-list flex-row">
          {#each $fVariables as group}
            {#each group.colors as item}
              <div
                class="kanpas-color-view"
                style="background-color: {$theme.darkMode ? item.darkColor : item.color}"
                on:click={() => selectSwatch(group.name, item)}
                on:keypress>
                <PopUp performance>
                  {colorName(group, item)} ({$theme.darkMode ? item.darkColor : item.color})
                </PopUp>
              </div>
            {/each}
          {/each}
        </div>
        <div class="kanpas-separator-x"></div>
      {/if}
      {#if $fStates.length}
        {#each $fStates as group}
          <div class="kanpas-color-list-label">{group.name}</div>
          <div class="kanpas-color-list flex-row">
            {#each group.colors as item}
              <div
                class="kanpas-color-view"
                style="background-color: {$theme.darkMode ? item.darkColor : item.color}"
                on:click={() => selectSwatch(group.name, item)}
                on:keypress>
                <PopUp performance>
                  {colorName(group, item)} ({$theme.darkMode ? item.darkColor : item.color})
                </PopUp>
              </div>
            {/each}
          </div>
        {/each}
        <div class="kanpas-separator-x"></div>
      {/if}
      {#if $fSwatches.length}
        {#each $fSwatches as group}
          <div class="kanpas-color-list-label">{group.name}</div>
          <div class="kanpas-color-list flex-row">
            {#each group.colors as item}
              <div
                class="kanpas-color-view"
                style="background-color: {$theme.darkMode ? item.darkColor : item.color}"
                on:click={() => selectSwatch(group.name, item)}
                on:keypress>
                <PopUp performance>
                  {colorName(group, item)} ({$theme.darkMode ? item.darkColor : item.color})
                </PopUp>
              </div>
            {/each}
          </div>
        {/each}
      {/if}
    </div>
    <div class="kanpas-color-drawer">
      <ColorPicker
        isInput={false}
        isTextInput={false}
        canChangeMode={false}
        hex={value}
        on:input={customize}/>
      <input
        type="text"
        bind:value
        style:width="100%"
        style:margin-top="10px"
        style:text-align="center"/>
    </div>
  </div>
</div>

<style lang="scss">
  .kanpas-color-picker-wrap {
    display: inline-flex;
    flex-direction: column;
    position: relative;
    color: var(--kanpas-color-foreground);
  }

  .kanpas-color-picker {
    height: 276px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    z-index: 99;
  }

  .kanpas-color-variables,
  .kanpas-color-drawer {
    padding: var(--kanpas-space-20);
  }

  .kanpas-color-variables {
    width: 200px;
    height: calc(100% - (var(--kanpas-space-20) * 2));
    margin-top: var(--kanpas-space-20);
    padding-top: 0;
    padding-bottom: 0;
    overflow-y: scroll;
  }

  .kanpas-color-drawer {
    padding-left: 0;
  }

  .kanpas-color-list {
    flex-wrap: wrap;
    margin-bottom: 16px;
    filter: drop-shadow(0 0 1px var(--kanpas-color-line));

    &:last-child {
      margin-bottom: 0;
    }
  }

  .kanpas-color-list-label {
    font-size: var(--kanpas-font-subtitle);
    margin-bottom: 6px;
  }

  .kanpas-color-view {
    width: 20px;
    height: 20px;
    transition: box-shadow 0.2s ease-in-out;

    &:hover {
      box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    }
  }

  .kanpas-color-picker :global(.wrapper) {
    border: none !important;
    border-radius: 0 !important;
    padding: 0 !important;
    margin: 0 !important;
    background-color: transparent !important;
  }

  .kanpas-color-picker :global(.picker-wrapper) {
    outline: none !important;
    border-radius: 0 !important;
  }

  .kanpas-color-picker :global(.slider-wrapper:last-child) {
    margin: 0;
  }
</style>
