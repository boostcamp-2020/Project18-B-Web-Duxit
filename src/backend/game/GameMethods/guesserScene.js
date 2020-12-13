import { PLAYER, CARD, TIME } from '@utils/number';
import GAME_STATE from '@utils/gameState';
import generateRandom from '@utils/generateRandom';
import { emit } from '@socket';
import TOPIC from '@utils/cardTopic.json';

function startGuesserScene() {
  this.setState(GAME_STATE.GUESSER);
}

function forceGuesserSelect() {
  if (this.getState() !== GAME_STATE.GUESSER) return;
}

function endGuesserScene() {}

const methodGroup = { startGuesserScene, forceGuesserSelect, endGuesserScene };

export default methodGroup;
