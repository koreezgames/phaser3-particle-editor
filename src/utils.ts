import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import shapesIMAGE from './canvas/assets/shapes.png';
import shapesJSON from './canvas/assets/shapes.json';
import _isEqual from 'lodash/isEqual';

import {
  emitterConfig as emitterInitialConfig,
  zoneEdgeSources,
  ATLAS_FILE_NAME,
  ARCHIVE_EXTENSION,
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
        if (typeof onSourceChange === 'function') {
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

const saveProject = async (props: any) => {
  const { canvasSize, name, emitters, backgroundData } = props;
  const shapeData = await fetch(shapesIMAGE);
  const shapeBuffer = await shapeData.arrayBuffer();
  const editor = { ...canvasSize, name, backgroundData };

  saveZip({
    zipName: name,
    extension: ARCHIVE_EXTENSION,
    jsonFiles: [
      {
        fileName: ATLAS_FILE_NAME,
        json: JSON.stringify(shapesJSON),
      },
      {
        fileName: 'emitters',
        json: JSON.stringify(emitters),
      },
      {
        fileName: 'editor',
        json: JSON.stringify(editor),
      },
    ],
    pngFiles: [
      {
        fileName: ATLAS_FILE_NAME,
        buffer: shapeBuffer,
      },
    ],
  });
};

const exportProject = async (
  name: string,
  emitters: any[],
  exportHidden: boolean,
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

  const shapeData = await fetch(shapesIMAGE);
  const shapeBuffer = await shapeData.arrayBuffer();

  saveZip({
    zipName: name,
    extension: 'zip',
    jsonFiles: [
      {
        fileName: ATLAS_FILE_NAME,
        json: JSON.stringify(shapesJSON),
      },
      {
        fileName: name,
        json: configsJSON,
      },
    ],
    pngFiles: [
      {
        fileName: ATLAS_FILE_NAME,
        buffer: shapeBuffer,
      },
    ],
  });
};

interface SaveZipProps {
  zipName: string;
  extension: string;
  jsonFiles: any[];
  pngFiles: any[];
}

const saveZip = (config: SaveZipProps) => {
  let { zipName, jsonFiles, pngFiles, extension } = config;
  zipName = zipName === 'shapes' ? 'particle_shapes' : zipName;

  const zip = new JSZip();

  pngFiles.forEach((pngFile: any) => {
    zip.file(`${pngFile.fileName}.png`, pngFile.buffer);
  });

  jsonFiles.forEach((jsonFile: any) => {
    zip.file(`${jsonFile.fileName}.json`, jsonFile.json);
  });

  zip.generateAsync({ type: 'blob' }).then(
    (blob: any) => {
      saveAs(blob, `${zipName}.${extension}`);
    },
    (err: any) => {
      console.error(err);
    },
  );
};

const getZoneShapeProps = (type: string) => {
  return zoneEdgeSources.find(({ shapeType }) => shapeType === type);
};

const getFileExtension = (fileName: string) => {
  return fileName.slice(fileName.lastIndexOf('.') + 1);
};

const validateZip = (zip: any) => {
  const validKeys = [
    `${ATLAS_FILE_NAME}.png`,
    `${ATLAS_FILE_NAME}.json`,
    'emitters.json',
    'editor.json',
  ].sort();
  const keys = Object.keys(zip.files).sort();
  return _isEqual(validKeys, keys);
};

const execute = (jsonString: string) => {
  return new Function(`return ${jsonString}`)();
};

const getImageSize = (base64: any, cb: any) => {
  const image = new Image();
  image.src = base64;

  image.onload = () => {
    cb(image.width, image.height);
  };
};

export {
  getImageSize,
  execute,
  getFileExtension,
  validateZip,
  hasBoth,
  deepCopy,
  hasKey,
  getPickerColor,
  getEmitterIndex,
  getEmitterConfig,
  getNewEmitterID,
  saveZip,
  initialConfig,
  saveProject,
  validateForm,
  getZoneShapeProps,
  exportProject,
};
