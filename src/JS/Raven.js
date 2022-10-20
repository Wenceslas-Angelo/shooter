class Raven {
  /**
   *
   * @param {{width: Number, height: Number}} game
   */
  constructor(game) {
    this.game = game;
    this.width = 100;
    this.height = 50;
    this.x = this.game.width;
    this.y = Math.random() * (this.game.height - this.height);
    this.directionX = Math.random() * 5 + 3;
    this.directionY = Math.random() * 5 - 2.5;
    this.markedForDeletion = false;
  }

  update() {
    this.x -= this.directionX;
    if (this.x < -this.width) {
      this.markedForDeletion = true;
    }
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.fillStyle = 'black';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export default Raven;
