<script lang="ts">
  import Icon from '../common/Icon.svelte';
  import Node from '../Node.svelte';
  import type { Step } from '@services/journey';

  export let step: Step;
</script>
<Node type="action" root parent>
  <div slot="prefix">when user visit</div>
  <svelte:fragment slot="head">
    <div class="step-type flex-row-center-y">
      <div class="visit-base">
        <Icon class="mdr-4">vpn_lock</Icon>
        <span>www.domain.com</span>
      </div>
      <div class="visit-path">/auth</div>
    </div>
  </svelte:fragment>
  <div slot="suffix">user will</div>
  <Node type="feature" parent>
    <div slot="prefix">see</div>
    <svelte:fragment slot="head">
      <div class="step-type">A Home Page</div>
    </svelte:fragment>
    <div slot="suffix">and</div>
    <Node type="component" parent>
      <svelte:fragment slot="head">
        <div class="step-type">A Header</div>
      </svelte:fragment>
      <Node>
        <svelte:fragment slot="head">
          <div class="step-type">A Header</div>
        </svelte:fragment>
      </Node>
      <Node>
        <svelte:fragment slot="head">
          <div class="step-type">A Hero Section</div>
        </svelte:fragment>
      </Node>
      <Node>
        <svelte:fragment slot="head">
          <div class="step-type">A Contact Form Section</div>
        </svelte:fragment>
      </Node>
      <Node>
        <svelte:fragment slot="head">
          <div class="step-type">A Footer</div>
        </svelte:fragment>
      </Node>
    </Node>
    <Node type="component" parent>
      <svelte:fragment slot="head">
        <div class="step-type">A Hero Section</div>
      </svelte:fragment>
      <Node>
        <svelte:fragment slot="head">
          <div class="step-type">A Header</div>
        </svelte:fragment>
      </Node>
      <Node>
        <svelte:fragment slot="head">
          <div class="step-type">A Hero Section</div>
        </svelte:fragment>
      </Node>
      <Node>
        <svelte:fragment slot="head">
          <div class="step-type">A Contact Form Section</div>
        </svelte:fragment>
      </Node>
      <Node>
        <svelte:fragment slot="head">
          <div class="step-type">A Footer</div>
        </svelte:fragment>
      </Node>
    </Node>
    <Node type="component" parent>
      <svelte:fragment slot="head">
        <div class="step-type">A Contact Form Section</div>
      </svelte:fragment>
      <Node>
        <svelte:fragment slot="head">
          <div class="step-type">A Header</div>
        </svelte:fragment>
      </Node>
      <Node>
        <svelte:fragment slot="head">
          <div class="step-type">A Hero Section</div>
        </svelte:fragment>
      </Node>
      <Node>
        <svelte:fragment slot="head">
          <div class="step-type">A Contact Form Section</div>
        </svelte:fragment>
      </Node>
      <Node>
        <svelte:fragment slot="head">
          <div class="step-type">A Footer</div>
        </svelte:fragment>
      </Node>
    </Node>
    <Node type="component" parent>
      <svelte:fragment slot="head">
        <div class="step-type">A Footer</div>
      </svelte:fragment>
      <Node>
        <svelte:fragment slot="head">
          <div class="step-type">A Header</div>
        </svelte:fragment>
      </Node>
      <Node>
        <svelte:fragment slot="head">
          <div class="step-type">A Hero Section</div>
        </svelte:fragment>
      </Node>
      <Node>
        <svelte:fragment slot="head">
          <div class="step-type">A Contact Form Section</div>
        </svelte:fragment>
      </Node>
      <Node>
        <svelte:fragment slot="head">
          <div class="step-type">A Footer</div>
        </svelte:fragment>
      </Node>
    </Node>
  </Node>
</Node>
<style lang="scss">
  .visit-base, .visit-path {
    font-size: var(--kanpas-font-hints);
    border-radius: 3px;
    padding: 4px 6px;
    display: inline-flex;
    flex-direction: row;
    align-items: center;
    height: 24px;
  }

  .visit-base {
    background-color: var(--kanpas-color-green-700);
    color: var(--kanpas-color-grey-10);
  }

  .visit-path {
    background-color: var(--kanpas-color-node-bg-alt);
    margin-left: 4px;
  }

</style>
