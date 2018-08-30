export default (height: number, width: number, scenes: (typeof Phaser.Scene)[]) => ({
  type: Phaser.WEBGL,
  width: width,
  height: height,
  backgroundColor: '#232222',
  parent: 'phaser-canvas',
  scene: scenes
});