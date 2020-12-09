import generateRandom from '@utils/generateRandom';
import GAME_STATE from '@utils/gameState';
import { PLAYER, CARD, TIME } from '@utils/number';
import { forceTellerSelect } from '@socket/tellerSelectCard';
import { emit } from '@socket';
import GameList from '@game/GameList';
import User from './User';

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
  }

  start() {
    [...this.users.values()].forEach((user, index) => {
      user.initOnStart({ turnID: index });
    });

    this.updateState(GAME_STATE.TELLER);
    this.updateUnusedCards(generateRandom.cards(CARD.DECK));
    this.addTimeToEndTime(TIME.WAIT_TELLER_SELECT);

    const tellerID = this.startNewRound();
    setTimeout(() => {
      if (this.status.state === GAME_STATE.TELLER) {
        const teller = this.getUser(tellerID);
        const topic = forceTellerSelect({ teller, users: this.users });
        this.updateState(GAME_STATE.GUESSER);
        this.updateTopic(topic);
      }
    }, TIME.WAIT_TELLER_SELECT);
  }

  end() {
    this.updateState(GAME_STATE.WAITING);
  }

  updateUnusedCards(cards) {
    this.status = {
      ...this.status,
      unusedCards: cards,
    };
  }

  updateState(state) {
    this.status = {
      ...this.status,
      state,
    };
  }

  addTimeToEndTime(timeUnit) {
    const currentTime = new Date().getTime();
    const newTargetTime = new Date(currentTime + timeUnit);
    this.endTime = newTargetTime;
  }

  isEnterable() {
    if (
      this.status.state !== GAME_STATE.WAITING ||
      this.users.size >= PLAYER.MAX
    )
      return false;
    return true;
  }

  addUser({ socketID }) {
    const nickname = generateRandom.nickname();
    const color = generateRandom.color();
    const user = new User({ socketID, nickname, color });
    GameList.addID(socketID, this);
    this.users.set(socketID, user);
    return user;
  }

  removeUser({ socketID }) {
    this.users.delete(socketID);
    GameList.removeID(socketID);
    if (this.users.size < 1) {
      GameList.removeID(this.roomID);
    }
  }

  getUser(socketID) {
    if (!this.users.has(socketID)) return null;
    return this.users.get(socketID);
  }

  getUsersProfile() {
    return [...this.users.keys()].map((socketID) => {
      return { ...this.users.get(socketID).getProfile(), socketID };
    });
  }

  updateUserProfile({ socketID, nickname, color }) {
    const user = this.users.get(socketID);
    user.setColor(color);
    user.setNickname(nickname);
  }

  dealCards(cards, count) {
    const newCards = this.status.unusedCards.slice(0, count);
    this.status = {
      ...this.status,
      unusedCards: [...this.status.unusedCards.slice(count)],
    };
    return [...cards, ...newCards];
  }

  getUserArray() {
    return [...this.users.values()];
  }

  startNewRound() {
    this.status = {
      ...this.status,
      turn: this.status.turn + 1,
    };
    const {
      users,
      status: { unusedCards, turn },
    } = this;
    const isFirstTurn = turn === 1;
    const teller = [...users.values()][turn % users.size];
    const { socketID: tellerID } = teller;
    const requiredCardCount = isFirstTurn ? CARD.HAND : 1;

    // 카드가 부족한지 체크
    const outOfDeck = unusedCards.length < users.size * requiredCardCount;
    // if (outOfDeck) {
    //   // TODO: 점수나 승자같은 결과를 내면서 턴을 끝내야되요~
    //   return;
    // }
    users.forEach((user) => {
      const cards = this.dealCards(user.cards, requiredCardCount);
      const params = { tellerID, cards, endTime: this.endTime };
      user.initOnRound(params);
      emit({ socketID: user.socketID, name: 'get round data', params });
    });

    return tellerID;
  }

  updateTopic(topic) {
    this.status = {
      ...this.status,
      topic,
    };
  }
}
