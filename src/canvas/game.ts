class Game extends Phaser.Game {
  constructor(config: any) {
    super(config);
    window.onresize = this.resize.bind(this);
    this.resize();
    this.resize();
  }

  public resize(): void {
    const { width, height } = this.config as any;
    const parent = this.canvas.parentElement as any;
    const scale: number = Math.min(
      parent.clientHeight / height,
      parent.clientWidth / width,
    );
    this.canvas.style.position = 'absolute';
    this.canvas.style.width = width * scale + 'px';
    this.canvas.style.height = height * scale + 'px';
    this.canvas.style.left = (parent.clientWidth - width * scale) * 0.5 + 'px';
    this.canvas.style.top = (parent.clientHeight - height * scale) * 0.5 + 'px';
    super.resize(width, height);
  }
}

export default Game;
