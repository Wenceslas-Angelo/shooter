import Raven from './Raven';

class Game {
  /**
   *
   * @param {Number} width
   * @param {Number} height
   */
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.ravens = [];
    this.ravenInterval = 1000;
    this.timeToNextRaven = 0;
    this.score = 0;
  }

  /**
   *
   * @param {Number} deltaTime
   */
  update(deltaTime) {
    this.timeToNextRaven += deltaTime;
    if (this.timeToNextRaven > this.ravenInterval) {
      this.ravens.push(new Raven(this));
      this.timeToNextRaven = 0;
    }

    this.ravens.forEach((raven) => raven.update(deltaTime));

    this.ravens = this.ravens.filter((raven) => !raven.markedForDeletion);
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    ctx.font = '80px sans-serif';
    ctx.fillStyle = 'gray';
    ctx.fillText(`SCORE: ${this.score}`, 50, 75);

    this.ravens.forEach((raven) => {
      raven.draw(ctx);
    });
  }
}

export default Game;
