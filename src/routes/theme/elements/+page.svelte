<script lang="ts">
  import Canvas from '@components/Canvas.svelte';
  import CanvasSwitch from '@components/CanvasSwitch.svelte';
  import Icon from '@components/common/Icon.svelte';
  import ImmersiveOption from '@components/common/ImmersiveOption.svelte';
  import Panel from '@components/common/Panel.svelte';
  import Portal from '@components/common/Portal.svelte';
  import EditorPanel from '@components/EditorPanel.svelte';
  import Mockup from '@components/Mockup.svelte';
  import MockupSwitch from '@components/MockupSwitch.svelte';
  import groups from '@data/html-elements.json';

  import { mockup } from '@services/mockup';
  import { focusAssist, hoverAssist } from '@services/selector';
  import { onDestroy } from 'svelte';

  mockup.use('tablet');

  onDestroy(() => {
    mockup.use('laptop');
  });
</script>

<ImmersiveOption title="Components" collapsible></ImmersiveOption>
<Portal slot="#immersive-header">
  <div class="flex-row-center-y">
    <div class="kds-tool-group">
      <CanvasSwitch></CanvasSwitch>
    </div>
    <div class="mdr-24"></div>
    <div class="kds-tool-group">
      <MockupSwitch></MockupSwitch>
    </div>
  </div>
</Portal>
<Canvas>
  <div class="tree-panel kds-acrylic-bg" slot="canvas-panel-left" class:expanded={$mockup?.fullScreen}>
    <div class="tree-header pd-16 flex-row-center-y">
      <h5>HTML Elements</h5>
      <span class="flex"></span>
      <Icon clickable tooltip="Add Group">create_new_folder</Icon>
    </div>
    <div class="tree-groups flex">
      {#each groups as group, i}
        <Panel icon={group.icon} title={group.label} collapsible collapsed>
          <div class="kds-panel-section pdl-4">
            {#each group.elements as elem}
              <div class="tree-item">
                <div class="tree-item-head flex-row-center-y">
                  <span class="tree-label flex">{elem.label}</span>
                  <span class="tree-tag">{elem.tag}</span>
                </div>
              </div>
            {/each}
          </div>
        </Panel>
        {#if i < (groups.length - 1)}
          <div class="kds-separator-x"></div>
        {/if}
      {/each}
    </div>
  </div>
  <Mockup>
    <div class="element-preview pd-24">
      {#each groups as group}
        <div class="element-preview-group">
          <h3 class="flex-row-center-y">
            <Icon class="mdr-10">{group.icon}</Icon>
            <span>{group.label}</span>
          </h3>
          <div class="element-preview-tags">
            {#if group.name === 'form'}
              <form action="" use:hoverAssist use:focusAssist>
                {#each group.elements as elem}
                  <div class="element-input-group mdb-16">
                    <div class="flex-row-center-y mdb-10">
                      {#if elem.tag === 'button'}
                        <svelte:element this={elem.tag}
                                        type={elem.type}
                                        style:width="100%"
                                        use:hoverAssist
                                        use:focusAssist>{elem.label}</svelte:element>
                      {:else}
                        <svelte:element this={elem.tag}
                                        type={elem.type}
                                        placeholder={elem.label}
                                        style:width="100%"
                                        use:hoverAssist
                                        use:focusAssist></svelte:element>
                      {/if}
                    </div>
                    <div class="element-states flex-row-center-y">
                      <div class="flex flex-row-center state-hover">
                        {#if elem.tag === 'button'}
                          <svelte:element this={elem.tag}
                                          type={elem.type}
                                          use:hoverAssist
                                          use:focusAssist>{'Hover'}</svelte:element>
                        {:else}
                          <svelte:element this={elem.tag}
                                          type={elem.type}
                                          placeholder={'Hover'}
                                          use:hoverAssist
                                          use:focusAssist></svelte:element>
                        {/if}
                      </div>
                      <div class="flex flex-row-center state-focus">
                        {#if elem.tag === 'button'}
                          <svelte:element this={elem.tag}
                                          type={elem.type}
                                          use:hoverAssist
                                          use:focusAssist>{'Focus'}</svelte:element>
                        {:else}
                          <svelte:element this={elem.tag}
                                          type={elem.type}
                                          placeholder={'Focus'}
                                          use:hoverAssist
                                          use:focusAssist></svelte:element>
                        {/if}
                      </div>
                      <div class="flex flex-row-center state-active">
                        {#if elem.tag === 'button'}
                          <svelte:element this={elem.tag}
                                          type={elem.type}
                                          use:hoverAssist
                                          use:focusAssist>{'Active'}</svelte:element>
                        {:else}
                          <svelte:element this={elem.tag}
                                          type={elem.type}
                                          placeholder={'Active'}
                                          use:hoverAssist
                                          use:focusAssist></svelte:element>
                        {/if}
                      </div>
                      <div class="flex flex-row-center state-disabled">
                        {#if elem.tag === 'button'}
                          <svelte:element this={elem.tag}
                                          type={elem.type}
                                          use:hoverAssist
                                          use:focusAssist>{'Disabled'}</svelte:element>
                        {:else}
                          <svelte:element this={elem.tag}
                                          type={elem.type}
                                          placeholder={'Disabled'}
                                          use:hoverAssist
                                          use:focusAssist></svelte:element>
                        {/if}
                      </div>
                    </div>
                  </div>
                {/each}
              </form>
            {:else}
              {#each group.elements as elem}
                {#if elem.tag === 'input'}
                  <svelte:element this={elem.tag} type={elem.type}
                                  use:hoverAssist
                                  use:focusAssist></svelte:element>
                  <br>
                {:else}
                  <svelte:element this={elem.tag}
                                  use:hoverAssist
                                  use:focusAssist>{elem.label}</svelte:element>
                {/if}
              {/each}
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </Mockup>
  <div class="style-panel kds-acrylic-bg" slot="canvas-panel-right" class:expanded={$mockup?.fullScreen}>
    <EditorPanel></EditorPanel>
  </div>
</Canvas>

<style lang="scss">
  .tree-panel {
    display: flex;
    flex-direction: column;
    border-right: 1px solid var(--kds-toolbar-line);
  }

  .tree-item:not(:last-child) {
    margin-bottom: var(--kds-space-tight);
  }

  .style-panel, .tree-panel {
    border-radius: 0;
    height: 100%;
    transition: all .3s ease-in-out;

    &:before {
      border-radius: 0;
    }

    &.expanded {
      margin: 0;
      height: 100%;
    }
  }

  .style-panel {
    border-left: 1px solid var(--kds-toolbar-line);
  }

  .tree-groups {
    overflow-y: auto;
    padding: 0 16px 16px 16px;
  }

  .tree-item {
    cursor: pointer;
    transition: all .2s ease-in-out;

    &:hover {
      color: var(--kds-color-icon-button-active);
    }
  }

  .tree-tag {
    background-color: var(--kds-color-icon-button-active);
    font-size: var(--kds-font-subtitle);
    padding: 3px 6px;
    border-radius: var(--kds-radius-small);
    color: var(--kds-white);
  }
</style>
