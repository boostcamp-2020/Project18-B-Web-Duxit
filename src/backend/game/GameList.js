import generateRandom from '@utils/generateRandom';
import Game from '@game/Game';

class GameList {
  constructor() {
    // roomID -> game
    // socketID -> game
    this.games = new Map();
  }

  addID(ID, game) {
    this.games.set(ID, game);
  }

  removeID(ID) {
    this.games.delete(ID);
  }

  createGame() {
    const roomID = generateRandom.roomID();
    const game = new Game(roomID);
    this.addID(roomID, game);
    return roomID;
  }

  getGame(ID) {
    const game = this.games.get(ID);
    if (!game) {
      console.log(`Game.findGame: can not find ${ID}`);
      return null;
    }

    return this.games.get(ID);
  }

  hasGame(roomID) {
    return this.games.has(roomID);
  }
}

export default new GameList();
