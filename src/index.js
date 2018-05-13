// @flow

import GameEngine from './GameEngine';

const rootEl = document.getElementById('root');
const startMenuEl = document.querySelector('.start-menu');
const loseMenuEl = document.querySelector('.lose-menu');
const startBtn = document.querySelector('.start-btn');
const restartBtn = document.querySelector('.restart-btn');

const onStart = () => {
  startMenuEl.classList.add('hide');
  loseMenuEl.classList.add('hide');
}
const onStop = () => {
  loseMenuEl.classList.remove('hide');
};

const engine = new GameEngine(16, rootEl, onStart, onStop);

startBtn && startBtn.addEventListener('click', () => {
  engine.start();
});

restartBtn && restartBtn.addEventListener('click', () => {
  engine.start();
});
