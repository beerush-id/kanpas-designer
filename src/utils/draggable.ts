import type { Reactive, Subscriber } from '@beerush/reactor';

export type DragRect = {
  x?: number;
  y?: number;
  e?: MouseEvent;
}

export function capture(element: HTMLElement, scale = 1): Reactive<DragRect> {
  const subscribers: Subscriber<DragRect>[] = [];

  const r: Reactive<DragRect> = {
    x: 0,
    y: 0,

    subscribe: (publish: Subscriber<DragRect>) => {
      publish(r);

      if (!subscribers.length) {
        element.addEventListener('mousedown', dragStart);
        window.addEventListener('mousemove', drag);
        window.addEventListener('mouseup', dragEnd);
      }

      subscribers.push(publish);

      return () => {
        subscribers.splice(subscribers.indexOf(publish), 1);

        if (!subscribers.length) {
          element.removeEventListener('mousedown', dragStart);
          window.removeEventListener('mousemove', drag);
          window.removeEventListener('mouseup', dragEnd);
        }
      };
    },
    set: (val) => {
      if (val) {
        r.x = val.x || 0;
        x = r.x;
        r.y = val.y || 0;
        y = r.y;
      }
    }
  };

  let s: MouseEvent;
  let x = 0;
  let y = 0;

  const dragStart = (e: MouseEvent) => {
    if (e.button === 0) {
      e.preventDefault();
      e.stopPropagation();
      s = e;

      emit();
    }
  };

  const drag = (e: MouseEvent) => {
    if (s) {
      e.preventDefault();
      e.stopPropagation();

      if (e.shiftKey) {
        r.x = x + Math.round((e.x - s.x) / scale);
      } else if (e.ctrlKey) {
        r.y = y + Math.round((e.y - s.y) / scale);
      } else {
        r.x = x + Math.round((e.x - s.x) / scale);
        r.y = y + Math.round((e.y - s.y) / scale);
      }

      r.e = e;

      emit();
    }
  };

  const dragEnd = () => {
    if (s) {
      x = r.x as never;
      y = r.y as never;

      s = null as never;

      delete r.e;

      emit();
    }
  };

  const emit = () => {
    for (const publish of subscribers) {
      publish(r);
    }
  };

  return r;
}
