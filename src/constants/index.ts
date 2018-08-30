
import blendModes from './blendModes';
import easing from './easing';
import emitterConfig from './emitterConfig';
import frames from './frames';
import zoneEdgeSources from './zoneEdgeSources';

const zoneEdgeSourceTitles = zoneEdgeSources.map(({ name }) => ({
  text: name,
  value: name
}));

const EMITTER_NAME_PREFIX = 'Emitter_';
const DEFAULT_DEBUG_MODES = {
  emitZone: true,
  deathZone: true
};

export {
  blendModes, easing, emitterConfig, frames, zoneEdgeSources, zoneEdgeSourceTitles,
  EMITTER_NAME_PREFIX, DEFAULT_DEBUG_MODES
};
