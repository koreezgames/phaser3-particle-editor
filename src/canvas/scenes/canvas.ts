// import { autorun } from 'mobx';
// import { deepCopy, getEmitterConfig, getEmitterIndex } from '../../utils';
import { createEmitter } from '../utils';

export default class Canvas extends Phaser.Scene {
  public particle: Phaser.GameObjects.Particles.ParticleEmitterManager;

  public deathZoneDebugGraphics: Phaser.GameObjects.Graphics;
  public emitZoneDebugGraphics: Phaser.GameObjects.Graphics;

  constructor() {
    super('Canvas');
  }
  create() {
    this.particle = this.add.particles('shape');
    createEmitter(this, null, 'hexagon');
    let clicked = false;

    this.input.on('pointerdown', () => {
      clicked = true;
    });

    this.input.on('pointerup', () => {
      clicked = false;
    });

    this.input.on('pointermove', ({ x, y }: { x: number; y: number }) => {
      if (clicked) {
        // emitterStore.setEmitterPosition(x, y);
      }
    });
    // autorun(this.redraw.bind(this));
  }

  // redraw() {
  //   const { emitters, currentEmitter, emitterIndex, lastEmitters } = emitterStore;
  //   const newEmitters = deepCopy(emitters);
  //   const { debugModes } = currentEmitter;

  //   if (lastEmitters.length) {
  //     const index = getEmitterIndex(newEmitters, lastEmitters);
  //     if (index !== null) {
  //       const config =
  //         index < emitters.length && emitters[index].config;

  //       if (newEmitters.length === lastEmitters.length) {
  //         const emitter = this.particle.emitters.list[index];
  //         changeEmitter(emitter, config); // change
  //       } else if (newEmitters.length > lastEmitters.length) {
  //         createEmitter(this, config); // add
  //       } else if (newEmitters.length < lastEmitters.length) {
  //         removeEmitter(this, index); // remove
  //       }
  //     }
  //     // debug mode
  //     const configZone: { deathZone?: any, emitZone?: any } =
  //       getEmitterConfig(emitters[emitterIndex].config);
  //     clearZoneGraphic(this.deathZoneDebugGraphics);
  //     clearZoneGraphic(this.emitZoneDebugGraphics);

  //     if (debugModes.deathZone && configZone.deathZone !== undefined) {
  //       this.deathZoneDebugGraphics = drawDebugZoneGraphic(
  //         configZone.deathZone,
  //         this,
  //         0x00ff00
  //       );
  //     }
  //     if (debugModes.emitZone && configZone.emitZone !== undefined) {
  //       this.emitZoneDebugGraphics = drawDebugZoneGraphic(
  //         configZone.emitZone,
  //         this,
  //         0x00ffff,
  //         'EmitZone',
  //         configZone
  //       );
  //     }
  //   }

  //   lastEmitters = newEmitters;
  // }
}
