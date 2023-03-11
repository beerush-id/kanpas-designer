<script lang="ts">
  import { createStyles } from '@utils/panel';
  import InputUnit from '../common/InputUnit.svelte';
  import Panel from '../common/Panel.svelte';
  import PopUp from '../common/PopUp.svelte';

  export let styles = createStyles();

  const positions = [
    {
      label: 'Static',
      helper: 'Use default browser behavior.'
    },
    {
      value: 'relative',
      label: 'Relative',
      helper: 'Element position will relative to its current position.'
    },
    {
      value: 'absolute',
      label: 'Absolute',
      helper: 'Element position will relative to the nearest non-static parent element.'
    },
    {
      value: 'fixed',
      label: 'Fixed',
      helper: 'Element position will relative to the browser window.'
    },
    {
      value: 'sticky',
      label: 'Sticky',
      helper: 'Element position will stick on its current position when scrolling.'
    },
  ];

  const positionChanged = () => {
    if (!styles.position) {
      [ 'left', 'top', 'right', 'bottom', 'zIndex' ].forEach(p => delete styles[p]);
    }
  };
</script>

<Panel title="Position" icon="picture_in_picture" collapsible collapsed={!$styles.position}>
  <svelte:fragment slot="panel-head">
    <select name="position" bind:value={$styles.position} on:change={positionChanged}>
      <option value={undefined}>Default</option>
      {#each positions as pos}
        <option value={pos.value}>{pos.label}</option>
      {/each}
    </select>
    {#if $styles.position}
      <div class="mdl-4">
        <input type="number" placeholder="Z" bind:value={$styles.zIndex} style="width: 40px; text-align: left;">
        <PopUp>Z Index</PopUp>
      </div>
    {/if}
  </svelte:fragment>
  <div class="kanpas-panel-section flex-row-center-y">
    <div class="kanpas-input-group flex mdr-16">
      <div class="kanpas-input flex-row-center-y flex mdb-10">
        <span class="kanpas-panel-prop-label mdr-10 flex">Left</span>
        <InputUnit name="left"
                   placeholder="auto"
                   disabled={!$styles.position}
                   bind:value={$styles.left}></InputUnit>
      </div>
      <div class="kanpas-input flex-row-center-y flex">
        <span class="kanpas-panel-prop-label mdr-10 flex">Right</span>
        <InputUnit name="right"
                   placeholder="auto"
                   disabled={!$styles.position}
                   bind:value={$styles.right}></InputUnit>
      </div>
    </div>
    <div class="kanpas-input-group flex">
      <div class="kanpas-input flex-row-center-y flex mdb-10">
        <span class="kanpas-panel-prop-label mdr-10 flex">Top</span>
        <InputUnit name="top"
                   placeholder="auto"
                   disabled={!$styles.position}
                   bind:value={$styles.top}></InputUnit>
      </div>
      <div class="kanpas-input flex-row-center-y flex">
        <span class="kanpas-panel-prop-label mdr-10 flex">Bottom</span>
        <InputUnit name="bottom"
                   placeholder="auto"
                   disabled={!$styles.position}
                   bind:value={$styles.bottom}></InputUnit>
      </div>
    </div>
  </div>
</Panel>
