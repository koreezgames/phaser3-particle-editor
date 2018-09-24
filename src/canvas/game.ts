class Game extends Phaser.Game {
  private parent: any;

  constructor(config: any, parent: any) {
    super(config);
    this.parent = parent;
    window.onresize = this.resize.bind(this);
    this.resize();
    this.resize();
  }

  public resize(): void {
    const { width, height } = this.config as any;
    const scale: number = Math.min(
      this.parent.clientHeight / height,
      this.parent.clientWidth / width,
    );
    this.canvas.style.position = 'absolute';
    this.canvas.style.width = width * scale + 'px';
    this.canvas.style.height = height * scale + 'px';
    this.canvas.style.left =
      (this.parent.clientWidth - width * scale) * 0.5 + 'px';
    this.canvas.style.top =
      (this.parent.clientHeight - height * scale) * 0.5 + 'px';
  }
}

export default Game;
