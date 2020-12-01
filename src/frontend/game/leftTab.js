import './left.scss';
import { $id } from '@utils/dom';
import DuckObject from '@engine/DuckObject';

class LeftTab {
  constructor() {
    this.players = [];
  }

  initializePlayers(players = []) {
    const ducks = players.reduce((prev, player) => {
      const duck = this.createDuck(player);
      return [...prev, duck];
    }, []);
    this.players = ducks;
    this.render();
  }

  // eslint-disable-next-line class-methods-use-this
  createDuck(duckInfo) {
    const { socketID, color, nickname } = duckInfo;
    const duck = new DuckObject({ type: 'left', socketID });
    duck.setNickname(nickname);
    duck.setColor(color);
    duck.createElement();
    return duck;
  }

  updatePlayer(playerInfo) {
    const updatedPlayer = this.players.find(
      (player) => player.socketID === playerInfo.socketID,
    );
    if (updatedPlayer) updatedPlayer.update(playerInfo);
    else this.addPlayer(playerInfo);
  }

  addPlayer(playerInfo) {
    const duck = this.createDuck(playerInfo);
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
    this.players.map((player) => playerWrapper.appendChild(player.instance));
  }
}

export default new LeftTab();
