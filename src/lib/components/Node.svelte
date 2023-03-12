<script lang="ts">
  import Icon from '@components/common/Icon.svelte';
  import { scaleOut } from '@services/transition';

  export let type: 'feature' | 'element' | 'component' | 'action' = 'element';
  export let root = false;
  export let aside = false;
  export let color = '';
  export let hasChildren = false;
  export let hasAside = false;
  export let expanded = false;

  const icons = {
    feature: 'dashboard',
    element: 'html',
    component: 'category',
    action: 'ads_click',
    visit: 'travel_explore',
    layout: 'dashboard_customize',
  };
</script>

<div out:scaleOut class="kds-node kds-scale-in" class:root class:aside
     style:--kds-color-node-line={color}>
  <div class="kds-node-self"
       class:has-children={hasChildren}
       class:has-aside={hasAside}
       class:expanded>
    {#if root}
      <div class="kds-node-root-flag">
        <Icon>label</Icon>
      </div>
    {/if}
    <div class="kds-node-head">
      <div class="kds-node-icon mdb-10">
        <slot name="node-icon">
          <Icon size="medium">{icons[type]}</Icon>
        </slot>
      </div>
      <slot name="head"></slot>
      <div class="node-prefix">
        <slot name="prefix">a</slot>
      </div>
      <div class="node-suffix">
        <slot name="suffix">Contains</slot>
      </div>

      <div class="node-step-button">
        <slot name="node-menu"></slot>
      </div>
      <div class="node-action action-top">
        <slot name="action-top"></slot>
      </div>
      <div class="node-action action-left">
        <slot name="action-left"></slot>
      </div>

      <div class="node-action action-right">
        <slot name="action-right">
          <Icon clickable xDir="after" yDir="between" tooltip="Add">add</Icon>
        </slot>
      </div>

      <div class="node-action action-bottom">
        <slot name="action-bottom">
          {#if hasChildren}
            <Icon clickable
                  tooltip={expanded ? 'Collapse' : 'Expand'}
                  on:click={() => expanded = !expanded}>{expanded ? 'expand_less' : 'expand_more'}</Icon>
          {:else}
            <Icon clickable
                  tooltip="Add"
                  on:click={() => expanded = !expanded}>add
            </Icon>
          {/if}
        </slot>
      </div>
    </div>
    {#if expanded}
      <div class="kds-node-children">
        <slot></slot>
      </div>
    {/if}
  </div>
  <div class="kds-node-aside flex-row" class:has-aside={hasAside}>
    <slot name="node-aside"></slot>
  </div>
</div>

<style lang="scss">
  .kds-node {
    margin: 172px 32px;
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    position: relative;

    & > .kds-node-self > .kds-node-head:before {
      content: "";
      display: block;
      width: 2px;
      height: calc(100% + 174px);
      background-color: var(--kds-color-node-line);
      position: absolute;
      left: 50%;
      bottom: 0;
      margin-bottom: -94px;
      margin-left: -1px;
      z-index: -1;
    }

    & > .kds-node-self:not(.has-children) > .kds-node-head:before,
    & > .kds-node-self:not(.expanded) > .kds-node-head:before {
      height: calc(100% + 132px);
      margin-bottom: -54px;
    }

    &:first-child > .kds-node-self > .kds-node-head:before,
    &:last-child > .kds-node-self > .kds-node-head:before,
    &.aside:last-child > .kds-node-self > .kds-node-head:before {
      height: calc(100% + 128px - 22px);
    }

    & > .kds-node-self:after {
      content: "";
      display: block;
      width: calc(100% + 172px);
      height: 39px;
      position: absolute;
      left: 50%;
      bottom: calc(100% + 128px - 74px - 15px);
      transform: translate3d(-50%, 0, 0);
      border-top: 2px solid var(--kds-color-node-line);
    }

    &:first-child > .kds-node-self:after {
      width: calc(50% + 64px);
      transform: none;
      border-left: 2px solid var(--kds-color-node-line);
      border-top-left-radius: 15px;
      margin-left: -1px;
    }

    &:last-child > .kds-node-self:after {
      width: calc(50% + 64px);
      transform: none;
      left: unset;
      right: 50%;
      border-right: 2px solid var(--kds-color-node-line);
      border-top-right-radius: 15px;
      margin-right: -1px;
    }

    &:not(.aside):first-child:last-child > .kds-node-self:after,
    &.root > .kds-node-self:after,
    &.aside > .kds-node-self:after {
      width: 2px;
      height: 41px;
      border: none;
      background-color: var(--kds-color-node-line);
    }
  }

  .kds-node-root-flag {
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    margin-left: -16px;
    position: absolute;
    bottom: 100%;
    left: 50%;
    margin-bottom: 78px;
    background-color: var(--kds-color-node-bg);
    box-shadow: 0 0 0 2px var(--kds-color-node-line);
    border-radius: 50%;
    z-index: 1;
  }

  .kds-node-self, .kds-node-head {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    position: relative;
  }

  .kds-node-self.has-aside:before {
    content: "";
    display: block;
    width: calc(50% + 64px);
    border-top: 2px solid var(--kds-color-node-line);
    position: absolute;
    left: calc(50% + 32px);
    top: 52px;
    transition: all .3s ease-in-out;
  }

  .kds-node-aside {
    margin-top: -40px;
    position: relative;

    &.has-aside:before,
    &.has-aside:after {
      content: "";
      display: block;
      position: absolute;
    }

    &.has-aside:before {
      border-top: 2px solid var(--kds-color-node-line);
      border-right: 2px solid var(--kds-color-node-line);
      top: 92px;
      width: calc(100% - 32px);
      right: 32px;
    }

    &.has-aside:after {
      width: 2px;
      height: 12px;
      background-color: var(--kds-color-node-line);
      position: absolute;
      right: 32px;
      top: 87px;
      border-radius: 50%;
    }
  }

  .kds-node-head {
    padding: var(--kds-space-small);
    background-color: var(--kds-color-node-bg);
    border-radius: 10px;
    white-space: nowrap;
    min-width: 150px;

    &:hover {
      .node-action:not(:empty) {
        opacity: 1;
        visibility: visible;
      }
    }
  }

  .node-prefix, .node-suffix {
    position: absolute;
    left: 50%;
    transform: translate3d(-50%, 0, 0);
    background-color: var(--kds-color-node-tips-bg);
    font-size: var(--kds-font-hints);
    padding: var(--kds-space-tight) var(--kds-space-small);
    border-radius: 20px;
    text-transform: uppercase;
  }

  .node-step-button {
    position: absolute;
    top: 8px;
    right: 8px;
    z-index: 1;
  }

  .node-prefix {
    bottom: 100%;
    margin-bottom: 10px;
    box-shadow: 0 0 0 2px var(--kds-color-node-tips-line);
  }

  .node-suffix {
    top: 100%;
    margin-top: 10px;
    box-shadow: 0 0 0 2px var(--kds-color-node-tips-line-alt);
  }

  .node-action {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    width: 24px;
    min-height: 24px;
    background-color: var(--kds-color-node-tips-bg);
    border: 2px solid var(--kds-color-node-line);
    position: absolute;
    z-index: 1;
    border-radius: 12px;
    transition: opacity .3s ease-in-out, visibility .3s ease-in-out, padding .3s ease-in-out,
    margin .2s ease-in-out, width .3s ease-in-out, height .3s ease-in-out, transform .3s ease-in-out,
    top .3s ease-in-out, left .3s ease-in-out, right .3s ease-in-out, bottom .3s ease-in-out;
    //transition: all .3s ease-in-out;

    &.action-top, &.action-bottom {
      left: 50%;
      margin-left: -12px;
    }

    &.action-left, &.action-right {
      top: 50%;
      margin-top: -12px;
      opacity: 0;
      visibility: hidden;
    }

    &.action-top {
      bottom: 100%;
      margin-bottom: 46px;
      opacity: 0;
      visibility: hidden;
    }

    &.action-right {
      opacity: 1;
      visibility: visible;
      flex-direction: column;
      left: 100%;
      margin-left: 6px;
      margin-top: 0;
      transform: translate3d(0, -50%, 0);

      &:not(:empty) {
        padding: 8px 0;
      }
    }

    &.action-bottom {
      top: 100%;
      margin-top: 54px;
    }

    &.action-left {
      right: 100%;
      margin-right: 6px;
    }

    &:empty {
      opacity: 0;
      visibility: hidden;
    }
  }

  .kds-node-icon {
    width: 48px;
    height: 48px;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: var(--kds-color-node-bg-alt);
    border-radius: 50%;
  }

  .kds-node-children {
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
</style>
