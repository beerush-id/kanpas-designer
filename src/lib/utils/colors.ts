import { type Reactive, resistant } from '@beerush/reactor';
import colors from '@data/colors.json';

export type StyleDeclarations = CSSStyleDeclaration & {
  [prop: string]: string;
};

export let COLOR_PREFIX = 'color-';

export type ColorInput = {
  name: string;
  fullName?: string;
  color: string;
  alpha?: string;
  variable?: string;

  darkAlpha?: string;
  darkColor?: string;
  darkVariable?: string;
};

export type ColorInputGroup = {
  name: string;
  fullName?: string;
  color?: string;
  colors: ColorInput[];
};

function prepareColors(group: ColorInputGroup) {
  group.fullName = colorName(group);

  group.colors.forEach((child) => {
    child.fullName = colorName(group, child);

    if (child.darkColor !== child.color) {
      child.darkColor = child.color;
    }

    if (child.variable && child.variable !== child.darkVariable) {
      child.darkVariable = child.variable;
    }
  });
}

function applyFullNames() {
  colors.swatches.forEach((group: ColorInputGroup) => {
    prepareColors(group);
  });

  colors.states.forEach((group: ColorInputGroup) => {
    prepareColors(group);
  });
}

applyFullNames();

export function prefix(name: string) {
  COLOR_PREFIX = name;
  applyFullNames();
}

/**
 * Duplicate color to the dark color fields.
 */

export const swatches = resistant<ColorInputGroup[], true>('color-swatches', colors.swatches);
export const states = resistant<ColorInputGroup[], true>('color-states', colors.states);
export const variables = resistant<ColorInputGroup[], true>('color-customs', colors.variables);

export function colorName(group: ColorInputGroup | string, color?: ColorInput | string) {
  if (color) {
    return `--${COLOR_PREFIX}${varname(typeof group === 'string' ? group : group.name)}-${varname(
      typeof color === 'string' ? color : color.name
    )}`;
  } else {
    return `--${COLOR_PREFIX}${varname(typeof group === 'string' ? group : group.name)}`;
  }
}

export function rawColorName(group: ColorInputGroup | string, color?: ColorInput | string) {
  if (color) {
    return `--${varname(typeof group === 'string' ? group : group.name)}-${varname(
      typeof color === 'string' ? color : color.name
    )}`;
  } else {
    return `--${varname(typeof group === 'string' ? group : group.name)}`;
  }
}

/**
 * Pick a white/black to make sure it can be visible on top of the given color.
 * @param {string} color
 * @returns {string}
 */
export function foreground(color: string): string {
  if (color.slice(0, 1) === '#') {
    color = color.slice(1);
  }

  if (color.length === 3) {
    color = color
      .split('')
      .map(function (hex) {
        return hex + hex;
      })
      .join('');
  }

  const r = parseInt(color.slice(0, 2), 16);
  const g = parseInt(color.slice(2, 4), 16);
  const b = parseInt(color.slice(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;

  return yiq >= 128 ? 'black' : 'white';
}

export function rgbToHex(r: number, g: number, b: number) {
  return '#' + nToHex(r) + nToHex(g) + nToHex(b);
}

export function hexToRgb(hex: string) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null;
}

export function shade(color: string, level: number) {
  return (
    '#' +
    color
      .replace(/^#/, '')
      .replace(/../g, (color) =>
        ('0' + Math.min(255, Math.max(0, parseInt(color, 16) + level)).toString(16)).slice(-2)
      )
  );
}

export function createSwatches(
  color: string,
  maps: Array<string> = [
    '10',
    '50',
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
    '950',
  ]
): ColorInput[] {
  const level = Math.round(100 / maps.length) * 3;
  const start = Math.ceil(maps.length / 2);
  const colors: ColorInput[] = [];

  let current: string = color;
  for (let i = start; i < maps.length; ++i) {
    current = shade(current, -level);
    colors.push({
      name: maps[i],
      color: current,
      darkColor: current,
    });
  }

  current = color;
  for (let i = start - 1; i >= 0; --i) {
    current = shade(current, level);
    colors.splice(0, 0, {
      name: maps[i],
      color: current,
      darkColor: current,
    });
  }

  return colors;
}

export function replaceSwatches(color: string, colors: ColorInput[]) {
  const level = Math.round(100 / colors.length) * 3;
  const start = Math.ceil(colors.length / 2);

  let current: string = color;
  for (let i = start; i < colors.length; ++i) {
    current = shade(current, -level);
    colors[i].color = current;
    colors[i].darkColor = current;
  }

  current = color;
  for (let i = start - 1; i >= 0; --i) {
    current = shade(current, level);
    colors[i].color = current;
    colors[i].darkColor = current;
  }
}

export function randomize(mode?: 'dark' | 'light'): string {
  if (mode) {
    if (mode === 'dark') {
      return shade(randomize(), -80);
    } else {
      return shade(randomize(), 80);
    }
  } else {
    return rgbToHex(rand(1, 255), rand(1, 255), rand(1, 255));
  }
}

function rand(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

function nToHex(color: number) {
  const hex = color.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
}

export type ThemeSetting = {
  scheme?: 'dark' | 'light' | 'system';
  darkMode?: boolean;
};
export const theme: Reactive<ThemeSetting> = resistant<ThemeSetting>('theme-setting', {
  scheme: 'system',
});

export type CssVarOptions = {
  prefix?: string;
  className?: string;
  forceDark?: boolean;
  darkClass?: string;
};

export function varname(name: string) {
  return name.toLowerCase().replace(/[-\s]+/g, '-');
}

export function prefixColor(name: string): string {
  return name.replace(/^--/, '--' + COLOR_PREFIX);
}

export function cssVarName(name: string): string {
  return `var(${prefixColor(name)})`;
}

export function toCssVar(groups: ColorInputGroup[], options: CssVarOptions = {}): string {
  const { className = ':root' } = options;

  const light = groups.map((group) => cssVar(group, options).light).join('');
  const dark = groups.map((group) => cssVar(group, options).dark).join('');

  let css = '';

  if (light) {
    css += `${className} {\r\n${light}}\r\n`;
  }

  if (dark) {
    if (options.darkClass) {
      css += `${className}${options.darkClass} {\r\n${dark}  }\r\n`;
    } else {
      css += `@media (prefers-color-scheme: dark) {\r\n  ${className} {\r\n${dark}  }\r\n}\r\n`;
    }
  }

  return css;
}

export function createToken(groups: ColorInputGroup[], parent?: string, stringify = false) {
  const mapped = groups.map(({ name, color, colors }) => {
    const token = {
      name: name.toLowerCase().replace(/\s/g, '-'),
      value: color,
      tokens: [],
    };

    for (const item of colors) {
      const child = {
        name: item.name.toLowerCase().replace(/\s/g, '-'),
        value: (item.variable || item.color)
          .toLowerCase()
          .replace('--', `@${parent}.`)
          .replace(/-/g, '.'),
      };

      if (item.darkColor && item.darkColor !== item.color) {
        child.value = {
          '@': (item.variable || item.color)
            .toLowerCase()
            .replace('--', `@${parent}.`)
            .replace(/-/g, '.'),
          '@dark': (item.darkVariable || item.darkColor)
            .toLowerCase()
            .replace('--', `@${parent}.`)
            .replace(/-/g, '.'),
        } as never;
      }

      token.tokens.push(child as never);
    }

    return token;
  });

  return stringify ? JSON.stringify(mapped, null, 2) : mapped;
}

function cssVar(group: ColorInputGroup, options: CssVarOptions = {}) {
  const { forceDark } = options;
  const { color, colors } = group;

  let light = '';
  let dark = '';

  if (color) {
    light += `  ${colorName(group)}: ${color};\r\n`;
  }

  for (const child of colors) {
    if (child.variable) {
      light += `  ${colorName(group, child)}: ${cssVarName(child.variable)};\r\n`;
    } else {
      light += `  ${colorName(group, child)}: ${child.color};\r\n`;
    }

    if (
      (child.darkVariable && child.darkVariable !== child.variable) ||
      (child.darkVariable && forceDark)
    ) {
      dark += `    ${colorName(group, child)}: ${cssVarName(child.darkVariable)};\r\n`;
    } else if (
      (child.darkColor && child.darkColor !== child.color) ||
      (child.darkColor && forceDark)
    ) {
      dark += `    ${colorName(group, child)}: ${child.darkColor};\r\n`;
    }
  }

  return { light, dark };
}
