// import { autorun } from 'mobx';
// import { deepCopy, getEmitterConfig, getEmitterIndex } from '../../utils';
import { createEmitter, changeEmitter, removeEmitter } from '../utils';
import emitterStore from '../../stores/emitterStore';
import { autorun, toJS } from 'mobx';

export default class Canvas extends Phaser.Scene {
  public particle: Phaser.GameObjects.Particles.ParticleEmitterManager;

  public deathZoneDebugGraphics: Phaser.GameObjects.Graphics;
  public emitZoneDebugGraphics: Phaser.GameObjects.Graphics;

  constructor() {
    super('Canvas');
  }
  create() {
    const { emitters } = emitterStore;

    this.particle = this.add.particles('shape');

    emitters.forEach(emitter => {
      createEmitter(this, emitter.config, emitter.name);
    });

    let clicked = false;

    this.input.on('pointerdown', () => {
      clicked = true;
    });

    this.input.on('pointerup', () => {
      clicked = false;
    });

    this.input.on('pointermove', ({ x, y }: { x: number; y: number }) => {
      if (clicked) {
        emitterStore.setEmitterPosition(x, y);
      }
    });
    autorun(this.redraw.bind(this));
  }

  syncPhaserEmittersToEmitters(
    emitters: any,
    currentEmitter: any,
    emitterIndex: number,
  ) {
    if (this.particle.emitters.list.length === toJS(emitters).length) {
      emitters.forEach((emitter: any, i: number) => {
        changeEmitter(this.particle.emitters.list[i], emitter.config);
      });
    } else if (this.particle.emitters.list.length < emitters.length) {
      createEmitter(this, currentEmitter.config, currentEmitter.name);
    } else {
      const removedEmitter = this.particle.emitters.list.filter(
        phaserEmitter => {
          for (let i = 0; i < emitters.length; i++) {
            if (phaserEmitter.name === emitters[i].name) {
              return false;
            }
          }
          return true;
        },
      );
      removeEmitter(this, removedEmitter[0]);
    }
  }

  redraw() {
    const { emitters, currentEmitter, emitterIndex } = emitterStore;
    this.syncPhaserEmittersToEmitters(emitters, currentEmitter, emitterIndex);
  }
}
