import generateRandom from '@utils/generateRandom';
import GAME_STATE from '@utils/gameState';
import { PLAYER } from '@utils/number';
import GameList from '@game/GameList';
import socketIO from '@socket';
import User from './User';

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

  getTeller() {
    const userIDs = [...this.users.keys()];
    const { turn } = this.status;

    return { tellerID: userIDs[(turn - 1) % userIDs.length] };
  }

  getUserArray() {
    return [...this.users.values()];
  }

  forceGuesserSelect() {
    this.getUserArray()
      .filter((user) => user.submittedCard === null)
      .forEach((user) => {
        user.submittedCard = generateRandom.pickOneFromArray(user.cards);
        socketIO
          .to(user.socketID)
          .emit('guesser select card', { cardID: user.submittedCard });
      });
  }

  startNewRound() {
    // Initialize Game status
    this.status = {
      ...this.status,
      state: GAME_STATE.WAITING,
      topic: '',
      turn: this.status.turn + 1,
    };

    // Initialize User status
    this.users.forEach((user) => user.initRound());

    return this.getTeller();
    // if (this.status.turn === 1) return this.startFirstRound();
    // this.startNewRound();
  }
}
