import fonts from '@data/font.json';

export type FontDefinition = {
  name: string;
  css: string;
  weights: string[];
  weightMaps: {
    name: string;
    label: string;
    value: string
  }[];
}

export class WebFont {
  public fonts: FontDefinition[] = fonts as never;
  public activeFonts: string[] = [];

  public exportCss() {
    let style = document.querySelector('#kanpas-fonts');

    if (!style) {
      style = document.createElement('style');
      style.id = 'kanpas-fonts';
      document.head.appendChild(style);
    }

    let css = '';

    for (const font of this.fonts) {
      css += `${ font.css }\r\n`;
    }

    style.innerHTML = css;
  }
}

export const webFonts = new WebFont();
