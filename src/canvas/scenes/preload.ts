import shapesJSON from '../assets/shapes.json';
import shapeIMAGE from '../assets/shapes.png';

export default class Preload extends Phaser.Scene {
  constructor() {
    super('Preload');
  }
  preload() {
    this.load.atlas('shape', shapeIMAGE, shapesJSON);
  }
  create() {
    this.scene.start('Canvas');
  }
}