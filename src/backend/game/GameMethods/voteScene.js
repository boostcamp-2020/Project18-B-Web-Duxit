import { TIME } from '@utils/number';
import GAME_STATE from '@utils/gameState';
import generateRandom from '@utils/generateRandom';
import { emit } from '@socket';
import getScoreMap from '@utils/calcScore';

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

function emitEndVote() {
  const scoreMap = getScoreMap(this);
  const players = this.getUsers().map((user) => ({
    socketID: user.socketID,
    submittedCardID: user.submittedCard,
    votedCardID: user.votedCard,
    ...scoreMap.get(user.socketID),
  }));

  emit({
    users: this.getUsers(),
    name: 'end vote',
    params: { players },
  });
}

function endVoteScene() {
  if (this.getState() !== GAME_STATE.VOTE) return;

  this.forceGuesserVote();
  this.emitEndVote();
  this.startResultScene();
}

const methodGroup = {
  startVoteScene,
  forceGuesserVote,
  emitEndVote,
  endVoteScene,
};

export default methodGroup;
