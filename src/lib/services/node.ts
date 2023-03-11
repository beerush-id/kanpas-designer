import type { Reactive } from '@beerush/reactor';
import { reactive } from '@beerush/reactor';
import type { Component } from './component';
import type { Element } from './element';

export type Node = {
  id: string;
  name: string;
  type: 'element' | 'component';
  classList: string[];

  description?: string;
  children?: Node[];
  parentId?: string;
}

export type ElementNode = {
  type: 'element';
  element: Element;
}

export type ComponentNode = {
  type: 'component';
  component: Component;
}

export class NodeList {
  public nodes: Reactive<Node[]> = reactive<Node[]>([]);
}
