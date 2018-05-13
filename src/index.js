// @flow

import GameEngine from './GameEngine';

const rootEl = document.getElementById('root');
const engine = new GameEngine(16, rootEl);

engine.start();
