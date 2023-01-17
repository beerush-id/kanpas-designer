import { Element } from './element';

export class Component extends Element {
  public encapsulated?: boolean;
  public slots: ComponentSlot[] = [];
  public children: Array<Element | Component> = [];

  public append(child: Element | Component): void {
    super.append(child);
  }

  public prepend(child: Element | Component) {
    super.prepend(child);
  }
}

export class ComponentSlot {
  public description?: string;

  constructor(
    public name: string,
    public children: Array<Element | Component> = []
  ) {}
}
