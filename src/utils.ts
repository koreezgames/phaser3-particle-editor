import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import shapesIMAGE from './canvas/assets/shapes.png';
import shapesJSON from './canvas/assets/shapes.json';

import {
  emitterConfig as emitterInitialConfig,
  zoneEdgeSources,
} from './constants';

const validateForm = (
  { name, height, width }: { name: any; height: any; width: any },
  onSuccess: () => {},
  onFail: (field: string) => {},
) => {
  let isValid = true;

  if (!isValidName(name.value)) {
    onFail('name');
    isValid = false;
  }

  if (!isValidSize(Number(height.value))) {
    onFail('height');
    isValid = false;
  }

  if (!isValidSize(Number(width.value))) {
    onFail('width');
    isValid = false;
  }

  if (isValid) {
    onSuccess();
  }
};

const isValidName = (name: string) => {
  return name !== '';
};

const isValidSize = (value: number) => {
  return value > 0;
};

const getEmitterConfig = (
  config: any,
  onSourceChange?: (source: any, shapeProps: any) => {},
) => {
  const newConfig = {};
  for (const key in config) {
    if (config.hasOwnProperty(key)) {
      const value = config[key];
      if (value === undefined) {
        continue;
      }

      if (value.hasOwnProperty('source')) {
        newConfig[key] = {
          ...value,
          source: new Phaser.Geom[value.shapeType](
            ...Object.values(value.source),
          ),
        };
        if (onSourceChange) {
          newConfig[key] = onSourceChange(newConfig[key], value.source);
        }
      } else {
        newConfig[key] =
          Array.isArray(value) && value.length === 1 && key !== 'tint'
            ? value[0]
            : value;
      }
    }
  }
  return newConfig;
};

const getNewEmitterID = (emitters: any) => {
  const IDs = emitters
    .map((emitter: any) => emitter.id)
    .sort((a: any, b: any) => a - b);
  let emitterID = null;

  if (IDs[0] !== 1) {
    emitterID = 1;
  } else {
    for (let i = 1; i < IDs.length; i++) {
      if (IDs[i] !== IDs[i - 1] + 1) {
        emitterID = IDs[i - 1] + 1;
        break;
      }
    }
    if (!emitterID) {
      emitterID = IDs.length + 1;
    }
  }

  return emitterID;
};

const initialConfig = getEmitterConfig(emitterInitialConfig);

const hasKey = (object: {}, key: string) => object.hasOwnProperty(key);

const hasBoth = (object: {}, key1: string, key2: string) =>
  object.hasOwnProperty(key1) && object.hasOwnProperty(key2);

const deepCopy = (object: {}) => JSON.parse(JSON.stringify(object));

const getPickerColor = (color: number) => {
  let result = `${color.toString(16)}`;
  const zeroCount = 6 - result.length;
  result = `#${'0'.repeat(zeroCount)}${result}`;
  return result;
};

const getEmitterIndex = (newEmitters: any, prevEmitters: any) => {
  const newEmittersCopy = deepCopy(newEmitters);
  const prevEmittersCopy = deepCopy(prevEmitters);
  const maxLength = Math.max(newEmittersCopy.length, prevEmittersCopy.length);
  let index = -1;
  for (let i = 0; i < maxLength; i++) {
    if (
      JSON.stringify(newEmittersCopy[i]) !== JSON.stringify(prevEmittersCopy[i])
    ) {
      index = i;
      break;
    }
  }
  return index;
};

interface Test {
  emittersJSON: any;
  name: string;
}
const exportProject = (
  name: string,
  emitters: any[],
  exportHidden?: boolean,
) => {
  const zoneSources: any[] = [];
  let configs: any = emitters.map(emitter =>
    getEmitterConfig(emitter.config, (source: any, shapeProps: any) => {
      const sourceCopy = { ...source };
      sourceCopy.source = `new Phaser.Geom.${source.shapeType}(${[
        Object.values(shapeProps),
      ]})`;
      delete sourceCopy.shapeType;
      zoneSources.push(sourceCopy.source);
      return sourceCopy;
    }),
  );

  if (exportHidden === false) {
    configs = configs.filter((config: any) => config.visible);
  }

  let configsJSON = JSON.stringify(configs);
  zoneSources.forEach((source: string) => {
    configsJSON = configsJSON.replace(`"${source}"`, `${source}`);
  });

  saveZip({
    emittersJSON: configsJSON,
    name: name,
  });
};
const saveZip = (config: Test) => {
  let { name, emittersJSON } = config;
  name = name === 'shapes' ? 'particle_shapes' : name;
  const zip = new JSZip();

  fetch(shapesIMAGE)
    .then(data => data.arrayBuffer())
    .then(buffer => {
      zip.file('shape.png', buffer);
      zip.file(`${name}.json`, emittersJSON);
      zip.file(`shapes.json`, JSON.stringify(shapesJSON));
      zip.generateAsync({ type: 'blob' }).then(
        (blob: any) => {
          saveAs(blob, `${name}.zip`);
        },
        (err: any) => {
          console.log(err);
        },
      );
    });
};

const getZoneShapeProps = (type: string) => {
  return zoneEdgeSources.find(({ shapeType }) => shapeType === type);
};

export {
  hasBoth,
  deepCopy,
  hasKey,
  getPickerColor,
  getEmitterIndex,
  getEmitterConfig,
  getNewEmitterID,
  saveZip,
  initialConfig,
  validateForm,
  getZoneShapeProps,
  exportProject,
};
