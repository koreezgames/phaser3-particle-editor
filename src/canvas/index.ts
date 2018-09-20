import getGameConfig from './config';
import { CanvasScene, PreloadScene, BackgroundScene } from './scenes';
import Game from './game';

const initCanvas = (height: number, width: number) => {
  const config = getGameConfig(height, width, [
    PreloadScene,
    BackgroundScene,
    CanvasScene,
  ]);
  const parent: HTMLDivElement = document.getElementById(
    'phaser-canvas',
  ) as HTMLDivElement;
  (window as any).game = new Game(config, parent);
};

export default initCanvas;
