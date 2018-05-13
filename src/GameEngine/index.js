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
  updateInterval: any;

  constructor(size: number, rootEl: HTMLElement) {
    this.size = size;
    this.rootEl = rootEl;
  }

  init() {
    this.snake = new Snake({
      x: Math.floor(this.size / 2),
      y: Math.floor(this.size / 2),
    });

    this.apple = generateApple({
      x: Math.floor(Math.random() * this.size),
      y: Math.floor(Math.random() * this.size),
    });

    this.grid = new Array(this.size).fill(
      new Array(this.size).fill(CELL_TYPES.EMPTY),
    );

    this.gridEl = this.createGrid();
    this.rootEl.appendChild(this.gridEl);
  }

  isOutOfBounds(head: Position) {
    return (head.x < 0 || head.x > this.size - 1 || head.y < 0 || head.y > this.size - 1);
  }

  hasEatenApple(head: Position) {
    return (head.x === this.apple.x && head.y === this.apple.y);
  }

  initializeKeyboardEvents() {
    this.eventListener = document.addEventListener('keydown', (event: Event) => {
      this.snake.setCurrentAction(event.key);
    });
  }

  initializeUpdateInterval() {
    this.updateInterval = setInterval(() => {
      this.snake.move();

      const [ head ] = this.snake.body;

      if (this.isOutOfBounds(head)) {
        this.stop();
        return;
      }

      if (this.hasEatenApple(head)) {
        this.apple = generateApple({
          x: Math.floor(Math.random() * this.size),
          y: Math.floor(Math.random() * this.size),
        });
        this.snake.addBodyCell();
      }

      this.render();
    }, 100);
  }

  createGrid() {
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

  render() {
    const currentAppleCell = document.querySelector('.apple');
    const currentSnakeCells = document.querySelectorAll('.cell.snake');

    for (let snakeCell of currentSnakeCells) {
      snakeCell.classList.remove('snake');
    }

    currentAppleCell && currentAppleCell.classList.remove('apple');

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

  stop() {
    document.removeEventListener('keydown', this.eventListener);
    clearInterval(this.updateInterval);
  }

  start() {
    this.init();
    this.render();
    this.initializeKeyboardEvents();
    this.initializeUpdateInterval();
  }
}

export default GameEngine;
