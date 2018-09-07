class Game extends Phaser.Game {
  private clientWidth: number;
  private clientHeight: number;

  constructor(config: any, clientWidth: number, clientHeight: number) {
    super(config);
    this.clientWidth = clientWidth;
    this.clientHeight = clientHeight;
    window.onresize = this.resize.bind(this);
    this.resize();
  }

  public resize(): void {
    const { width, height } = this.config as any;
    const scale: number = Math.min(
      this.clientHeight / height,
      this.clientWidth / width,
    );
    this.canvas.style.position = 'absolute';
    this.canvas.style.width = width * scale + 'px';
    this.canvas.style.height = height * scale + 'px';
    this.canvas.style.left = (this.clientWidth - width * scale) * 0.5 + 'px';
    this.canvas.style.top = (this.clientHeight - height * scale) * 0.5 + 'px';
  }
}

export default Game;
