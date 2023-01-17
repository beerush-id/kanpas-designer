<script lang="ts">
  import { reactive } from '@beerush/reactor';
  import Canvas from '@components/Canvas.svelte';
  import CanvasSwitch from '@components/CanvasSwitch.svelte';
  import Icon from '@components/common/Icon.svelte';
  import ImmersiveOption from '@components/common/ImmersiveOption.svelte';
  import Portal from '@components/common/Portal.svelte';
  import JourneyNode from '@components/nodes/JourneyNode.svelte';
  import data from '@data/journey.json';
  import { create, type VisitStep } from '@services/journey';
  import { scaleIn } from '@services/transition';
  import { randomize } from '@utils/colors';

  const journeys = reactive<VisitStep[], true>(data, true);

  const addJourney = () => {
    journeys.push(create({ type: 'visit', path: '', actions: [], color: randomize() }));
  };

  const remJourney = (step: VisitStep) => {
    journeys.splice(journeys.indexOf(step), 1);
  };
</script>

<ImmersiveOption title="Journey" collapsible/>
<Portal slot="#immersive-header">
  <div class="flex-row-center-y">
    <div class="kanpas-acrylic flex-row-center-y mdr-8">
      <Icon class="tool-icon" tooltip="Add Journey" clickable on:click={addJourney}>new_label</Icon>
    </div>
    <CanvasSwitch/>
  </div>
</Portal>
<Canvas>
  {#if $journeys?.length}
    <div class="kanpas-journey kanpas-reset">
      {#each $journeys as step}
        <JourneyNode {step} on:remove={() => remJourney(step)}/>
      {/each}
    </div>
  {:else}
    <div in:scaleIn class="empty-journey kanpas-reset flex-column-center">
      <div class="flex-column-center kanpas-empty">
        <Icon size="strong">new_label</Icon>
        <p class="my-2">There is no journey yet. Let's add new one!</p>
        <button class="positive elevate" on:click={addJourney}>
          <span>Add Journey</span>
        </button>
      </div>
    </div>
  {/if}
</Canvas>

<style lang="scss">
  .kanpas-journey {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-top: 72px;
  }

  .kanpas-empty {
    background-color: var(--kanpas-color-background);
    aspect-ratio: 1/1;
    border-radius: 50%;
    padding: var(--kanpas-space-large);
  }

  .empty-journey {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    padding: var(--kanpas-space-xl);
    border-radius: 50%;
  }
</style>
