import { reactive, type Unsubscribe } from '@beerush/reactor';
import { copy } from '@utils/clipboard.js';
import { states, swatches, toCssVar, variables } from '@utils/colors.js';

export type CSSVariableGroup = {
  name: string;
  label: string;
  icon: string;
  variables: CSSVariable[];
};

export type CSSVariable = {
  name: string;
  value: string | number;
};

const defaultGroups: CSSVariableGroup[] = [
  {
    name: 'font',
    label: 'Typography',
    icon: 'text_fields',
    variables: [],
  },
  {
    name: 'space',
    label: 'Spacing',
    icon: 'space_bar',
    variables: [],
  },
  {
    name: 'border',
    label: 'Border',
    icon: 'border_outer',
    variables: [],
  },
];

export class Css {
  public cssColors = '';
  public colors = reactive({ swatches, variables, states }, true);
  public variableGroups = reactive<CSSVariableGroup[]>(defaultGroups, true);

  private unsubColors?: Unsubscribe;
  private exportTimeout?: number;

  public subscribe() {
    this.unsubColors = this.colors.subscribe(() => {
      this.exportColors();
    });
  }

  public unsubscribe() {
    if (typeof this.unsubColors === 'function') {
      this.unsubColors();
    }
  }

  public copy() {
    return copy(this.cssColors, 'CSS Copied to clipboard.');
  }

  private exportColors() {
    if (this.exportTimeout) {
      clearTimeout(this.exportTimeout);
    }

    this.exportTimeout = setTimeout(() => {
      let style = document.querySelector('#css-color-variables');

      if (!style) {
        style = document.createElement('style');
        style.id = 'css-color-variables';

        document.head.appendChild(style);
      }

      style.innerHTML = toCssVar([...swatches, ...states, ...variables], {
        className: '.kds-root',
        darkClass: '.dark-mode',
      });
      this.cssColors = toCssVar([...swatches, ...states, ...variables]);
    }, 50) as never;
  }
}

export const css = new Css();
