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

  set(player = {}) {
    const { socketID } = player;
    if (!socketID) return this;

    const old = this.get(socketID) || {};
    const updated = { ...old, ...player };
    super.set(socketID, new Player(updated));

    this.onUpdate.forEach((callback) => callback(updated));
    return this;
  }

  updateCurrentPlayer(player = {}) {
    this.set({ ...player, socketID: this.currentPlayerID });
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
