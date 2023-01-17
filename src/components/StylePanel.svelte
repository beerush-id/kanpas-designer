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

<div class="kanpas-style-editor">
  {#if textMode}
    <Character {styles}></Character>
    <div class="kanpas-separator-x"></div>
  {/if}
  <Display {styles}></Display>
  <div class="kanpas-separator-x"></div>
  <Dimension {styles}></Dimension>
  <div class="kanpas-separator-x"></div>
  <Appearance {styles}></Appearance>
  <div class="kanpas-separator-x"></div>
  <Background {styles} {options}></Background>
  <div class="kanpas-separator-x"></div>
  {#if !textMode}
    <Character {styles} collapsed></Character>
    <div class="kanpas-separator-x"></div>
  {/if}
  <Gradient {styles} {options}></Gradient>
  <div class="kanpas-separator-x"></div>
  <Margin {styles}></Margin>
  <div class="kanpas-separator-x"></div>
  <Padding {styles}></Padding>
  <div class="kanpas-separator-x"></div>
  <Position {styles}></Position>
  <div class="kanpas-separator-x"></div>
  <Border {styles}></Border>
  <div class="kanpas-separator-x"></div>
  <BorderRadius {styles}></BorderRadius>
  <div class="kanpas-separator-x"></div>
  <Transform {styles} {options}></Transform>
  <div class="kanpas-separator-x"></div>
  <DropShadow {styles} {options}></DropShadow>
  <div class="kanpas-separator-x"></div>
  <Shadow role="text" {styles} {options}></Shadow>
  <div class="kanpas-separator-x"></div>
  <Shadow role="box" {styles} {options}></Shadow>
  <div class="kanpas-separator-x"></div>
  <Transition {styles} {options}></Transition>
  <div class="kanpas-separator-x"></div>
  <Filter {styles} {options}></Filter>
  <div class="kanpas-separator-x"></div>
  <Filter role="backdrop" {styles} {options}></Filter>
</div>
