import Projectile from './Projectile';
import playerImg from '../assets/player.png';

class Player {
  /**
   *
   * @param {Object} game
   */
  constructor(game) {
    this.game = game;
    this.width = 120;
    this.height = 190;
    this.x = 20;
    this.y = 100;
    this.speedY = 0;
    this.maxSpeed = 0.1;
    this.projectiles = [];
    this.frameX = 0;
    this.frameY = 0;
    this.maxFrame = 37;
    this.image = new Image();
    this.image.src = playerImg;
    this.powerUp = false;
    this.powerUpTimer = 0;
    this.powerUpLimit = 10000;
  }

  /**
   *
   * @param {Number} deltaTime
   */
  update() {
    if (this.game.keys.includes('ArrowUp')) {
      this.speedY -= this.maxSpeed;
    } else if (this.game.keys.includes('ArrowDown')) {
      this.speedY += this.maxSpeed;
    } else {
      this.speedY = 0;
    }
    this.y += this.speedY;

    // Update projectiles
    this.projectiles.forEach((projectile) => {
      projectile.update();
    });

    // Remove projectile if markedForDeletion is true
    this.projectiles = this.projectiles.filter(
      (projectile) => !projectile.markedForDeletion,
    );

    // Sprite animation
    if (this.frameX < this.maxFrame) {
      this.frameX += 1;
    } else {
      this.frameX = 0;
    }
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    // Draw projectiles
    this.projectiles.forEach((projectile) => {
      projectile.draw(ctx);
    });

    // Draw player
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  }

  shootTop() {
    this.projectiles.push(new Projectile(this.game, this.x + 80, this.y + 30));
  }
}

export default Player;
