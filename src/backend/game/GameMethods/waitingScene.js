import GAME_STATE from '@utils/gameState';
import { PLAYER, CARD, TIME } from '@utils/number';
import generateRandom from '@utils/generateRandom';

function isEnterable() {
  if (this.status.state !== GAME_STATE.WAITING || this.users.size >= PLAYER.MAX)
    return false;
  return true;
}

function updateUserProfile({ socketID, nickname, color }) {
  const user = this.getUser(socketID);
  if (color) user.setColor(color);
  if (nickname) user.setNickname(nickname);
}

function startGame() {
  [...this.users.values()].forEach((user, index) => {
    user.initOnStart({ turnID: index });
  });

  this.updateUnusedCards(generateRandom.cards(CARD.DECK));
  // this.setEndTime(TIME.WAIT_TELLER_SELECT);
}

function endWaitingScene() {
  this.startGame();
  this.startTellerScene();
}

const methodGroup = {
  isEnterable,
  updateUserProfile,
  startGame,
  endWaitingScene,
};

export default methodGroup;
