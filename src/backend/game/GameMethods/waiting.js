import GAME_STATE from '@utils/gameState';
import { PLAYER, CARD, TIME } from '@utils/number';

function isEnterable() {
  if (this.status.state !== GAME_STATE.WAITING || this.users.size >= PLAYER.MAX)
    return false;
  return true;
}

function updateUserProfile({ socketID, nickname, color }) {
  const user = this.users.get(socketID);
  user.setColor(color);
  user.setNickname(nickname);
}

const methodGroup = { isEnterable };

export default methodGroup;
