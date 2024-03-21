import type { Reactivities } from '@beerush/reactor';
import { reactive } from '@beerush/reactor';
import { createStyles } from '@utils/panel.js';
import { nanoid } from 'nanoid';
import type { Component, Slot } from './component.js';

export type ActionTag = 'a' | 'button';
export type SectionTag = 'header' | 'main' | 'footer' | 'section' | 'nav' | 'aside' | 'details' | 'div';
export type InlineTag = 'span' | 'br';
export type InputTag = 'form' | 'input' | 'select' | 'option' | 'textarea';
export type ListTag = 'ul' | 'ol' | 'li';
export type MediaTag = 'canvas' | 'img' | 'svg' | 'audio' | 'video';
export type TableTag = 'table' | 'tr' | 'th' | 'td';
export type TextTag = 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'p'
  | 'strong'
  | 'label'
  | 'article'
  | 'blockquote'
  | 'small'
  | 'sub'
  | 'sup';

export type TagRef = {
  label: string;
  description?: string;
}

export const ACTION_TAGS: Array<{
  name: ActionTag;
} & TagRef> = [];

export const SECTION_TAGS: Array<{
  name: SectionTag;
} & TagRef> = [];

export const INLINE_TAGS: Array<{
  name: InlineTag;
} & TagRef> = [];

export const INPUT_TAGS: Array<{
  name: InputTag;
} & TagRef> = [];

export const LIST_TAGS: Array<{
  name: ListTag;
} & TagRef> = [];

export const MEDIA_TAGS: Array<{
  name: MediaTag;
} & TagRef> = [];

export const TABLE_TAGS: Array<{
  name: TableTag;
} & TagRef> = [];

export const TEXT_TAGS: Array<{
  name: TextTag;
} & TagRef> = [];

export class Element {
  public name?: string;
  public description?: string;
  public attributes: { [key: string]: unknown } = {};
  public children: Array<Element | Slot | Component> = [];
  public styles = createStyles();
  public stateStyles = {};
  public value?: unknown;

  constructor(
    public id = nanoid(8),
    public tagName = 'section',
    public classList: string[] = []
  ) {}

  public append(child: Element | Component | Slot) {
    this.children.push(child);
  }

  public prepend(child: Element | Component | Slot) {
    this.children.unshift(child);
  }

  public set(name: string, value: unknown) {
    this.attributes[name] = value;
  }

  public rem(name: string) {
    delete this.attributes[name];
  }

  public write(value: unknown) {
    this.value = value;
  }
}

export class TextElement extends Element {
  constructor(
    public id = nanoid(8),
    public tagName: TextTag = 'p',
    public classList: string[] = []
  ) {
    super(id, tagName, classList);
  }
}

export class ElementStore {
  public elements: Reactivities<Element>[] = reactive([], true);

  public get(id: string) {
    return this.elements.find(e => e.id === id);
  }

  public create(tag: string = 'div', classList: string[] = []): Reactivities<Element> {
    const element = reactive<Element, true>(new Element(nanoid(), tag, classList));
    this.elements.push(element);
    return element;
  }

  public delete(id: string) {
    const e = this.get(id);

    if (e) {
      this.elements.splice(this.elements.indexOf(e), 1);
    }
  }
}

export const elements = new ElementStore();
