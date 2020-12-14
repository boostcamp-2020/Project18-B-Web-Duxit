import { PLAYER, CARD, TIME } from '@utils/number';
import GAME_STATE from '@utils/gameState';
import generateRandom from '@utils/generateRandom';
import { emit } from '@socket';

function startVoteScene() {
  this.setState(GAME_STATE.VOTE);
  setTimeout(() => {
    this.endVoteScene();
  }, TIME.SKIP_DISCUSSION + TIME.WAIT_VOTE);
}

function forceGuesserVote() {
  const unvotedUsers = this.getUsers().filter(
    ({ votedCard }) => votedCard === null,
  );

  const submittedCards = this.getUsers().map((user) => user.submittedCard);

  unvotedUsers.forEach((user) => {
    const { submittedCard } = user;
    const voteableCards = submittedCards.filter(
      (card) => card !== submittedCard,
    );

    user.voteCard(generateRandom.pickOneFromArray(voteableCards));
  });
}

function endVoteScene() {
  if (this.getState() !== GAME_STATE.VOTE) return;

  this.forceGuesserVote();
  this.startVoteResultScene();
}

const methodGroup = {
  startVoteScene,
  forceGuesserVote,
  endVoteScene,
};

export default methodGroup;
