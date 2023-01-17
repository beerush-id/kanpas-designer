import { type Reactive, reactive } from '@beerush/reactor';
import type { StyleDeclarations } from './colors';
import { dash } from './string';

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

export type GradientValue = {
  stop: number;
  color: string;
  colorVar?: string;
}

export type Gradient = {
  type: 'linear' | 'radial';
  values: GradientValue[];
  angle?: number;
  shape?: 'circle' | 'ellipse' | 'closest-side' | 'closest-corner' | 'farthest-side' | 'farthest-corner';
  value?: string;
  repeat?: boolean;
}

export type PanelOptions = {
  textShadows: Shadow[];
  boxShadows: Shadow[];

  filters: Filters;
  backdropFilters: Filters;
  dropShadows: Shadow[];
  gradients: Gradient[];
  backgroundClip?: boolean;
  backgroundImage?: string;
  backgroundPosition: {
    x?: string;
    y?: string;
    v?: string;
  }
  backgroundSize: {
    x?: string;
    y?: string;
    v?: string;
  }

  transitions: {
    property: string;
    duration: string;
    easing: string;
    delay: string;
  }[]
};

export const filterUnits: Filters = {
  blur: 'px',
  brightness: '',
  contrast: '%',
  grayscale: '%',
  hueRotate: 'deg',
  invert: '%',
  opacity: '%',
  saturate: '%',
  sepia: '%'
};

export function createOptions(): Reactive<PanelOptions> {
  const options: PanelOptions = {
    textShadows: [],
    boxShadows: [],
    filters: {} as never,
    backdropFilters: {} as never,
    dropShadows: [],
    transitions: [],
    gradients: [],
    backgroundSize: {} as never,
    backgroundPosition: {} as never,
  };

  return reactive<PanelOptions>(options, true);
}

export function createStyles(styles: StyleDeclarations = {} as never): Reactive<StyleDeclarations> {
  return reactive<StyleDeclarations>(styles, true);
}

export function joinFilters(filters: Filters, shadows: Shadow[]) {
  const activeFilters = [];
  for (const [ prop, value ] of Object.entries(filters)) {
    if (typeof value !== 'undefined' && value !== '') {
      activeFilters.push(`${ dash(prop) }(${ value }${ filterUnits[prop as never] })`);
    }
  }
  const activeShadows: {
    color: string;
    colorVar?: string;
  }[] = shadows.map(({ x, y, b, c, s, v }: Shadow) => {
    if (x && y && b && c) {
      const color = `${ x } ${ y } ${ b }${ s ? ' ' + s : '' } ${ c }`;

      if (v) {
        return { color, colorVar: `${ x } ${ y } ${ b }${ s ? ' ' + s : '' } ${ v }` };
      } else {
        return { color };
      }
    }
  }) as never;

  const filter = activeFilters.join(' ');

  const color = activeShadows.filter(item => item).map(({ color }) => `drop-shadow(${ color })`).join(' ');
  const colorVar = activeShadows.filter(item => item)
    .map((item) => `drop-shadow(${ item.colorVar || item.color })`)
    .join(' ');

  return {
    filter: [ filter, color ].filter(item => item).join(' '),
    filterVar: [ filter, colorVar ].filter(item => item).join(' ')
  };
}

export function joinBackgrounds({ gradients, backgroundImage }: PanelOptions) {
  for (const grad of gradients) {
    const value = gradientString(grad);

    if (grad.value !== value) {
      grad.value = value;
    }
  }

  const gradient = gradients.map(item => item.value).join(',');
  return [ backgroundImage, gradient ].filter(item => item).join(', ');
}

const gradientString = ({ type, angle, shape, values }: Gradient) => {
  const key = type === 'linear' ? 'linear-gradient' : 'radial-gradient';
  const value = values.sort((a, b) => a.stop - b.stop).map(item => `${ item.color } ${ item.stop }%`).join(', ');

  return `${ key }(${ type === 'linear' ? angle + 'deg' : shape }, ${ value })`;
};
