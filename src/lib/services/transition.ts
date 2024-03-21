import { navigation } from './navigation.js';

export const scaleIn = (element: HTMLElement) => {
  if (navigation.navigating) return;
  element.classList.add('kds-scale-in');
  return { duration: 300 };
};

export const scaleOut = (element: HTMLElement) => {
  if (navigation.navigating) return;
  element.classList.add('kds-scale-out');
  return { duration: 200 };
};

export const fadeIn = (element: HTMLElement) => {
  if (navigation.navigating) return;
  element.classList.add('kds-fade-in');
  return { duration: 300 };
};

export const fadeOut = (element: HTMLElement) => {
  if (navigation.navigating) return;
  element.classList.add('kds-fade-out');
  return { duration: 200 };
};
