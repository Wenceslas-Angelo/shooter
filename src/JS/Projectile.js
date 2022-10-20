class Projectile {
  /**
   *
   * @param {Object} game
   * @param {Number} x
   * @param {Number} y
   */
  constructor(game, x, y) {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = 10;
    this.height = 3;
    this.speed = 2;
    this.markedForDeletion = false;
  }

  update() {
    this.x += this.speed;
    if (this.x > this.game.width) this.markedForDeletion = true;
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.fillStyle = 'red';
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

export default Projectile;
