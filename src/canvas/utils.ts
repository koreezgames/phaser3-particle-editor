import { deepCopy, getEmitterConfig, initialConfig } from '../utils';
import { CanvasScene } from './scenes';

const createEmitter = (scene: CanvasScene, config: any, name: string) => {
  let emitterConfig = config ? getEmitterConfig(config) : initialConfig;
  const emitter = scene.particle.createEmitter(emitterConfig);
  emitter.name = name;
};

const removeEmitter = (scene: CanvasScene, emitter: any) => {
  const emitters = scene.particle.emitters.list;
  const index = emitters.indexOf(emitter);
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

  if (!bounds) {
    (emitter as any).bounds = null;
  }
  if (!emitZone) {
    (emitter as any).emitZone = null;
  }
  if (!deathZone) {
    (emitter as any).deathZone = null;
  }
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
    switch (shapeType) {
      case 'Rectangle':
      case 'Ellipse':
      case 'Circle': {
        _source.x = _source.x + x;
        _source.y = _source.y + y;
        break;
      }
      case 'Line': {
        _source.x1 = _source.x1 + x;
        _source.y1 = _source.y1 + y;
        _source.x2 = _source.x2 + x;
        _source.y2 = _source.y2 + y;
        break;
      }
      case 'Triangle': {
        _source.x1 = _source.x1 + x;
        _source.y1 = _source.y1 + y;
        _source.x2 = _source.x2 + x;
        _source.y2 = _source.y2 + y;
        _source.x3 = _source.x3 + x;
        _source.y3 = _source.y3 + y;
        break;
      }
      default:
        break;
    }
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
