import { PLAYER, CARD, TIME } from '@utils/number';
import GAME_STATE from '@utils/gameState';
import { emit } from '@socket';

function startTellerScene() {
  this.startRound();
  this.waitTellerSelect(tellerID);
}

function endTellerScene() {}

const methodGroup = { startTellerScene };

export default methodGroup;
