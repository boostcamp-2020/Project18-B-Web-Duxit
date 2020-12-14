import { PLAYER, CARD, TIME } from '@utils/number';
import GAME_STATE from '@utils/gameState';
import { emit } from '@socket';

function startVoteScene() {
  this.setState(GAME_STATE.DISCUSSION);
}

function endVoteScene() {
  if (this.getState() !== GAME_STATE.DISCUSSION) return;

  this.forceGuesserVote();
}

const methodGroup = {
  startVoteScene,
  endVoteScene,
};

export default methodGroup;
