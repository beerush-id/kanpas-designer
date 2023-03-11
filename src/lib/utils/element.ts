export type ClientRect = {
  left: number;
  top: number;
  right: number;
  bottom: number;
  width: number;
  height: number;
}

/**
 * Generate a fixed positioning bounds of an element, relative to the window viewport or a parent element.
 * Return an element size, and the distance between the bounding box of the element and the target element/viewport.
 * For example, left is the distance between element's left bounding with the parent/viewport left bounding.
 * @param {HTMLElement} element
 * @param {HTMLElement} relativeTo
 * @param scale
 * @returns {ClientRect}
 */
export function offsetRect(element: HTMLElement, relativeTo?: HTMLElement | boolean, scale = 1): ClientRect {
  if (relativeTo) {
    const relation: HTMLElement = typeof relativeTo === 'boolean'
                                  ? element.parentElement as HTMLElement
                                  : relativeTo as HTMLElement;

    if (relation && typeof relation.getBoundingClientRect === 'function') {
      const { left: eLeft, top: eTop, width, height } = scaledClientRect(element, scale);
      const { left: rLeft, top: rTop, width: rWidth, height: rHeight } = scaledClientRect(relation, scale);

      const left = Math.round(eLeft - rLeft);
      const top = Math.round(eTop - rTop);
      const right = Math.round(rWidth - (left + width));
      const bottom = Math.round(rHeight - (top + height));

      return { width, height, left, top, right, bottom };
    } else {
      throw new Error('Invalid relativeTo argument. Must be boolean or HTML Element!');
    }
  } else {
    const { left, top, right, bottom, width, height } = scaledClientRect(element, scale);
    const { innerWidth, innerHeight } = window;
    return {
      width, height, left, top,
      right: Math.round((innerWidth / scale) - right),
      bottom: Math.round((innerHeight / scale) - bottom),
    };
  }
}

/**
 * Get scaled Bounding Client Rectangle of an element. All values will be divided by the scale, and will be rounded.
 * @param {HTMLElement} element
 * @param {number} scale
 * @returns {ClientRect}
 */
export function scaledClientRect(element: HTMLElement, scale = 1): ClientRect {
  const { left, top, right, bottom, width, height } = element.getBoundingClientRect();
  return {
    left: Math.round(left / scale),
    top: Math.round(top / scale),
    right: Math.round(right / scale),
    bottom: Math.round(bottom / scale),
    width: Math.round(width / scale),
    height: Math.round(height / scale),
  };
}
