import generateRandom from '@utils/generateRandom';
import Game from '@game/Game';

class Games {
  constructor() {
    this.roomGameMap = new Map();
    this.userRoomMap = new Map();
  }

  isEnterableRoom(roomID) {
    const game = this.roomGameMap.get(roomID);
    if (!game) return false;
    if (game.isPlaying()) return false;
    return true;
  }

  createGame() {
    const game = new Game();
    const roomID = generateRandom.code();
    this.roomGameMap.set(roomID, game);
    return roomID;
  }

  enterUser({ socketID, roomID }) {
    const nickname = generateRandom.nickname();
    const color = generateRandom.color();
    this.userRoomMap.set(socketID, roomID);
    this.roomGameMap.get(roomID).addUser({ socketID, roomID, nickname, color });
  }

  findRoomID(socketID) {
    return this.userRoomMap.get(socketID) || null;
  }

  findGameBySocketID(socketID) {
    const roomID = this.userRoomMap.get(socketID);
    return this.roomGameMap.get(roomID) || false;
  }

  findUserInfo(socketID) {
    const roomID = this.userRoomMap.get(socketID);
    if (!roomID) return false;
    const game = this.roomGameMap.get(roomID);
    return game.findUserInfo(socketID);
  }
}

export default new Games();
