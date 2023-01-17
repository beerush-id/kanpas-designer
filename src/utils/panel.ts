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

export type Transform = {
  x?: string;
  y?: string;
  z?: string;
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
  origin: {
    x?: string;
    y?: string;
  };
  scale: Transform;
  translate: Transform;
  rotate: Transform;
  skew: Transform;

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
    origin: {},
    scale: {},
    translate: {},
    rotate: {},
    skew: {},
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

export function joinBackgrounds({ gradients, backgroundImage }: PanelOptions): string {
  for (const grad of gradients) {
    const value = gradientString(grad);

    if (grad.value !== value) {
      grad.value = value;
    }
  }

  const gradient = gradients.map(item => item.value).join(',');
  return [ backgroundImage, gradient ].filter(item => item).join(', ');
}

export function joinTransforms({ scale, rotate, translate, skew }: PanelOptions): string {
  const transforms = [];

  if (scale.x || scale.y || scale.z) {
    if (scale.z) {
      transforms.push(`scale3d(${ scale.x || 1 }, ${ scale.y || 1 }, ${ scale.z || 1 })`);
    } else {
      transforms.push(`scale(${ scale.x || 1 }, ${ scale.y || 1 })`);
    }
  }

  if (rotate.x) {
    if (!rotate.y && !rotate.z) {
      transforms.push(`rotate(${ rotate.x })`);
    } else {
      transforms.push(`rotateX(${ rotate.x })`);
    }
  }

  if (rotate.y) {
    transforms.push(`rotateY(${ rotate.y })`);
  }

  if (rotate.z) {
    transforms.push(`rotateZ(${ rotate.z })`);
  }

  if (translate.x || translate.y || translate.z) {
    transforms.push(`translate3d(${ translate.x || 0 }, ${ translate.y || 0 }, ${ translate.z || 0 })`);
  }

  if (skew.x || skew.y) {
    transforms.push(`skew(${ skew.x || 0 }, ${ skew.y || 0 })`);
  }

  return transforms.join(' ');
}

const gradientString = ({ type, angle, shape, values }: Gradient) => {
  const key = type === 'linear' ? 'linear-gradient' : 'radial-gradient';
  const value = values.sort((a, b) => a.stop - b.stop).map(item => `${ item.color } ${ item.stop }%`).join(', ');

  return `${ key }(${ type === 'linear' ? angle + 'deg' : shape }, ${ value })`;
};
