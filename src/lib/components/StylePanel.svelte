<script lang="ts">
  import Appearance from '@components/panels/Appearance.svelte';
  import Background from '@components/panels/Background.svelte';
  import Border from '@components/panels/Border.svelte';
  import BorderRadius from '@components/panels/BorderRadius.svelte';
  import Character from '@components/panels/Character.svelte';
  import Dimension from '@components/panels/Dimension.svelte';
  import Display from '@components/panels/Display.svelte';
  import DropShadow from '@components/panels/DropShadow.svelte';
  import Filter from '@components/panels/Filter.svelte';
  import Gradient from '@components/panels/Gradient.svelte';
  import Margin from '@components/panels/Margin.svelte';
  import Padding from '@components/panels/Padding.svelte';
  import Position from '@components/panels/Position.svelte';
  import Transform from '@components/panels/Transform.svelte';
  import Transition from '@components/panels/Transition.svelte';
  import { createOptions, createStyles } from '@utils/panel';
  import Shadow from './panels/Shadow.svelte';

  export let styles = createStyles();
  export let options = createOptions();
  export let textMode = false;
</script>

<div class="kds-style-editor">
  {#if textMode}
    <Character {styles}></Character>
    <div class="kds-separator-x"></div>
  {/if}
  <Display {styles}></Display>
  <div class="kds-separator-x"></div>
  <Dimension {styles}></Dimension>
  <div class="kds-separator-x"></div>
  <Appearance {styles}></Appearance>
  <div class="kds-separator-x"></div>
  <Background {styles} {options}></Background>
  <div class="kds-separator-x"></div>
  {#if !textMode}
    <Character {styles} collapsed></Character>
    <div class="kds-separator-x"></div>
  {/if}
  <Margin {styles}></Margin>
  <div class="kds-separator-x"></div>
  <Padding {styles}></Padding>
  <div class="kds-separator-x"></div>
  <Position {styles}></Position>
  <div class="kds-separator-x"></div>
  <Border {styles}></Border>
  <div class="kds-separator-x"></div>
  <BorderRadius {styles}></BorderRadius>
  <div class="kds-separator-x"></div>
  <Transform {styles} {options}></Transform>
  <div class="kds-separator-x"></div>
  <Gradient {styles} {options}></Gradient>
  <div class="kds-separator-x"></div>
  <DropShadow {styles} {options}></DropShadow>
  <div class="kds-separator-x"></div>
  <Shadow role="text" {styles} {options}></Shadow>
  <div class="kds-separator-x"></div>
  <Shadow role="box" {styles} {options}></Shadow>
  <div class="kds-separator-x"></div>
  <Transition {styles} {options}></Transition>
  <div class="kds-separator-x"></div>
  <Filter {styles} {options}></Filter>
  <div class="kds-separator-x"></div>
  <Filter role="backdrop" {styles} {options}></Filter>
</div>
