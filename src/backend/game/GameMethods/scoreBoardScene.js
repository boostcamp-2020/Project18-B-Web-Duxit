import { PLAYER, CARD, TIME } from '@utils/number';
import GAME_STATE from '@utils/gameState';
import { emit } from '@socket';

function startScoreBoardScene() {
  this.setState(GAME_STATE.SCORE);
}

function endScoreBoardScene() {
  if (this.getState() !== GAME_STATE.SCORE) return;
}

const methodGroup = {
  startScoreBoardScene,
  endScoreBoardScene,
};

export default methodGroup;
