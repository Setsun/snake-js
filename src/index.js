// @flow

import Grid from './Grid';

type Position = {
  x: number,
  y: number,
};

const initializeKeyEvents = () => {
};

const initializeInterval = () => {
  setInterval(() => {

  }, 1000);
};

const render = (grid, snake, apple) => {
  const rootEl = document.getElementById('root');
  let gridEl = document.createElement('div');
  gridEl.classList.add('grid');

  for (let row of grid) {
    let rowEl = document.createElement('div');
    rowEl.classList.add('row');

    for (let position of row) {
      let cellEl = document.createElement('div');
      cellEl.classList.add('cell');
      rowEl.appendChild(cellEl);
    }

    gridEl.appendChild(rowEl);
  }

  for (let position of snake) {
    const snakeCell = gridEl
      .childNodes[position.x]
      .childNodes[position.y];
    snakeCell && snakeCell.classList.add('snake');
  }

  const appleCell = gridEl
    .childNodes[apple.x]
    .childNodes[apple.y];
  appleCell && appleCell.classList.add('apple');

  rootEl && rootEl.appendChild(gridEl);
};

const grid = new Grid(10);
grid.render();
