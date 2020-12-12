import GAME_STATE from '@utils/gameState';
import { PLAYER, CARD, TIME } from '@utils/number';

function isEnterable() {
  if (this.status.state !== GAME_STATE.WAITING || this.users.size >= PLAYER.MAX)
    return false;
  return true;
}

const methodGroup = { isEnterable };

export default methodGroup;
