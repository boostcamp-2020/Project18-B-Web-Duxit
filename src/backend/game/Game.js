import generateRandom from '@utils/generateRandom';
import GAME_STATE from '@utils/gameState';
import GameList from '@game/GameList';
import User from './User';

const MAX_PLAYER = 6;

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
      this.users.size >= MAX_PLAYER
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

  startNewRound() {
    this.status = {
      ...this.status,
      turn: this.status.turn + 1,
    };

    return this.getTeller();
    // if (this.status.turn === 1) return this.startFirstRound();
    // this.startNewRound();
  }
}
