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

    this.ravens.forEach((raven) => raven.update());

    this.ravens = this.ravens.filter((raven) => !raven.markedForDeletion);
  }

  /**
   *
   * @param {CanvasRenderingContext2D} ctx
   */
  draw(ctx) {
    this.ravens.forEach((raven) => {
      raven.draw(ctx);
    });
  }
}

export default Game;
