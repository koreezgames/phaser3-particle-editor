import editorStore from '../../stores/editorStore';
import { autorun, IReactionDisposer } from 'mobx';

export default class Background extends Phaser.Scene {
  private backgroundImage: Phaser.GameObjects.Image;
  private autorun: IReactionDisposer;
  constructor() {
    super('Background');
  }

  create() {
    this.events.once('destroy', this.destroy, this);
    this.autorun = autorun(this.syncBgToConfigBg.bind(this));
  }

  destroy() {
    this.autorun();
  }

  syncBgToConfigBg() {
    const { data } = editorStore.background;
    if (this.backgroundImage) {
      this.backgroundImage.destroy();
      this.textures.remove('_bg');
    }
    if (data) {
      this.textures.addBase64('_bg', editorStore.background.data);
      this.textures.once('addtexture', () => {
        this.backgroundImage = this.add.image(0, 0, '_bg').setOrigin(0, 0);
      });
    }
  }
}
