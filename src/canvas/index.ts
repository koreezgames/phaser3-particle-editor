import getGameConfig from './config';
import { CanvasScene, PreloadScene } from './scenes';

const initCanvas = (height: number, width: number) => {
  const config = getGameConfig(height, width, [PreloadScene, CanvasScene]);
  (window as any).game = new Phaser.Game(config);
};

export default initCanvas;
