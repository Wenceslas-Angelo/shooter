import boomImg from '../assets/boom.png';

class Explosion {
  /**
   *
   * @param {Object} game
   * @param {Number} x
   * @param {Number} y
   * @param {Number} size
   */
  constructor(game, x, y, size) {
    this.game = game;
    this.image = new Image();
    this.image.src = boomImg;
    this.size = size;
    this.spriteWidth = 200;
    this.spriteHeight = 179;
    this.x = x;
    this.y = y;
    this.frame = 0;
    this.timeSinceLastFrame = 0;
    this.frameInterval = 200;
    this.markedForDeletion = false;
  }

  /**
   *
   * @param {Number} deltaTime
   */
  update(deltaTime) {
    this.timeSinceLastFrame += deltaTime;
    if (this.timeSinceLastFrame > this.frameInterval) {
      this.frame += 1;
      this.timeSinceLastFrame = 0;
      if (this.frame > 5) {
        this.markedForDeletion = true;
      }
    }
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y - this.size / 4,
      this.size,
      this.size,
    );
  }
}

export default Explosion;
