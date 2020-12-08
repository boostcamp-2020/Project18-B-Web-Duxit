import Player from './Player';
import socket from './socket';

const PlayerManager = class extends Map {
  constructor(...props) {
    super(...props);
    this.currentPlayerID = '';
    this.tellerID = '';

    this.onInitialize = [];
    this.onUpdate = [];
    this.onDelete = [];
  }

  initialize(players = []) {
    this.currentPlayerID = socket.id;
    this.tellerID = '';
    super.clear();
    players.forEach((player) => super.set(player.socketID, new Player(player)));
    this.onInitialize.forEach((callback) => callback(this.getArray()));
  }

  setTellerID(tellerID = '') {
    this.tellerID = tellerID;
    this.forEach((player) => {
      const isTeller = player.socketID === tellerID;
      this.set({
        ...player,
        isTeller,
      });
    });
  }

  set(playerParams = {}) {
    const { socketID } = playerParams;
    if (!socketID) return this;

    let player;
    if (this.has(socketID)) {
      player = this.get(socketID);
      player.update(playerParams);
    } else {
      player = new Player(playerParams);
      super.set(socketID, player);
    }

    this.onUpdate.forEach((callback) => callback(player));
    return this;
  }

  updateCurrentPlayer(playerParams = {}) {
    this.set({ ...playerParams, socketID: this.currentPlayerID });
  }

  delete(socketID) {
    const result = super.delete(socketID);
    this.onDelete.forEach((callback) => callback({ socketID }));
    return result;
  }

  clear() {
    this.initialize();
  }

  getMapObject() {
    return this.map.entries.reduce(
      (state, [socketID, player]) => ({ ...state, [socketID]: player }),
      {},
    );
  }

  getArray() {
    return [...this.values()];
  }

  getCurrentPlayer() {
    return this.get(this.currentPlayerID);
  }

  getTeller() {
    if (this.tellerID) return this.map.get(this.tellerID);
    return [...this.map].find((player) => player.isTeller) || null;
  }
};

export default new PlayerManager();
