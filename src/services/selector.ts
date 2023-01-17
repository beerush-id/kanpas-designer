import { type Reactive, reactive } from '@beerush/reactor';
import type { StyleDeclarations } from '@utils/colors';
import { capture } from '@utils/draggable';
import { offsetRect } from '@utils/element';
import { canvas } from './canvas';

export class SelectorAssist {
  public styles?: Reactive<StyleDeclarations>;
  public focusStyles = reactive<StyleDeclarations>({} as never);
  public hoverStyles = reactive<StyleDeclarations>({} as never);

  public viewport?: HTMLElement;
  public element?: HTMLElement;
  public extended?: boolean;

  public focusedElements: HTMLElement[] = [];
  public focusBounds: Partial<StyleDeclarations>[] = [];

  public boundTo(viewport: HTMLElement) {
    this.viewport = viewport;

    let queue: number;
    viewport.addEventListener('wheel', (e) => {
      if (this.focusBounds.length) {
        this.focusBounds.forEach(bound => {
          const top = parseInt(bound.top || '');
          bound.top = `${ top - e.deltaY }px`;
        });
      }

      if (queue) {
        clearTimeout(queue);
      }

      if (this.focusedElements.length) {
        queue = setTimeout(() => {
          this.placeFocuses();
        }, 300) as never;
      }
    });
  }

  hoverTo(element: HTMLElement, extended?: boolean) {
    if (element === this.element) {
      return;
    }

    this.element = element;
    this.extended = extended;

    const { width, height, left, top } = offsetRect(element, this.viewport, canvas.scale);

    this.hoverStyles.width = `${ width }px`;
    this.hoverStyles.height = `${ height }px`;
    this.hoverStyles.left = `${ left }px`;
    this.hoverStyles.top = `${ top }px`;
  }

  public addFocus(elem: HTMLElement, append?: boolean) {
    if (append) {
      if (this.focusedElements.includes(elem)) {
        this.focusedElements.splice(this.focusedElements.indexOf(elem), 1);
      } else {
        this.focusedElements.push(elem);
      }
    } else {
      this.focusedElements = [ elem ];
    }

    this.placeFocuses();
  }

  public clearFocus() {
    this.focusedElements = [];
    this.focusBounds = [];
  }

  public placeFocuses() {
    const bounds: Partial<StyleDeclarations>[] = [];

    for (const elem of this.focusedElements) {
      const { width, height, left, top } = offsetRect(elem, this.viewport, canvas.scale);
      bounds.push({
        width: `${ width }px`,
        height: `${ height }px`,
        left: `${ left }px`,
        top: `${ top }px`
      });
    }

    this.focusBounds = bounds;
  }
}

export const selector: Reactive<SelectorAssist> = reactive(new SelectorAssist() as never, true);

export const focusAssist = (elem: HTMLElement, capture = true) => {
  if (capture) {
    const handler = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      selector.addFocus(elem, e.ctrlKey);
    };

    elem.addEventListener('click', handler);

    return {
      destroy: () => elem.removeEventListener('click', handler),
    };
  }
};

export const blurAssist = (elem: HTMLElement) => {
  const handler = () => {
    selector.clearFocus();
  };

  elem.addEventListener('click', handler);

  return {
    destroy: () => elem.removeEventListener('click', handler),
  };
};

export const hoverAssist = (elem: HTMLElement, ref?: Reactive<StyleDeclarations>) => {
  let activeRef = ref;
  const mouseenter = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    if (activeRef) {
      selector.styles = activeRef;
    }

    selector.hoverStyles.display = 'block';
    selector.hoverTo(elem, e.ctrlKey);
  };
  const mouseleave = () => {
    selector.hoverStyles.display = 'none';
  };

  elem.addEventListener('mousemove', mouseenter);
  elem.addEventListener('mouseleave', mouseleave);

  return {
    update: (newRef?: Reactive<StyleDeclarations>) => {
      if (newRef) {
        activeRef = newRef;
      }
    },
    destroy: () => {
      elem.removeEventListener('mousemove', mouseenter);
      elem.removeEventListener('mouseleave', mouseleave);
    },
  };
};

export const dragmove = (elem: HTMLElement, styles: Reactive<StyleDeclarations>) => {
  let css: Reactive<StyleDeclarations> = styles;
  const rect = capture(elem);

  let xProp: string;
  let yProp: string;

  const merge = () => {
    rect.set({ x: parseInt(css[xProp]), y: parseInt(css[yProp]) });
  };

  const cssUnsub = css.subscribe(() => {
    if (!rect.e) {
      if (css.position) {
        xProp = 'left';
        yProp = 'top';
      } else {
        xProp = 'marginLeft';
        yProp = 'marginTop';
      }

      merge();
    }
  });

  const rectUnsub = rect.subscribe(() => {
    if (rect.x) {
      css[xProp] = `${ rect.x }px`;
    }
    if (rect.y) {
      css[yProp] = `${ rect.y }px`;
    }

    if (!rect.e) {
      merge();
    }
  });

  return {
    update: (styles: Reactive<StyleDeclarations>) => {
      css = styles;
    },
    destroy: () => {
      rectUnsub();
      cssUnsub();
    }
  };
};
