import { browser as isBrowser } from '$app/environment';

export const browser = {
  isBrowser,

  log(...args: unknown[]) {
    if (isBrowser) {
      console.log(...args);
    }
  },
  info(...args: unknown[]) {
    if (isBrowser) {
      console.info(...args);
    }
  },
  warn(...args: unknown[]) {
    if (isBrowser) {
      console.warn(...args);
    }
  },
  error(...args: unknown[]) {
    if (isBrowser) {
      console.error(...args);
    }
  }
};
