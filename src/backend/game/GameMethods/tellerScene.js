import { PLAYER, CARD, TIME } from '@utils/number';
import GAME_STATE from '@utils/gameState';
import { emit } from '@socket';

function startTellerScene() {
  this.startRound();
  setTimeout(this.endTellerScene, TIME.WAIT_TELLER_SELECT);
}

function forceTellerSelect() {}

function endTellerScene() {
  this.forceTellerSelect();
}

const methodGroup = { startTellerScene };

export default methodGroup;
