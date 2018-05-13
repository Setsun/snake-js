// @flow

import { ActionTypes } from '../utils/constants';
import type { ActionType, Position } from '../types';

class Snake {
  body: Array<Position>;
  lastTail: Position;
  currentAction: ActionType;

  constructor(startPosition: Position) {
    this.body = [startPosition];
    this.currentAction = ActionTypes.UP;
  }

  addBodyCell() {
    this.body.push(this.lastTail);
  }

  setCurrentAction(action: ActionType) {
    this.currentAction = action;
  }

  move() {
    const [ head ] = this.body;
    let nextHead = { ...head };

    switch (this.currentAction) {
      case ActionTypes.LEFT: {
        nextHead.y -= 1;
        break;
      }
      case ActionTypes.RIGHT: {
        nextHead.y += 1;
        break;
      }
      case ActionTypes.UP: {
        nextHead.x -= 1;
        break;
      }
      case ActionTypes.DOWN: {
        nextHead.x += 1;
        break;
      }
    }

    this.body.unshift(nextHead);
    this.lastTail = this.body.pop();
  }
}

export default Snake;
