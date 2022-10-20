import Game from './JS/Game';

const canvas = document.querySelector('canvas');
const btnRestart = document.querySelector('.restart');
const context = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
let game = new Game(canvas.width, canvas.height);

let lastTime = 0;

function animate(timeStamp) {
  const deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;
  context.clearRect(0, 0, canvas.width, canvas.height);
  if (!game.gameOver) {
    game.update(deltaTime);
    game.draw(context);
  } else {
    btnRestart.classList.add('show');
    context.font = '80px sans-serif';
    context.fillStyle = 'white';
    context.textAlign = 'center';
    context.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 100);
    context.fillText(
      `SCORE FINAL: ${game.score}`,
      canvas.width / 2,
      canvas.height / 2,
    );
  }
  requestAnimationFrame(animate);
}

animate(0);

btnRestart.addEventListener('click', () => {
  btnRestart.classList.remove('show');
  game = new Game(canvas.width, canvas.height);
});
