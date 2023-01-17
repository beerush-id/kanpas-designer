import { goto } from '$app/navigation';
import type { Reactive } from '@beerush/reactor';
import { reactive } from '@beerush/reactor';
import routes from '@data/routes.json';
import type { AfterNavigate } from '@sveltejs/kit';
import UrlPattern from 'url-pattern';

type Entries<T> = {
  [K in keyof T]: [ K, T[K] ];
}[keyof T][];

export type Route = {
  name: string;
  title: string;
  endpoint: string;

  // Optional properties.
  icon?: string;
  children?: Route[];

  // Computed properties
  path?: string;
  pattern?: UrlPattern;
  parent?: string;
  active?: boolean;
}

export type RouteGroup = {
  [name: string]: Route[];
}

export type NamedRoutes = {
  [name: string]: Route;
}

export type NavigationOptions = {
  replaceState?: boolean;
  noScroll?: boolean;
  keepFocus?: boolean;
  state?: unknown;
  invalidateAll?: boolean;
}

export class Navigation {
  public navigating?: boolean;
  public routerGroups: Reactive<RouteGroup> = reactive<RouteGroup>({}, true);
  public mappedRoutes: Reactive<NamedRoutes> = reactive<NamedRoutes>({});

  public get routes(): Route[] {
    return Object.entries(this.mappedRoutes).map(([ , route ]) => route) as Route[];
  }

  constructor(routes: RouteGroup = {}) {
    Object.keys(routes).forEach(name => {
      this.routerGroups[name] = routes[name];

      for (const child of this.routerGroups[name]) {
        this.mapRoute(child.name, child);
      }
    });
  }

  private mapRoute(name: string, route: Route): void {
    this.mappedRoutes[name] = route;

    route.path = this.cleanupUrl(`/${ route.path || route.endpoint }`);
    route.pattern = new UrlPattern(route.path);

    if (Array.isArray(route.children)) {
      for (const child of route.children) {
        child.path = this.cleanupUrl(`/${ route.path }/${ child.endpoint }`);
        child.parent = name;

        this.mapRoute(`${ name }.${ child.name }`, child);
      }
    }
  }

  private cleanupUrl(url: string) {
    return url.replace(/\/+/g, '/').replace(/\/$/, '');
  }

  public get(name: string): Route {
    return this.mappedRoutes[name];
  }

  public async goto(name: string | URL, options?: NavigationOptions): Promise<void> {
    if (typeof name === 'string') {
      const route = this.get(name);

      if (route) {
        return goto(route.path as string, options);
      }
    }

    return goto(name, options);
  }

  public activate(nav: AfterNavigate) {
    const { to } = nav;

    for (const route of this.routes) {
      route.active = false;
    }

    if (to) {
      const route = this.getByUrl(to.url);

      if (route) {
        route.active = true;
        this.setParentState(route, true);
      }
    }
  }

  public setParentState(route: Route, isActive?: boolean) {
    if (route.parent) {
      const parent = this.get(route.parent);

      if (parent) {
        parent.active = true;
        this.setParentState(parent, isActive);
      }
    }
  }

  public getByUrl(url: URL): Route | void {
    for (const [ , route ] of Object.entries(this.mappedRoutes) as Entries<NamedRoutes>) {
      if (route.pattern?.match(url.pathname)) {
        return route as Route;
      }
    }
  }
}

export const navigation: Reactive<Navigation> = reactive(new Navigation(routes) as never);
