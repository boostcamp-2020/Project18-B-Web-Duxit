import { TIME } from '@utils/number';
import GAME_STATE from '@utils/gameState';
import { emit } from '@socket';
import generateRandom from '@utils/generateRandom';

function startGuesserScene() {
  this.setState(GAME_STATE.GUESSER);
  this.setEndTime(TIME.WAIT_DISCUSSION);
  setTimeout(() => {
    this.endGuesserScene();
  }, TIME.WAIT_GUESSER_SELECT);
}

function emitGuesserSubmit(guesser) {
  const otherUsers = this.getUsers().filter(
    (user) => user.socketID !== guesser.socketID,
  );

  emit({
    socketID: guesser.socketID,
    name: 'guesser select card',
    params: { cardID: guesser.submittedCard, endTime: this.endTime },
  });

  emit({
    users: otherUsers,
    name: 'other guesser decision',
    params: {
      playerID: guesser.socketID,
      endTime: this.endTime,
    },
  });
}

function forceGuesserSelect() {
  if (this.getState() !== GAME_STATE.GUESSER) return;

  const unsubmittedUsers = this.getUsers().filter(
    ({ submittedCard }) => submittedCard === null,
  );

  unsubmittedUsers.forEach((user) => {
    user.forceSubmitCard();
    this.emitGuesserSubmit(user);
  });
}

function emitGetAllDecisions() {
  const users = this.getUsers();
  const submittedCardIDs = users.map((user) => user.submittedCard);
  const suffledCardIDs = generateRandom.shuffleArray(submittedCardIDs);
  emit({ users, name: 'get all decisions', params: { cards: suffledCardIDs } });
}

function endGuesserScene() {
  this.forceGuesserSelect();
  setTimeout(() => {
    this.emitGetAllDecisions();
  }, TIME.DELAY_GET_ALL_DECISIONS);
  this.startDiscussionScene();
}

const methodGroup = {
  startGuesserScene,
  emitGuesserSubmit,
  forceGuesserSelect,
  emitGetAllDecisions,
  endGuesserScene,
};

export default methodGroup;
