import ravenImg from '../assets/raven.png';

class Raven {
  /**
   *
   * @param {{width: Number, height: Number}} game
   */
  constructor(game) {
    this.game = game;
    this.spriteWidth = 271;
    this.spriteHeight = 194;
    this.sizeModifier = Math.random() * 0.6 + 0.4;
    this.width = this.spriteWidth * this.sizeModifier;
    this.height = this.spriteHeight * this.sizeModifier;
    this.x = this.game.width;
    this.y = Math.random() * (this.game.height - this.height);
    this.directionX = Math.random() * 5 + 3;
    this.directionY = Math.random() * 5 - 2.5;
    this.markedForDeletion = false;
    this.image = new Image();
    this.image.src = ravenImg;
    this.frame = 0;
    this.maxFrame = 4;
    this.timeSinceFlap = 0;
    this.flapInterval = Math.random() * 50 + 50;
  }

  /**
   *
   * @param {Number} deltaTime
   */
  update(deltaTime) {
    if (this.y < 0 || this.y > this.game.height - this.height) {
      this.directionY *= -1;
    }
    this.x -= this.directionX;
    this.y += this.directionY;
    if (this.x < -this.width) {
      this.markedForDeletion = true;
    }

    this.timeSinceFlap += deltaTime;
    if (this.timeSinceFlap > this.flapInterval) {
      if (this.frame > this.maxFrame) {
        this.frame = 0;
      } else {
        this.frame += 1;
      }
      this.timeSinceFlap = 0;
    }
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.frame * this.spriteWidth,
      0,
      this.spriteWidth,
      this.spriteHeight,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }
}

export default Raven;
