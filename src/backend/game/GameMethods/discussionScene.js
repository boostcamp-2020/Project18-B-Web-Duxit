import { PLAYER, CARD, TIME } from '@utils/number';
import GAME_STATE from '@utils/gameState';
import { emit } from '@socket';

function startDiscussionScene() {
  this.setState(GAME_STATE.DISCUSSION);
}

function forceGuesserVote() {
  if (this.getState() !== GAME_STATE.DISCUSSION) return;

  const unvotedUsers = this.getGuessers().filter(
    ({ votedCard }) => votedCard === null,
  );

  unvotedUsers.forEach((user) => {
    user.forceVoteCard();
    // this.emitGuesserVote(user);
  });
}

function endDiscussionScene() {
  this.forceGuesserVote();
}

const methodGroup = {
  startDiscussionScene,
  forceGuesserVote,
  endDiscussionScene,
};

export default methodGroup;
