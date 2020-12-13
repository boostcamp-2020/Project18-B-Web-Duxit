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

  start() {
    [...this.users.values()].forEach((user, index) => {
      user.initOnStart({ turnID: index });
    });

    this.setState(GAME_STATE.TELLER);
    this.updateUnusedCards(generateRandom.cards(CARD.DECK));
    this.setEndTime(TIME.WAIT_TELLER_SELECT);
    this.startNewRound();
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

  getUsersProfile() {
    return [...this.users.keys()].map((socketID) => {
      return { ...this.users.get(socketID).getProfile(), socketID };
    });
  }

  dealCards(cards, count) {
    const newCards = this.status.unusedCards.slice(0, count);
    this.status = {
      ...this.status,
      unusedCards: [...this.status.unusedCards.slice(count)],
    };
    return [...cards, ...newCards];
  }

  startNewRound() {
    this.addTurn();
    this.initFirstDiscussionUser();

    const {
      users,
      status: { unusedCards, turn },
    } = this;

    const isFirstTurn = turn === 1;
    const teller = [...users.values()][turn % users.size];
    const { socketID: tellerID } = teller;
    const requiredCardCount = isFirstTurn ? CARD.HAND : 1;
    const outOfDeck = unusedCards.length < users.size * requiredCardCount;
    if (outOfDeck) return;

    users.forEach((user) => {
      const cards = this.dealCards(user.cards, requiredCardCount);
      const params = { tellerID, cards, endTime: this.endTime };
      user.initOnRound(params);
      emit({ socketID: user.socketID, name: 'get round data', params });
    });

    this.waitTellerSelect(tellerID);
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
