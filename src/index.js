import Game from './JS/Game';

const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const game = new Game(canvas.width, canvas.height);

let lastTime = 0;

function animate(timeStamp) {
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  context.clearRect(0, 0, canvas.width, canvas.height);
  game.update(deltaTime);
  game.draw(context);
  requestAnimationFrame(animate);
}

animate(0);
