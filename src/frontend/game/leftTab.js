import './left.scss';
import { $id } from '@utils/dom';
import DuckObject from '@engine/DuckObject';
import { DUCK_TYPE } from '@type/duck';
import PlayerManager from '@utils/PlayerManager';

const createDuck = (duckInfo) => {
  const { socketID, color, nickname } = duckInfo;
  const duck = new DuckObject({ type: DUCK_TYPE.LEFT_TAB, socketID });
  duck.setNickname(nickname);
  duck.setColor(color);
  duck.createElement();
  return duck;
};

class LeftTab {
  constructor() {
    this.players = [];
    PlayerManager.onInitialize.push(this.initializePlayers.bind(this));
    PlayerManager.onUpdate.push(this.updatePlayer.bind(this));
    PlayerManager.onDelete.push(this.deletePlayer.bind(this));
  }

  initializePlayers(players = []) {
    const ducks = players.reduce((prev, player) => {
      const duck = createDuck(player);
      return [...prev, duck];
    }, []);
    this.players = ducks;
    this.render();
  }

  findPlayer(socketID) {
    return this.players.find((player) => player.socketID === socketID);
  }

  updatePlayer(playerInfo) {
    const updatedPlayer = this.findPlayer(playerInfo.socketID);
    if (updatedPlayer) {
      updatedPlayer.setHat(playerInfo.isTeller);
      updatedPlayer.update(playerInfo);
    } else this.addPlayer(playerInfo);
  }

  deletePlayer(playerInfo) {
    const deletedPlayer = this.findPlayer(playerInfo.socketID);
    const playerWrapper = $id('participants-wrapper');
    playerWrapper.removeChild(deletedPlayer.instance);
    this.players = this.players.filter(
      (player) => player.socketID !== playerInfo.socketID,
    );
    this.renderCount();
  }

  addPlayer(playerInfo) {
    const duck = createDuck(playerInfo);
    const playerWrapper = $id('participants-wrapper');
    this.players = [...this.players, duck];
    playerWrapper.appendChild(duck.instance);
    this.renderCount();
  }

  renderCount() {
    const playerCount = $id('participants-count');
    playerCount.innerText = this.players.length;
  }

  render() {
    this.renderCount();
    const playerWrapper = $id('participants-wrapper');
    this.players.forEach((player) => {
      playerWrapper.appendChild(player.instance);
    });
  }
}

export default new LeftTab();
