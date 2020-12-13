import { PLAYER, CARD, TIME } from '@utils/number';
import GAME_STATE from '@utils/gameState';
import { emit } from '@socket';

function startDiscussionScene() {
  this.setState(GAME_STATE.DISCUSSION);
}

function forceGuesserVote() {}

function endDiscussionScene() {
  this.forceGuesserVote();
}

const methodGroup = {
  startDiscussionScene,
  forceGuesserVote,
  endDiscussionScene,
};

export default methodGroup;
