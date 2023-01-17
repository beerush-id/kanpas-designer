import { type Reactive, reactive, resistant, type Subscriber, type Unsubscribe } from '@beerush/reactor';
import enUS from './i18n/en-US.json';

export type Language = {
  name: string;
  label: string;
  definitions: {
    [key: string]: string
  };
}

export type LanguageDefinitions = {
  [key: string]: string;
}

let translations: Reactive<LanguageDefinitions> = reactive({}) as never;
let unsubscribe: Unsubscribe;

const subscribers: Subscriber<unknown>[] = [];

export function use(lang: Language) {
  if (typeof unsubscribe === 'function') {
    unsubscribe();
  }

  translations = resistant(`lang:${ lang.name }`, lang.definitions);
  unsubscribe = translations.subscribe(() => speakAll());
}

use(enUS);

export function speak<T extends object>(key: string, ref?: T): string {
  if (translations[key]) {
    let translated: string = translations[key];

    if (ref) {
      for (const [ key, value ] of Object.entries(ref)) {
        translated = translated.replace(new RegExp(`%${ key }`, 'g'), value as string);
      }
    }

    return translated;
  }

  return key;
}

export function i18n(elem: HTMLElement, input: string | Array<string | object>) {
  let updated: string | Array<string | object> = input;

  speakTo(elem, updated);

  const sub = () => {
    speakTo(elem, updated);
  };

  subscribers.push(sub);

  return {
    update: (inp: string | Array<string | object>) => {
      updated = inp;
      speakTo(elem, updated);
    },
    destroy: () => subscribers.splice(subscribers.indexOf(sub), 1),
  };
}

function speakTo(elem: HTMLElement, input: string | Array<string | object>) {
  if (Array.isArray(input)) {
    elem.innerHTML = speak(input[0] as string, input[1] as never);
  } else {
    elem.innerHTML = speak(input);
  }
}

function speakAll() {
  for (const sub of subscribers) {
    if (typeof sub === 'function') {
      sub();
    }
  }
}
