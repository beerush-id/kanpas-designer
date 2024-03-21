import { nanoid } from 'nanoid';
import type { Component } from './component.js';

export type Common = {
  name?: string;
  expanded?: boolean;
  color?: string;
  description?: string;
};

export type BaseStep = Common & { actions: Action[] };
export type Step = VisitStep | MountStep | DestroyStep | ElementStep;

export type VisitStep = {
  type: 'visit';
  path: string;
  children?: VisitStep[];
  expandChildren?: boolean;
} & BaseStep;

export type MountStep = {
  type: 'mount';
  targetId: string;
  component: Component;
} & BaseStep;

export type DestroyStep = {
  type: 'destroy';
  targetId: string;
  component: Component;
} & BaseStep;

export type ElementStep = {
  type: keyof GlobalEventHandlersEventMap;
  targetName: string;
  element: HTMLElement | HTMLInputElement;
} & BaseStep;

export type BaseAction = Common & { targetId: string; actions: Action[] };
export type Action = FeatureAction
  | RedirectExternalAction
  | ShowComponentAction
  | ShowElementAction
  | CallFunctionAction
  | CallServiceAction
  | ReadAction
  | WriteAction;

export type RedirectExternalAction = {
  type: 'redirect';
  target: 'internal' | 'external';
  url: string;
} & BaseAction;

export type FeatureAction = {
  type: 'show' | 'hide';
  target: 'feature';
} & BaseAction;

export type ShowComponentAction = {
  type: 'show' | 'hide';
  target: 'component';
  componentId: string;
} & BaseAction;

export type ShowElementAction = {
  type: 'show' | 'hide';
  target: 'element';
  tagName: string;
} & BaseAction;

export type CallFunctionAction = {
  type: 'call';
  target: 'function';
  functionId: string;
  arguments: unknown[];
} & BaseAction;

export type CallServiceAction = {
  type: 'call';
  target: 'service';
  serviceId: string;
  methodName: string;
  arguments: unknown[];
} & BaseAction;

export type ReadAction = {
  type: 'read';
  target: 'state' | 'context';
} & BaseAction;

export type WriteAction = {
  type: 'write';
  target: 'state' | 'context';
  value: unknown;
} & BaseAction;

export class StepHelper<T extends Step> {
  constructor(public step: T) {}

  public then<A extends Action>(action: A) {
    this.step.actions.push(action);
  }
}

export class ActionHelper<T extends Action> {
  constructor(public action: T) {}

  public then<A extends Action>(action: A): void {
    this.action.actions?.push(action);
  }
}

export function create<T>(init: T): T {
  return { id: nanoid(8), ...init } as never;
}
