import { type Reactive, reactive } from '@beerush/reactor';

export class Canvas {
  public scale = 1;
  public scaleStep = 0.05;
  public centered = true;
  public requestCenter?: boolean;

  public zoomIn(): void {
    this.scale += this.scaleStep;
  }

  public zoomOut(): void {
    this.scale -= this.scaleStep;
  }

  public resetZoom(): void {
    this.scale = 1;
  }

  public center(): void {
    this.requestCenter = true;
  }
}

export const canvas: Reactive<Canvas> = reactive(new Canvas() as never);
