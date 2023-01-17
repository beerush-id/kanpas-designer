import { type Reactive, reactive } from '@beerush/reactor';
import type { StyleDeclarations } from './colors';

export type Unit = 'px' | '%' | 'em' | 'rem' | 'vw' | 'vh' | string;

export type Shadow = {
  x: string;
  y: string;
  b: string;
  c: string;
  s: string;
  v: string
}
export type Filters = {
  blur: string;
  brightness: string;
  contrast: string;
  grayscale: string;
  hueRotate: string;
  invert: string;
  opacity: string;
  saturate: string;
  sepia: string;
}

export type PanelOptions = {
  textShadows: Shadow[];
  boxShadows: Shadow[];

  filters: Filters;
  backdropFilters: Filters;
  dropShadows: Shadow[];

  transitions: {
    property: string;
    duration: string;
    easing: string;
    delay: string;
  }[]
};

export function createOptions(): Reactive<PanelOptions> {
  const options: PanelOptions = {
    textShadows: [],
    boxShadows: [],
    filters: {} as never,
    backdropFilters: {} as never,
    dropShadows: [],
    transitions: [],
  };

  return reactive<PanelOptions>(options, true);
}

export function createStyles(styles: StyleDeclarations = {} as never): Reactive<StyleDeclarations> {
  return reactive<StyleDeclarations>(styles, true);
}
