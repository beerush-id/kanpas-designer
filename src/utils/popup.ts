export type DirectionX = 'before' | 'after' | 'between' | 'left' | 'right';
export type DirectionY = 'above' | 'below' | 'between' | 'top' | 'bottom';

export function unlinkPopUp(parent: HTMLElement, element: HTMLElement, delay = 200) {
  if (!parent || !element) return;

  element.style.marginLeft = '0';
  element.style.marginTop = '0';
  element.style.marginRight = '0';
  element.style.marginBottom = '0';

  setTimeout(() => {
    parent.appendChild(element);
  }, delay);
}

export function linkPopUpPosition(parent: HTMLElement, element: HTMLElement, xDir: DirectionX, yDir: DirectionY) {
  if (!element) {
    return;
  }

  const slot = document.querySelector('#kanpas-popup');

  if (slot) {
    slot.appendChild(element);
  } else {
    document.body.appendChild(element);
  }

  const { innerWidth: winWidth, innerHeight: winHeight } = window;
  const { width: elWidth, height: elHeight } = element.getClientRects()[0];
  const { x, y, width: parWidth, height: parHeight } = parent.getClientRects()[0];

  element.removeAttribute('style');

  if (xDir === 'before') {
    if ((x - elWidth) < 0) {
      element.style.left = `${ x + parWidth }px`;
      element.style.marginLeft = '8px';
    } else {
      element.style.left = `${ x - elWidth }px`;
      element.style.marginLeft = '-8px';
    }
  } else if (xDir === 'between') {
    const left = (x + (parWidth / 2));

    if ((left + (elWidth / 2)) > winWidth) {
      element.style.right = `${ winWidth - (x + parWidth) }px`;
    } else if ((left - (elWidth / 2)) < 0) {
      element.style.left = `${ x }px`;
    } else {
      element.style.left = `${ left - (elWidth / 2) }px`;
    }
  } else if (xDir === 'after') {
    const left = (x + parWidth);

    if ((left + elWidth) > winWidth) {
      element.style.left = `${ x - elWidth }px`;
      element.style.marginLeft = '-8px';
    } else {
      element.style.left = `${ left }px`;
      element.style.marginLeft = '8px';
    }
  } else if (xDir === 'left') {
    if ((x + elWidth) > winWidth) {
      if ((x + (parWidth / 2) + (elWidth / 2)) > winWidth) {
        element.style.right = `${ winWidth - (x + parWidth) }px`;
      } else {
        element.style.left = `${ x + (parWidth / 2) - (elWidth / 2) }px`;
      }
    } else {
      element.style.left = `${ x }px`;
    }
  } else if (xDir === 'right') {
    const right = (winWidth - (x + parWidth));

    if ((right + elWidth) > winWidth) {
      if ((right + (parWidth / 2) + (elWidth / 2)) > winWidth) {
        element.style.left = `${ x }px`;
      } else {
        element.style.right = `${ (right + (parWidth / 2)) - (elWidth / 2) }px`;
      }
    } else {
      element.style.right = `${ right }px`;
    }
  }

  if (yDir === 'above') {
    if ((y - elHeight) < 0) {
      element.style.top = `${ y + parHeight }px`;
      element.style.marginTop = '8px';
    } else {
      element.style.top = `${ y - elHeight }px`;
      element.style.marginTop = '-8px';
    }
  } else if (yDir === 'between') {
    if ((y + (elHeight / 2)) > winHeight) {
      element.style.top = `${ y + parHeight - elHeight }px`;
    } else if ((y - (elHeight / 2)) < 0) {
      element.style.top = `${ y }px`;
    } else {
      element.style.top = `${ y + (parHeight / 2) - (elHeight / 2) }px`;
    }
  } else if (yDir === 'below') {
    if ((y + parHeight + elHeight) > winHeight) {
      element.style.top = `${ y - elHeight }px`;
      element.style.marginTop = '-8px';
    } else {
      element.style.top = `${ y + parHeight }px`;
      element.style.marginTop = '8px';
    }
  } else if (yDir === 'top') {
    if ((y + elHeight) > winHeight) {
      element.style.top = `${ y + parHeight - elHeight }px`;
    } else {
      element.style.top = `${ y }px`;
    }
  } else if (yDir === 'bottom') {
    if ((y + parHeight - elHeight) < 0) {
      element.style.top = `${ y }px`;
    } else {
      element.style.top = `${ y + parHeight - elHeight }px`;
    }
  }
}
