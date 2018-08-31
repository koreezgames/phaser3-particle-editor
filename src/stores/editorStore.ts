import { action, observable } from 'mobx';
import { validateForm } from '../utils';

export class EditorStore {
  @observable
  created: boolean;

  @observable
  name = {
    value: 'MyProject',
    error: false
  };

  @observable
  height = {
    value: 600,
    error: false
  };

  @observable
  width = {
    value: 800,
    error: false
  };

  @action.bound
  setStatus(status: boolean) {
    validateForm(this, () => this.created = status, this.setError.bind(this));
  }

  @action.bound
  changeConfig(configName: string, value: string) {
    this[configName].value = value;
  }

  @action.bound
  setError(configName: string, errorStatus: boolean = true) {
    this[configName].error = errorStatus;
  }
}

export interface EditorStoreProp {
  editorStore?: EditorStore;
}

export default new EditorStore();
