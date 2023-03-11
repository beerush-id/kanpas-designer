import type { Reactive } from '@beerush/reactor';
import { reactive } from '@beerush/reactor';
import { nanoid } from 'nanoid';

export type FeatureMeta = {
  title?: string;
  description?: string;
}

export type Feature = {
  id: string;
  name: string;

  meta?: FeatureMeta;
}

export class FeatureStore {
  public features: Reactive<Reactive<Feature>[]> = reactive([] as never);

  public create(name: string): Reactive<Feature> {
    const feature = reactive({ id: nanoid(8), name });
    this.features.push(feature);
    return feature;
  }

  public get(id: string): Reactive<Feature> {
    return this.features.find(f => f.id === id) as never;
  }
}

export const features = new FeatureStore();
