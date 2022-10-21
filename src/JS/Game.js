import Raven from './Raven';
import Player from './Player';
import Explosion from './Explosion';

class Game {
  /**
   *
   * @param {Number} width
   * @param {Number} height
   */
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.keys = {
      upPressed: false,
      downPressed: false,
    };
    this.inputHandler();
    this.player = new Player(this);
    this.ravens = [];
    this.ravenInterval = 2000;
    this.timeToNextRaven = 0;
    this.score = 0;
    this.gameOver = false;
    this.debug = false;
    this.explosions = [];
  }

  /**
   *
   * @param {Number} deltaTime
   */
  update(deltaTime) {
    this.player.update();
    this.timeToNextRaven += deltaTime;
    if (this.timeToNextRaven > this.ravenInterval) {
      this.ravens.push(new Raven(this));
      this.timeToNextRaven = 0;
    }

    this.ravens.forEach((raven) => {
      raven.update(deltaTime);

      const tempRaven = raven;
      if (Game.checkCollision(this.player, tempRaven)) {
        this.player.lives -= 1;
        this.explosions.push(
          new Explosion(this, tempRaven.x, tempRaven.y, tempRaven.width),
        );
        if (this.player.lives <= 0) {
          this.gameOver = true;
        }
        tempRaven.markedForDeletion = true;
      }

      this.player.projectiles.forEach((projectile) => {
        const tempProjectile = projectile;

        if (Game.checkCollision(projectile, tempRaven)) {
          tempRaven.lives -= 1;
          tempProjectile.markedForDeletion = true;

          if (tempRaven.lives <= 0) {
            tempRaven.markedForDeletion = true;
            this.explosions.push(
              new Explosion(this, tempRaven.x, tempRaven.y, tempRaven.width),
            );
            this.score += tempRaven.score;
            if (this.score > 50) {
              this.ravenInterval = 1000;
            }

            if (this.score > 100) {
              this.ravenInterval = 500;
            }
          }
        }
      });
    });

    this.explosions.forEach((explosion) => explosion.update(deltaTime));

    this.ravens = this.ravens.filter((raven) => !raven.markedForDeletion);
    this.explosions = this.explosions.filter(
      (explosion) => !explosion.markedForDeletion,
    );
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    this.player.draw(ctx);

    ctx.font = '50px sans-serif';
    ctx.fillStyle = 'gray';
    ctx.textAlign = 'start';
    ctx.fillText(`SCORE: ${this.score}`, 50, 75);

    ctx.fillText(`YOUR LIVES: ${this.player.lives}`, this.width - 400, 75);

    this.ravens.forEach((raven) => {
      raven.draw(ctx);
    });

    this.explosions.forEach((explosion) => {
      explosion.draw(ctx);
    });
  }

  inputHandler() {
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowUp') {
        this.keys.upPressed = true;
      } else if (e.key === 'ArrowDown') {
        this.keys.downPressed = true;
      } else if (e.key === 'd') {
        this.debug = !this.debug;
      }
    });
    window.addEventListener('keyup', (e) => {
      if (e.key === 'ArrowUp') {
        this.keys.upPressed = false;
      } else if (e.key === 'ArrowDown') {
        this.keys.downPressed = false;
      } else if (e.key === ' ') {
        this.player.shoot();
      }
    });
  }

  /**
   *
   * @param {{x:Number, y:Number, width: Number, height: Number}} rect1
   * @param {{x:Number, y:Number, width: Number, height: Number}} rect2
   */
  static checkCollision(rect1, rect2) {
    const xIsCollide1 = rect1.x < rect2.x + rect2.width;
    const xIsCollide2 = rect1.x + rect1.width > rect2.x;
    const xIsCollide = xIsCollide1 && xIsCollide2;
    const yIsCollide1 = rect1.y < rect2.y + rect2.height;
    const yIsCollide2 = rect1.height + rect1.y > rect2.y;
    const yIsCollide = yIsCollide1 && yIsCollide2;
    return xIsCollide && yIsCollide;
  }
}

export default Game;
