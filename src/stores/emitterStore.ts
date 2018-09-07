import _set from 'lodash/set';
import { action, computed, observable } from 'mobx';
import {
  DEFAULT_DEBUG_MODES,
  emitterConfig as emitterInitialConfig,
  EMITTER_NAME_PREFIX,
} from '../constants';
import { deepCopy, getNewEmitterID, hasBoth, hasKey } from '../utils';
import _isPlainObject from 'lodash/isPlainObject';

export class EmitterStore {
  @observable
  emitters = [
    {
      id: 1,
      name: `${EMITTER_NAME_PREFIX}1`,
      config: emitterInitialConfig,
      debugModes: { ...DEFAULT_DEBUG_MODES },
    },
  ];

  @action.bound
  changeDebugMode(configName: string, checked: boolean) {
    this.currentEmitter.debugModes[configName] = checked;
  }

  @computed
  get currentEmitter() {
    return this.emitters[this.emitterIndex];
  }

  @computed
  get currentEmitterConfig() {
    return this.currentEmitter.config;
  }

  @observable
  lastEmitters: any[];

  @observable
  emitterIndex = 0;

  @action.bound
  changeEmitterConfig(configName: string, value: any, index?: number) {
    const emitter =
      index !== undefined ? this.emitters[index] : this.currentEmitter;
    _set(emitter.config, configName.split('>'), value);
  }

  @action.bound
  changePropertyType(configName: string) {
    const currentValue = this.currentEmitter.config[configName];
    const initialValue = emitterInitialConfig[configName];
    const isObjectInitValue = _isPlainObject(initialValue);
    const isObjectCurrentValue = _isPlainObject(currentValue);

    let newConfig;
    if (isObjectCurrentValue) {
      newConfig = isObjectInitValue ? [0] : initialValue;
    } else {
      newConfig = isObjectInitValue
        ? initialValue
        : { start: 0, end: 0, ease: 'Linear' };
    }
    this.changeEmitterConfig(configName, newConfig);
  }

  @action.bound
  toggleRandom(configName: string) {
    const currentValue = this.currentEmitter.config[configName];
    const newConfig = { ...currentValue };

    if (hasBoth(currentValue, 'min', 'max')) {
      const [start, end] = [newConfig.min, newConfig.max];
      newConfig.start = start;
      newConfig.end = end;
      delete newConfig.min;
      delete newConfig.max;
    } else {
      const [min, max] = [newConfig.start, newConfig.end];
      newConfig.min = min;
      newConfig.max = max;
      delete newConfig.start;
      delete newConfig.end;
    }
    this.changeEmitterConfig(configName, newConfig);
  }

  @action.bound
  changeSelectDropdown(configName: string, value: any) {
    if (value === 'Custom') {
      this.toggleSteps(configName);
    } else {
      this.toggleSteps(configName, true);
      this.changeEmitterConfig(`${configName}>ease`, value);
    }
  }

  toggleSteps(configName: string, hide: boolean = false) {
    const initialValue = emitterInitialConfig[configName];
    const currentValue = this.currentEmitter.config[configName];
    const newConfig = { ...currentValue };

    if (hide) {
      delete newConfig.steps;
      newConfig.ease = hasKey(initialValue, 'ease')
        ? initialValue.ease
        : 'Linear';
    } else {
      delete newConfig.ease;
      newConfig.steps = hasKey(initialValue, 'steps') ? initialValue.steps : 10;
    }
    this.changeEmitterConfig(configName, newConfig);
  }

  // emitter position
  @action.bound
  setEmitterPosition(x: number, y: number) {
    this.changeEmitterConfig('x', [parseInt(x as any, 10)]);
    this.changeEmitterConfig('y', [parseInt(y as any, 10)]);
  }

  @action.bound
  removeEmitter(index: number) {
    this.emitters.splice(index, 1);
    const currentEmitterIndex = index === 0 ? index : index - 1;
    this.changeEmitterIndex(currentEmitterIndex);
  }

  @action.bound
  addEmitter(emitterConfig?: any, prevDebugModes?: any) {
    const id = getNewEmitterID(this.emitters);
    const name = `${EMITTER_NAME_PREFIX}${id}`;
    const config = emitterConfig ? emitterConfig : emitterInitialConfig;
    const debugModes = prevDebugModes
      ? { ...prevDebugModes }
      : { ...DEFAULT_DEBUG_MODES };
    this.emitters.push({ id, name, config, debugModes });
    this.setEmitterIndex(this.emitters.length - 1);
  }

  @action.bound
  copyEmitter(index: number) {
    const { config, debugModes } = this.emitters[index];
    this.addEmitter(deepCopy(config), debugModes);
  }

  @action.bound
  changeEmitterIndex(index: number) {
    this.emitterIndex = index;
  }

  @action.bound
  setEmitters(emitters: any) {
    this.emitters = emitters;
  }

  setEmitterIndex(index: number) {
    this.emitterIndex = index;
  }
}

export interface EmitterStoreProp {
  emitterStore?: EmitterStore;
}

export default new EmitterStore();
