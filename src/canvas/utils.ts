import { deepCopy, getEmitterConfig, initialConfig } from '../utils';
import { CanvasScene } from './scenes';

const createEmitter = (scene: CanvasScene, config: any) => {
  let emitterConfig = config ? getEmitterConfig(config) : initialConfig;
  scene.particle.createEmitter(emitterConfig);
};

const removeEmitter = (scene: CanvasScene, index: number) => {
  const emitters = scene.particle.emitters.list;
  emitters.splice(index, 1);
};

const changeEmitter = (
  emitter: Phaser.GameObjects.Particles.ParticleEmitter,
  config: any,
) => {
  const newConfig: {
    deathZone?: any;
    emitZone?: any;
    bounds?: any;
  } = getEmitterConfig(config);
  emitter.fromJSON(newConfig);

  const { deathZone, emitZone, bounds } = newConfig;

  if (bounds) {
    (emitter as any).bounds = null;
  }
  if (emitZone) {
    (emitter as any).emitZone = null;
  }
  if (deathZone) {
    (emitter as any).deathZone = null;
  }
  // tslint:disable-next-line
  console.log(JSON.stringify(newConfig));
};

const drawDebugZoneGraphic = (
  zone: any,
  scene: Phaser.Scene,
  color: number,
  type?: string,
  config?: any,
) => {
  const { shapeType, source } = zone;
  const shapeTypeGraphic = shapeType === 'Rectangle' ? 'Rect' : shapeType;
  const _source = deepCopy(source);

  const graphic = scene.add.graphics();
  graphic.lineStyle(1, color, 1);

  if (type === 'EmitZone') {
    const { x, y } = config;
    _source.x = _source.x + x;
    _source.y = _source.y + y;
  }

  const shape = new Phaser.Geom[shapeType](...Object.values(_source));
  graphic[`stroke${shapeTypeGraphic}Shape`](shape);
  return graphic;
};

const clearZoneGraphic = (graphic: Phaser.GameObjects.Graphics) => {
  if (graphic) {
    graphic.clear();
  }
};

export {
  createEmitter,
  removeEmitter,
  changeEmitter,
  drawDebugZoneGraphic,
  clearZoneGraphic,
};
