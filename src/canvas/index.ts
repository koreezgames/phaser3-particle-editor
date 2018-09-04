import getGameConfig from './config';
import { CanvasScene, PreloadScene } from './scenes';
import Game from './game';

const initCanvas = (height: number, width: number) => {
  const config = getGameConfig(height, width, [PreloadScene, CanvasScene]);
  (window as any).game = new Game(config);
};

export default initCanvas;
