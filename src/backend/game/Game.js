import User from './User';

export default class Game {
  constructor(roomID) {
    this.roomID = roomID;
    this.users = new Map();
    this.status = {
      isPlaying: false,
      unusedCards: [],
      topic: '',
      turn: 0,
    };
  }

  getRoomID() {
    return this.roomID;
  }

  isPlaying() {
    return this.status.isPlaying;
  }

  addUser({ socketID, nickname, color }) {
    const user = new User({ socketID, nickname, color });
    this.users.set(socketID, user);
  }

  findUserInfo(socketID) {
    const user = this.users.get(socketID);
    return user ? user.getUserProfile() : false;
  }

  findUserInfoAll(socketID) {
    return this.users.get(socketID).getUserInfo() || null;
  }
}
