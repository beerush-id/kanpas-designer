<script lang="ts">
  import Icon from '@components/common/Icon.svelte';
  import Panel from '@components/common/Panel.svelte';
  import { createOptions, createStyles } from '@utils/panel';
  import props from '@data/css-properties.json';
  import { humanize } from '@utils/string.js';

  export let styles = createStyles();
  export let options = createOptions();

  const eases = [ 'linear', 'ease', 'ease-in', 'ease-out', 'ease-in-out' ];

  const update = () => {
    let transitions = [];

    for (const { property, duration, delay, easing } of options.transitions) {
      if (property && duration) {
        const transition = [ property, duration ];

        if (delay) transition.push(delay);
        if (easing) transition.push(easing);

        transitions.push(transition.join(' '));
      }
    }

    if (transitions.length) {
      styles.transition = transitions.join(', ');
    } else {
      delete styles.transition;
    }
  };

  const remove = (transition) => {
    options.transitions.splice(options.transitions.indexOf(transition), 1);
    update();
  };

  const clear = () => {
    options.transitions = [];
    update();
  };
</script>

<Panel title="Transition" icon="switch" collapsible collapsed={!$options.transitions.length}>
  <svelte:fragment slot="panel-head">
    {#if $options.transitions.length}
      <Icon clickable tooltip="Clear Transitions" class="mdr-10" on:click={clear}>settings_backup_restore</Icon>
    {/if}
    <Icon clickable tooltip="Add Transition" on:click={options.transitions.push({})}>add</Icon>
  </svelte:fragment>
  {#each $options.transitions as trans}
    <div class="kanpas-panel-section flex-row">
      <div class="flex mdr-10">
        <select name="property" bind:value={trans.property} on:change={update}>
          <option value={undefined}>Property</option>
          {#each Object.keys(props) as prop}
            <option value={prop}>{humanize(prop, true)}</option>
          {/each}
        </select>
        <div class="flex-row-center-y mdt-4">
          <input type="text" name="duration" placeholder="time" bind:value={trans.duration} on:input={update}>
          <div class="mdr-4"></div>
          <input type="text" name="delay" placeholder="delay" bind:value={trans.delay} on:input={update}>
          <div class="mdr-4"></div>
          <select name="easing" bind:value={trans.easing} on:change={update}>
            <option value={undefined}>Easing</option>
            {#each eases as ease}
              <option value={ease}>{humanize(ease, true)}</option>
            {/each}
          </select>
        </div>
      </div>
      <Icon clickable tooltip="Remove" class="mdt-2" on:click={() => remove(trans)}>remove</Icon>
    </div>
  {/each}
</Panel>
<style lang="scss">
  select {
    width: 100%;
  }

  input {
    max-width: 72px;
  }
</style>
