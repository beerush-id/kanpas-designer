import { navigation } from "./navigation";

export const scaleIn = (element: HTMLElement) => {
  if (navigation.navigating) return;
  element.classList.add('kanpas-scale-in');
  return { duration: 300 };
};

export const scaleOut = (element: HTMLElement) => {
  if (navigation.navigating) return;
  element.classList.add('kanpas-scale-out');
  return { duration: 200 };
};

export const fadeIn = (element: HTMLElement) => {
  if (navigation.navigating) return;
  element.classList.add('kanpas-fade-in');
  return { duration: 300 };
};

export const fadeOut = (element: HTMLElement) => {
  if (navigation.navigating) return;
  element.classList.add('kanpas-fade-out');
  return { duration: 200 };
};
