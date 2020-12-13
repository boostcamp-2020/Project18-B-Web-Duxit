import { PLAYER, CARD, TIME } from '@utils/number';
import GAME_STATE from '@utils/gameState';
import { emit } from '@socket';

function startMixCardScene() {}

function endMixCardScene() {
  this.forceGuesserSelect();
}

const methodGroup = {
  startMixCardScene,
  endMixCardScene,
};

export default methodGroup;
