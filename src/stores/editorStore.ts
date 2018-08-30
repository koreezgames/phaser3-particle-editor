import { action, observable } from 'mobx';

export class EditorStore {
  @observable
  config = null;

  @observable
  phaserParentMountStatus = false;

  @action.bound
  setConfig(config: any) {
    this.config = config;
  }
}

export default new EditorStore();
