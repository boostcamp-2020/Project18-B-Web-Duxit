import { PLAYER, CARD, TIME } from '@utils/number';
import GAME_STATE from '@utils/gameState';
import { emit } from '@socket';

function startGuesserScene() {
  this.setState(GAME_STATE.GUESSER);
  this.setEndTime(TIME.WAIT_DISCUSSION);
  setTimeout(this.endGuesserSelect, TIME.WAIT_GUESSER_SELECT);
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

function endGuesserScene() {
  this.forceGuesserSelect();
}

const methodGroup = {
  startGuesserScene,
  emitGuesserSubmit,
  forceGuesserSelect,
  endGuesserScene,
};

export default methodGroup;
