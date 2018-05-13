// @flow

import Snake from '../Snake';
import type { ActionType, Position } from '../types';

const generateApple = (position: Position): Position => {
  return position;
};

const CELL_TYPES = {
  APPLE: 'apple',
  SNAKE: 'snake',
  EMPTY: 'empty',
};

type CellType = 'apple' | 'snake' | 'empty';

class GameEngine {
  size: number;
  snake: Object;
  apple: Position;
  grid: Array<Array<CellType>>;
  gridEl: Node;
  rootEl: Node;
  eventListener: EventListener;
  renderFrameId: number;
  onStart: Function;
  onStop: Function;

  constructor(size: number, rootEl: HTMLElement, onStart: Function, onStop: Function) {
    this.size = size;
    this.rootEl = rootEl;
    this.onStart = onStart;
    this.onStop = onStop;
  }

  initializeState = () => {
    // start snake in middle of grid
    this.snake = new Snake({
      x: Math.floor(this.size / 2),
      y: Math.floor(this.size / 2),
    });

    // randomly place apple on the grid
    this.apple = generateApple({
      x: Math.floor(Math.random() * this.size),
      y: Math.floor(Math.random() * this.size),
    });

    // initialize grid with empty cells
    this.grid = new Array(this.size).fill(
      new Array(this.size).fill(CELL_TYPES.EMPTY),
    );

    this.gridEl = this.createGridEl();

    this.rootEl.innerHTML = '';
    this.rootEl.appendChild(this.gridEl);
  }

  initializeKeyboardEvents = () => {
    this.eventListener = document.addEventListener('keydown', (event: Event) => {
      this.snake.setCurrentAction(event.key);
    });
  }

  createGridEl = () => {
    const gridEl = document.createElement('div');
    gridEl.classList.add('grid');

    for (let row of this.grid) {
      let rowEl = document.createElement('div');
      rowEl.classList.add('row');

      for (let position of row) {
        let cellEl = document.createElement('div');
        cellEl.classList.add('cell');
        rowEl.appendChild(cellEl);
      }

      gridEl.appendChild(rowEl);
    }

    return gridEl;
  }

  updateGridEl = () => {
    const currentAppleCell = document.querySelector('.apple');
    const currentSnakeCells = document.querySelectorAll('.cell.snake');

    // clear old state of the current board
    for (let snakeCell of currentSnakeCells) {
      snakeCell.classList.remove('snake');
    }
    currentAppleCell && currentAppleCell.classList.remove('apple');

    // update board with new state
    for (let position of this.snake.body) {
      const snakeCell = this.gridEl
        .childNodes[position.x]
        .childNodes[position.y];
      snakeCell && snakeCell.classList.add('snake');
    }
    const appleCell = this.gridEl
      .childNodes[this.apple.x]
      .childNodes[this.apple.y];
    appleCell && appleCell.classList.add('apple');
  }

  isOutOfBounds = (head: Position) => {
    return (head.x < 0 || head.x > this.size - 1 || head.y < 0 || head.y > this.size - 1);
  }

  hasEatenApple = (head: Position) => {
    return (head.x === this.apple.x && head.y === this.apple.y);
  }

  render = () => {
    this.snake.move();

    const [ head ] = this.snake.body;

    if (this.isOutOfBounds(head)) {
      this.stop();
      this.onStop();
      return;
    }

    if (this.hasEatenApple(head)) {
      this.apple = generateApple({
        x: Math.floor(Math.random() * this.size),
        y: Math.floor(Math.random() * this.size),
      });
      this.snake.addBodyCell();
    }

    this.updateGridEl();

    setTimeout(() => {
      this.renderFrameId = window.requestAnimationFrame(this.render)
    }, 1000 / 30);
  }

  stop = () => {
    // clean up event listener and render loop
    document.removeEventListener('keydown', this.eventListener);
    window.cancelAnimationFrame(this.renderFrameId);
  }

  start = () => {
    this.onStart();
    this.initializeState();
    this.initializeKeyboardEvents();
    this.renderFrameId = window.requestAnimationFrame(this.render);
  }
}

export default GameEngine;
