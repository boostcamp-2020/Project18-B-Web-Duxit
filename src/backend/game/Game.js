import GAME_STATE from '@utils/gameState';
import { PLAYER, CARD, TIME } from '@utils/number';
import { forceGuesserSelect } from '@socket/guesserSelectCard';
import methodGroups from './GameMethods';

export default class Game {
  constructor(roomID) {
    this.roomID = roomID;
    this.users = new Map();
    this.endTime = null;
    this.status = {
      state: GAME_STATE.WAITING,
      unusedCards: [],
      topic: '',
      turn: 0,
    };

    methodGroups.forEach((methodGroup) => this.addMethods(methodGroup));
  }

  addMethods(methodGroup) {
    Object.entries(methodGroup).forEach(([methodName, method]) => {
      this[methodName] = method;
    });
  }

  setEndTime(timeUnit) {
    const currentTime = new Date().getTime();
    const newTargetTime = new Date(currentTime + timeUnit);
    this.endTime = newTargetTime;
  }
}
