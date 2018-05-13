// @flow

import { ActionTypes } from '../utils/constants';

class Snake {
  constructor(startPosition) {
    this.body = [startPosition];
  }

  addBodyCell() {
  }

  move(type) {
    const [ head ] = this.body;
    let nextHead = { ...head };

    switch (type) {
      case ActionTypes.LEFT: {
        nextHead.x -= 1;
        break;
      }
      case ActionTypes.RIGHT: {
        nextHead.x += 1;
        break;
      }
      case ActionTypes.UP: {
        nextHead.y -= 1;
        break;
      }
      case ActionTypes.DOWN: {
        nextHead.y += 1;
        break;
      }
    }

    this.body[0] = nextHead;
  }
}

export default Snake;
