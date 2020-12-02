import generateRandom, { randomize } from '@utils/generateRandom';
import GAME_STATE from '@utils/gameState';
import { PLAYER, CARD } from '@utils/number';
import GameList from '@game/GameList';
import User from './User';
import { getRandomCards } from './Card';
import socketIO from '../sockets';

export default class Game {
  constructor(roomID) {
    this.roomID = roomID;
    this.users = new Map();
    this.status = {
      state: GAME_STATE.WAITING,
      unusedCards: [],
      topic: '',
      turn: 0,
    };
  }

  start() {
    this.status = {
      ...this.status,
      isPlaying: GAME_STATE.TELLER,
      unusedCards: getRandomCards(CARD.DECK),
    };
    const randomOrderedUsers = randomize([...this.users.values()]);
    randomOrderedUsers.forEach((user, index) => {
      user.initOnStart({ turnID: index });
    });
    this.startTurn({ users: randomOrderedUsers });
  }

  end() {
    // 아직 사용되지 않은 함수
    this.status.isPlaying = GAME_STATE.WAITING;
  }

  startTurn({ users = [] } = {}) {
    this.status = {
      ...this.status,
      turn: this.status.turn + 1,
    };
    const { unusedCards, turn } = this.status;
    const isFirstTurn = turn === 1;
    const teller = users[turn % users.length];
    const { socketID: tellerID } = teller;
    const emptyHand = isFirstTurn ? CARD.HAND : 1;

    // 카드가 부족한지 체크
    const outOfDeck = unusedCards.length < users.length * emptyHand;
    if (outOfDeck) {
      // TODO: 점수나 승자같은 결과를 내면서 턴을 끝내야되요~
      return;
    }

    users.forEach((user) => {
      const cards = this.dealCards(user.cards, emptyHand);
      const params = { tellerID, cards };
      user.initOnRound(params);
      socketIO.to(user.socketID).emit('get round data', params);
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
}
