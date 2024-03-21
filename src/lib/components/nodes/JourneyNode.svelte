<script lang="ts">
  import type { Reactive } from '@beerush/reactor';
  import { reactive } from '@beerush/reactor';
  import { features } from '@services/feature.js';
  import type { VisitStep } from '@services/journey.js';
  import { create } from '@services/journey.js';
  import { settings } from '@services/settings.js';
  import type { WheelMenuItem } from '@utils/menu.js';
  import { createCompactActionMenu } from '@utils/menu.js';
  import { makePath } from '@utils/string.js';
  import { createEventDispatcher, onMount } from 'svelte';
  import Icon from '../common/Icon.svelte';
  import PopUp from '../common/PopUp.svelte';
  import WheelMenu from '../common/WheelMenu.svelte';
  import Node from '../Node.svelte';
  import FeatureNode from './FeatureNode.svelte';

  export let step: Reactive<VisitStep> = reactive({ actions: [] } as never);
  export let parent: Reactive<VisitStep> = null as never;
  export let color = '';
  export let domain = '';

  const dispatch = createEventDispatcher();

  let colorInput: HTMLInputElement;

  const menuItems: Reactive<WheelMenuItem[]> = reactive(
    [
      {
        icon: 'dashboard',
        label: 'Show Feature',
        children: [
          {
            icon: 'playlist_add',
            label: 'New Feature',
            click: () => {
              const feature = features.create('');

              step.expanded = true;
              step.actions.push({
                type: 'show',
                target: 'feature',
                targetId: feature.id,
                actions: []
              });
            }
          },
          {
            icon: 'playlist_play',
            label: 'Existing Feature'
          }
        ]
      },
      ...createCompactActionMenu([]),
      {
        icon: 'forward',
        label: 'Redirect',
        children: [
          {
            icon: 'lan',
            label: 'Internal'
          },
          {
            icon: 'public',
            label: 'External'
          }
        ]
      }
    ],
    true
  );

  const editMenus: Reactive<WheelMenuItem[]> = reactive(
    [
      {
        icon: 'edit',
        label: 'Edit Path',
        click: () => {
          if (pathInput) {
            pathInput.focus();
          }
        }
      },
      {},
      {},
      {
        icon: 'palette',
        label: 'Color',
        click: () => {
          if (colorInput) {
            colorInput.click();
          }
        }
      },
      {},
      {},
      {},
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
            label: 'Cancel'
          }
        ]
      },
      {},
      {}
    ],
    true
  );

  let pathInput: HTMLInputElement;

  onMount(() => {
    if (!step.path) {
      setTimeout(() => {
        pathInput.focus();
      }, 50);
    }
  });

  const pathChanged = () => {
    let path = makePath(step.path.replace('<br>', ''));

    if (!path.startsWith('/')) {
      path = `/${ path }`;
    }

    if (path !== step.path) {
      step.path = path;
    }
  };

  const addChildStep = () => {
    step.expandChildren = true;

    if (!step.children) {
      step.children = [];
    }

    step.children.push(create({ type: 'visit', path: '', actions: [] }));
  };

  const remChild = (child: VisitStep) => {
    if (step.children) {
      step.children.splice(step.children.indexOf(child), 1);
    }
  };

  const dismissMainMenus = () => {
    menuItems.forEach((menu) => (menu.active = false));
  };
  const dismissEditMenus = () => {
    editMenus.forEach((menu) => (menu.active = false));
  };

  console.log(step);
</script>

<Node
  type="visit"
  root={!parent}
  color={color || $step.color}
  aside={parent}
  hasChildren={$step.actions.length}
  hasAside={$step.children && $step.children.length && $step.expandChildren}
  expanded={$step.expanded}>
  <svelte:fragment slot="prefix">when I visit</svelte:fragment>
  <svelte:fragment slot="head">
    <div class="step-type flex-row-center-y">
      <div class="visit-base">
        <PopUp xDir="before" yDir="between">{settings.domain}</PopUp>
        <Icon>vpn_lock</Icon>
        {#if domain}
          <span class="mdl-4">{domain}</span>
        {/if}
      </div>
      <div
        contenteditable="true"
        class="visit-path"
        bind:this={pathInput}
        bind:innerHTML={$step.path}
        on:blur={pathChanged}></div>
    </div>
  </svelte:fragment>
  <svelte:fragment slot="node-menu">
    <Icon clickable>more_vert</Icon>
    <input type="color" bind:value={$step.color} bind:this={colorInput}/>
    <PopUp
      role="popup"
      xDir="between"
      yDir="between"
      trigger="click"
      reset
      dismiss
      on:dismiss={dismissEditMenus}>
      <WheelMenu label="Action" menuItems={editMenus}/>
    </PopUp>
  </svelte:fragment>
  <svelte:fragment slot="suffix">I will</svelte:fragment>

  <svelte:fragment slot="action-right">
    {#if $step.path && $step.path !== '/'}
      <Icon clickable xDir="after" yDir="between" tooltip="Add Child Path" on:click={addChildStep}
      >add
      </Icon>
      {#if $step.children && $step.children.length}
        <span class="mdy-4"></span>
        <Icon
          clickable
          tooltip={$step.expandChildren ? 'Collapse' : 'Expand'}
          on:click={() => (step.expandChildren = !step.expandChildren)}
        >{$step.expandChildren ? 'unfold_less' : 'unfold_more'}</Icon>
      {/if}
    {/if}
  </svelte:fragment>
  <svelte:fragment slot="node-aside">
    {#if $step.children && $step.children.length && $step.expandChildren}
      {#each $step.children as child}
        <svelte:self
          parent={step}
          domain="{domain}{step.path}"
          step={child}
          color={child.color || color || $step.color}
          on:remove={() => remChild(child)}/>
      {/each}
    {/if}
  </svelte:fragment>

  <svelte:fragment slot="action-bottom">
    {#if $step.actions.length}
      <Icon
        clickable
        tooltip={$step.expanded ? 'Collapse' : 'Expand'}
        on:click={() => (step.expanded = !step.expanded)}
      >{$step.expanded ? 'expand_less' : 'expand_more'}</Icon>
    {:else}
      <Icon clickable tooltip="Add Action" slot="action-bottom">add</Icon>
      <PopUp
        role="popup"
        xDir="between"
        yDir="between"
        trigger="click"
        reset
        dismiss
        on:dismiss={dismissMainMenus}>
        <WheelMenu label="Add Action" {menuItems}/>
      </PopUp>
    {/if}
  </svelte:fragment>

  {#if $step.actions.length}
    {#each $step.actions as action}
      {#if action.type === 'show' && action.target === 'feature'}
        <FeatureNode {action}/>
      {/if}
    {/each}
  {/if}
</Node>

<style lang="scss">
  input[type='color'] {
    position: absolute;
    opacity: 0;
    visibility: hidden;
  }

  .visit-base,
  .visit-path {
    font-size: var(--kds-font-subtitle);
    border-radius: 3px;
    padding: 4px 6px;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    height: 24px;
  }

  .visit-base {
    background-color: var(--kds-color-node-line);
    color: var(--kds-color-grey-10);
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .visit-path {
    background-color: var(--kds-color-node-bg-alt);
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    border: 1px solid transparent;

    &[contenteditable]:focus {
      padding: 4px 6px;
      border-color: var(--kds-color-node-line);
    }

    &[contenteditable]:hover {
      color: var(--kds-color-node-line);
    }

    &[contenteditable]:before {
      display: none;
    }
  }
</style>
