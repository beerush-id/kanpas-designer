import { reactive, type Unsubscribe } from '@beerush/reactor';
import { copy } from '@utils/clipboard';
import { states, swatches, toCssVar, variables } from '@utils/colors';

export class Css {
  public cssColors = '';
  public colors = reactive({ swatches, variables, states }, true);

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

      style.innerHTML = toCssVar(
        [ ...swatches, ...states, ...variables ],
        { className: '.kanpas-root', darkClass: '.dark-mode' }
      );
      this.cssColors = toCssVar([ ...swatches, ...states, ...variables ]);
    }, 50) as never;
  }
}

export const css = new Css();
