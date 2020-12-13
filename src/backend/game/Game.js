import generateRandom from '@utils/generateRandom';
import GAME_STATE from '@utils/gameState';
import { PLAYER, CARD, TIME } from '@utils/number';
import { forceTellerSelect } from '@socket/tellerSelectCard';
import { forceGuesserSelect } from '@socket/guesserSelectCard';
import { emit } from '@socket';
import GameList from '@game/GameList';
import User from './User';
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
      firstDiscussionUser: false,
    };

    methodGroups.forEach((methodGroup) => this.addMethods(methodGroup));
  }

  addMethods(methodGroup) {
    Object.entries(methodGroup).forEach(([methodName, method]) => {
      this[methodName] = method;
    });
  }

  updateUnusedCards(cards) {
    this.status = {
      ...this.status,
      unusedCards: cards,
    };
  }

  updateTopic(topic) {
    this.status = { ...this.status, topic };
  }

  addTurn() {
    this.status = {
      ...this.status,
      turn: this.status.turn + 1,
    };
  }

  toggleFirstDiscussionUser() {
    this.status = {
      ...this.status,
      firstDiscussionUser: true,
    };
  }

  initFirstDiscussionUser() {
    this.status = {
      ...this.status,
      firstDiscussionUser: false,
    };
  }

  setEndTime(timeUnit) {
    const currentTime = new Date().getTime();
    const newTargetTime = new Date(currentTime + timeUnit);
    this.endTime = newTargetTime;
  }

  dealCards(cards, count) {
    const newCards = this.status.unusedCards.slice(0, count);
    this.status = {
      ...this.status,
      unusedCards: [...this.status.unusedCards.slice(count)],
    };
    return [...cards, ...newCards];
  }

  waitTellerSelect(tellerID) {
    setTimeout(() => {
      if (this.status.state === GAME_STATE.TELLER) {
        this.setEndTime(TIME.WAIT_GUESSER_SELECT);
        const teller = this.getUser(tellerID);
        const topic = forceTellerSelect({
          teller,
          users: this.users,
          endTime: this.endTime,
        });
        this.startGuesserSelect(topic);
      }
    }, TIME.WAIT_TELLER_SELECT);
  }

  startGuesserSelect(topic) {
    this.updateTopic(topic);
    this.setState(GAME_STATE.GUESSER);
    this.waitGuesserSelect();
  }

  waitGuesserSelect() {
    const users = this.getUsers();
    setTimeout(() => {
      if (this.status.state === GAME_STATE.GUESSER) {
        this.setEndTime(TIME.WAIT_DISCUSSION);
        const unsubmittedUsers = users.filter(
          ({ submittedCard }) => submittedCard === null,
        );
        forceGuesserSelect({ unsubmittedUsers, users, endTime: this.endTime });
        this.setState(GAME_STATE.DISCUSSION);
      }
    }, TIME.WAIT_GUESSER_SELECT);
  }
}
