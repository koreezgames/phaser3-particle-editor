import getGameConfig from './config';
import { CanvasScene, PreloadScene } from './scenes';
import Game from './game';

const initCanvas = (height: number, width: number) => {
  const config = getGameConfig(height, width, [PreloadScene, CanvasScene]);
  const parent: HTMLDivElement = document.getElementById(
    'phaser-canvas',
  ) as HTMLDivElement;
  (window as any).game = new Game(
    config,
    parent.clientWidth,
    parent.clientHeight,
  );
};

export default initCanvas;
