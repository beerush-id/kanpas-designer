import { type Reactive, reactive } from '@beerush/reactor';

export type DeviceMockup = {
  name: string;
  width: number;
  height: number;
  description?: string;
  portraitSupport?: boolean;
  defaultMode?: 'landscape' | 'portrait';
}

export type DeviceSize = number;

export class Mockup {
  public enabled = true;
  public mode: 'landscape' | 'portrait' = 'landscape';
  public view3d?: boolean;
  public notch?: boolean;
  public active: DeviceMockup = {} as never;

  public width: DeviceSize = 0;
  public height: DeviceSize = 0;

  public fullScreen?: boolean;
  public controlHide?: boolean;

  public expandedHeaderMenu?: boolean;
  public collapsibleHeader?: boolean;

  constructor(public devices: DeviceMockup[]) {
    this.use('laptop');
  }

  public get(name: string): DeviceMockup {
    return this.devices.find(device => device.name === name) as never;
  }

  public use(name: string) {
    this.active = this.get(name);
    this.mode = this.active.defaultMode || 'landscape';

    if (this.mode === 'portrait') {
      this.width = this.active.height;
      this.height = this.active.width;
    } else {
      this.width = this.active.width;
      this.height = this.active.height;
    }
  }

  public rotate() {
    if (this.active && this.active.portraitSupport) {
      if (this.mode === 'landscape') {
        this.width = this.active.height;
        this.height = this.active.width;
        this.mode = 'portrait';
      } else {
        this.width = this.active.width;
        this.height = this.active.height;
        this.mode = 'landscape';
      }
    }
  }

  public maximize() {
    this.fullScreen = true;
    this.controlHide = true;
  }

  public minimize() {
    this.fullScreen = false;
    this.controlHide = false;
  }

  public toggleMax() {
    if (this.fullScreen) {
      this.minimize();
    } else {
      this.maximize();
    }
  }
}

export const mockup: Reactive<Mockup> = reactive(new Mockup([
  {
    name: 'desktop',
    width: 1920,
    height: 1080,
    description: 'Common desktop screen size.'
  },
  {
    name: 'laptop',
    width: 1366,
    height: 768,
    description: 'Common laptop screen size.'
  },
  {
    name: 'tablet',
    width: 1080,
    height: 810,
    description: 'Common laptop screen size.',
    defaultMode: 'landscape',
    portraitSupport: true
  },
  {
    name: 'mobile',
    width: 844,
    height: 390,
    description: 'Common mobile screen size.',
    defaultMode: 'portrait',
    portraitSupport: true
  },
]) as never, true);
