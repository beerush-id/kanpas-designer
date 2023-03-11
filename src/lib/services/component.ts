import { reactive, type Reactivities } from '@beerush/reactor';
import { nanoid } from 'nanoid';
import { Element } from './element';

export type Slot = {
  name: string;
  description?: string;
}

export type ComponentRole = 'component' | 'layout' | 'page';

export class Component extends Element {
  public encapsulated: boolean = true;

  constructor(
    public role: ComponentRole,
    public id: string = nanoid(),
    public tagName: string = 'section',
    public classList: string[] = []
  ) {super();}
}

export class ComponentStore {
  public components: Reactivities<Component>[] = reactive<Component[], true>([], true);

  public get(id: string): Reactivities<Component> | void {
    return this.components.find(c => c.id === id);
  }

  public create(
    role: ComponentRole = 'component',
    tag: string = 'section',
    classList: string[] = []
  ): Reactivities<Component> {
    const component = reactive<Component, true>(new Component(role, nanoid(), tag, classList), true);
    this.components.push(component);
    return component;
  }

  public delete(id: string) {
    const c = this.get(id);

    if (c) {
      this.components.splice(this.components.indexOf(c), 1);
    }
  }
}

export const components = new ComponentStore();
