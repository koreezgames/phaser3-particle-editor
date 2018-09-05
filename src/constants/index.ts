import blendModes from './blendModes';
import easing from './easing';
import emitterConfig from './emitterConfig';
import frames from './frames';
import zoneEdgeSources, {
  deathZoneOptions,
  emitZoneOptions,
} from './zoneEdgeSources';

const deathZoneEdgeShapes = deathZoneOptions.map(source => ({
  text: source.shapeType,
  value: source.shapeType,
}));

const emitZoneEdgeShapes = emitZoneOptions.map(source => ({
  text: source.shapeType,
  value: source.shapeType,
}));

const EMITTER_NAME_PREFIX = 'Emitter_';
const DEFAULT_DEBUG_MODES = {
  emitZone: true,
  deathZone: true,
};

export {
  blendModes,
  easing,
  emitterConfig,
  frames,
  zoneEdgeSources,
  emitZoneEdgeShapes,
  deathZoneEdgeShapes,
  EMITTER_NAME_PREFIX,
  DEFAULT_DEBUG_MODES,
};
