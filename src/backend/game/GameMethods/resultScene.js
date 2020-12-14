import { PLAYER, CARD, TIME } from '@utils/number';
import GAME_STATE from '@utils/gameState';
import { emit } from '@socket';

function startResultScene() {
  this.setState(GAME_STATE.RESULT);
  setTimeout(() => {
    this.endResultScene();
  }, TIME.WAIT_RESULT);
}

function emitEndResult() {
  emit({
    users: this.getUsers(),
    name: 'end vote result',
    params: {},
  });
}

function endResultScene() {
  if (this.getState() !== GAME_STATE.RESULT) return;

  this.forceGuesserVote();
  this.emitEndResult();
  this.startScoreBoardScene();
}

const methodGroup = {
  startResultScene,
  emitEndResult,
  endResultScene,
};

export default methodGroup;
