import { action, observable } from 'mobx';
import {
  validateForm,
  getFileExtension,
  validateZip,
  getBase64ImageSize,
} from '../utils';
import JSZip from 'jszip';
import { ARCHIVE_EXTENSION, ATLAS_FILE_NAME } from '../constants';

export class EditorStore {
  @observable
  created: boolean;

  @observable
  openSaveDialog: boolean = false;

  @observable
  openExportDialog: boolean = false;

  @observable
  openImportDialog: boolean = false;

  @observable
  openBackgroundDialog: boolean = false;

  @observable
  exportHiddenEmitters: boolean = false;

  @observable
  background = {
    data: null,
    loading: false,
    size: {
      width: 0,
      height: 0,
    },
  };

  @observable
  name = {
    value: 'MyProject',
    error: false,
  };

  @observable
  height = {
    value: 600,
    error: false,
  };

  @observable
  width = {
    value: 800,
    error: false,
  };

  @observable
  file: any = null;

  @observable
  fileError = false;

  @observable
  fileErrorText = '';

  @observable
  fileLoadingStatus = false;

  @action.bound
  setEditorProps(editorProps: any) {
    if (editorProps.backgroundData) {
      this.background.data = editorProps.backgroundData.data;
      this.background.size.width = editorProps.backgroundData.width;
      this.background.size.height = editorProps.backgroundData.height;
    } else {
      this.resetBackground();
    }
    this.width.value = editorProps.width;
    this.height.value = editorProps.height;
    this.name.value = editorProps.name;
  }

  @action.bound
  setInitialImportProps() {
    this.setFile(null);
    this.setFileError(false);
    this.setFileLoadingStatus(false);
  }

  setFileErrorText(text: string) {
    this.fileErrorText = text;
  }

  setFileLoadingStatus(status: boolean) {
    this.fileLoadingStatus = status;
  }

  @action.bound
  setStatus(status: boolean) {
    validateForm(this, () => (this.created = status), this.setError.bind(this));
  }

  @action.bound
  changeConfig(configName: string, value: string) {
    this[configName].value = value;
  }

  @action.bound
  setError(configName: string, errorStatus: boolean = true) {
    this[configName].error = errorStatus;
  }

  @action.bound
  setOpenExportDialog(value: boolean) {
    this.openExportDialog = value;
  }

  @action.bound
  setOpenSaveDialog(value: boolean) {
    this.openSaveDialog = value;
  }

  @action.bound
  setOpenImportDialog(value: boolean) {
    this.openImportDialog = value;
  }

  @action.bound
  setOpenBackgroundDialog(value: boolean) {
    this.openBackgroundDialog = value;
  }

  @action.bound
  setExportHiddenEmitters(value: boolean) {
    this.exportHiddenEmitters = value;
  }

  @action.bound
  setFile(file: any) {
    this.setFileLoadingStatus(false);
    this.file = file;
    if (file !== null) {
      this.setFileError(getFileExtension(file.name) !== ARCHIVE_EXTENSION);
      this.setFileErrorText(`Invalid file - ${this.file && this.file.name}`);
    }
  }

  @action.bound
  resetBackground() {
    this.background = {
      data: null,
      loading: false,
      size: {
        width: 0,
        height: 0,
      },
    };
  }

  @action.bound
  setBackground(background: any) {
    const extension = getFileExtension(background.name);
    if (extension !== 'png') {
      this.resetBackground();
    } else {
      this.background.loading = true;
      const reader = new FileReader();
      reader.readAsDataURL(background);
      reader.onload = (e: any) => {
        const base64 = e.target.result;
        getBase64ImageSize(base64, (width: number, height: number) => {
          this.background.size.width = width;
          this.background.size.height = height;
          this.background.data = base64;
          this.background.loading = false;
        });
      };
    }
  }

  setFileError(value: boolean) {
    this.fileError = value;
  }

  loadProject(file: any) {
    return JSZip.loadAsync(file);
  }

  onLoadSuccess(zip: any) {
    const result = Object.keys(zip.files).map(fileName => {
      const file = zip.files[fileName];
      const asyncType =
        getFileExtension(file.name) === 'png' ? 'uint8array' : 'text';
      return {
        value: null,
        name: fileName,
        promise: file.async(asyncType),
      };
    });

    const promises = result.map(fileInfo => fileInfo.promise);

    return Promise.all(promises).then(values => {
      const filtredResult = result.map((fileInfo, i) => ({
        value: values[i],
        name: fileInfo.name,
      }));
      return filtredResult;
    });
  }

  @action.bound
  async importProject() {
    this.setFileLoadingStatus(true);
    try {
      const zip = await this.loadProject(this.file);
      this.setFileLoadingStatus(false);
      const isValidZip = validateZip(zip);

      if (isValidZip) {
        try {
          const zipResult = await this.onLoadSuccess(zip);
          return zipResult.reduce(
            (acc: any, fileData) => {
              const { value, name } = fileData;
              switch (name) {
                case `${ATLAS_FILE_NAME}.png`: {
                  acc.atlas.image = value;
                  break;
                }
                case `${ATLAS_FILE_NAME}.json`: {
                  acc.atlas.json = JSON.parse(value);
                  break;
                }
                case 'emitters.json': {
                  acc.emitters = JSON.parse(value);
                  break;
                }
                case 'editor.json': {
                  acc.editor = JSON.parse(value);
                  break;
                }
                default:
                  break;
              }
              return acc;
            },
            { atlas: { image: null, json: null } },
          );
        } catch (err) {
          console.error(err);
          this.setFileError(true);
          this.setFileErrorText(`Invalid content!`);
        }
      } else {
        this.setFileError(true);
        this.setFileErrorText(`Invalid .${ARCHIVE_EXTENSION} file!`);
      }
    } catch (err) {
      console.error(err);
      this.setFileError(true);
      this.setFileErrorText('Loading error!');
    }

    return false;
  }
}

export interface EditorStoreProp {
  editorStore?: EditorStore;
}

export default new EditorStore();
