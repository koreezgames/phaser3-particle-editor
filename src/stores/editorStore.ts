import { action, observable } from 'mobx';

export class EditorStore {
  @observable
  public config = null;

  @observable
  phaserParentMountStatus = false;

  @action.bound
  public setConfig(config: any) {
    this.config = config;
  }
}

export interface EditorStoreProp {
  editorStore?: EditorStore;
}

export default new EditorStore();
