// import { autorun } from 'mobx';
// import { deepCopy, getEmitterConfig, getEmitterIndex } from '../../utils';
import {
  createEmitter,
  changeEmitter,
  removeEmitter,
  clearZoneGraphic,
  drawDebugZoneGraphic,
} from '../utils';
import emitterStore from '../../stores/emitterStore';
import { autorun, toJS } from 'mobx';
import { getEmitterConfig } from '../../utils';

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

  syncPhaserEmittersToEmitters(emitters: any, currentEmitter: any) {
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

  drawDebugZones(debugModes: any, emitters: any, emitterIndex: number) {
    const configZone: { deathZone?: any; emitZone?: any } = getEmitterConfig(
      emitters[emitterIndex].config,
    );

    clearZoneGraphic(this.deathZoneDebugGraphics);
    clearZoneGraphic(this.emitZoneDebugGraphics);

    if (debugModes.deathZone && configZone.deathZone !== undefined) {
      this.deathZoneDebugGraphics = drawDebugZoneGraphic(
        configZone.deathZone,
        this,
        0x00ff00,
      );
    }
    if (debugModes.emitZone && configZone.emitZone !== undefined) {
      this.emitZoneDebugGraphics = drawDebugZoneGraphic(
        configZone.emitZone,
        this,
        0x00ffff,
        'EmitZone',
        configZone,
      );
    }
  }

  redraw() {
    const { emitters, currentEmitter, emitterIndex } = emitterStore;
    const { debugModes } = currentEmitter;
    this.syncPhaserEmittersToEmitters(emitters, currentEmitter);
    this.drawDebugZones(debugModes, emitters, emitterIndex);
  }
}
