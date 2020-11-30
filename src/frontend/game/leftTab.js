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
    duck.createElement();
    duck.setNickname(nickname);
    duck.setColor(color);
    return duck;
  }

  updatePlayer(playerInfo) {
    const updatedPlayer = this.players.find(
      (player) => player.socketID === playerInfo.socketID,
    );
    console.log('업데이트된 녀석', updatedPlayer);
    if (updatedPlayer) updatedPlayer.update(playerInfo);
    else this.addPlayer(playerInfo);
  }

  addPlayer(playerInfo) {
    const duck = this.createDuck(playerInfo);
    const playerWrapper = $id('participants-wrapper');
    this.players = [...this.players, duck];
    playerWrapper.innerHTML += duck.getComponent();
    this.renderCount();
  }

  renderCount() {
    const playerCount = $id('participants-count');
    playerCount.innerText = this.players.length;
  }

  render() {
    this.renderCount();
    const playerWrapper = $id('participants-wrapper');
    const duckComponents = this.players.reduce((prev, player) => {
      return prev + player.getComponent();
    }, '');
    playerWrapper.innerHTML = duckComponents;
  }
}

export default new LeftTab();
