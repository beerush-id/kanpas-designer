<script lang="ts">
  import { type Reactive, reactive } from '@beerush/reactor';
  import Icon from '@components/common/Icon.svelte';
  import PopUp from '@components/common/PopUp.svelte';
  import WheelMenu from '@components/common/WheelMenu.svelte';
  import { features } from '@services/feature';
  import type { FeatureAction } from '@services/journey';
  import { createCompactActionMenu, type WheelMenuItem } from '@utils/menu';
  import { createEventDispatcher, onMount } from 'svelte';
  import Node from '../Node.svelte';

  export let action: Reactive<FeatureAction> = reactive({} as never);

  const dispatch = createEventDispatcher();
  const feature = features.get(action.targetId);

  const mainMenus: WheelMenuItem[] = reactive([
    ...createCompactActionMenu(action.actions),
    {}, {},
  ], true);
  const editMenus: WheelMenuItem[] = reactive([
    {
      icon: 'edit',
      label: 'Edit Path',
      click: () => {
        if (nameInput) {
          nameInput.focus();
        }
      }
    },
    ...createCompactActionMenu(action.actions),
    {},
    {},
    {
      icon: 'delete',
      label: 'Remove',
      children: [
        {
          icon: 'check',
          label: 'Confirm',
          click: () => {
            dispatch('remove');
          }
        },
        {
          icon: 'close',
          label: 'Cancel',
        },
      ]
    },
    {},
    {},
  ], true);

  let nameInput: HTMLInputElement;

  onMount(() => {
    if (!feature.name) {
      setTimeout(() => {
        nameInput.focus();
      }, 50);
    }
  });

  const dismissMainMenus = () => {
    mainMenus.forEach(menu => menu.active = false);
  };
  const dismissEditMenus = () => {
    editMenus.forEach(menu => menu.active = false);
  };
</script>

<Node type="feature" bind:expand={$action.expanded}>
  <div slot="prefix">see</div>
  <svelte:fragment slot="head">
    <div contenteditable="true"
         bind:this={nameInput}
         bind:innerHTML={$feature.name}
         class="step-type flex-row-center-y"></div>
  </svelte:fragment>
  <svelte:fragment slot="node-menu">
    <Icon clickable>more_vert</Icon>
    <PopUp role="popup"
           xDir="between"
           yDir="between"
           trigger="click"
           reset
           dismiss
           on:dismiss={dismissEditMenus}>
      <WheelMenu label="Action" menuItems={editMenus}></WheelMenu>
    </PopUp>
  </svelte:fragment>
  <div slot="suffix">with</div>

  <svelte:fragment slot="action-bottom">
    {#if $action.actions.length}
      <Icon clickable
            tooltip={$action.expanded ? 'Collapse' : 'Expand'}
            on:click={() => action.expanded = !action.expanded}>{$action.expanded ? 'expand_less' : 'expand_more'}</Icon>
    {:else}
      <Icon clickable tooltip="Add Action" slot="action-bottom">add</Icon>
      <PopUp role="popup"
             xDir="between"
             yDir="between"
             trigger="click"
             reset
             dismiss
             on:dismiss={dismissMainMenus}>
        <WheelMenu label="Add Action" menuItems={mainMenus}></WheelMenu>
      </PopUp>
    {/if}
  </svelte:fragment>
</Node>
