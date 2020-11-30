import './left.scss';
import { $id } from '@utils/dom';
import DuckObject from '@engine/DuckObject';

class LeftTab {
  constructor() {
    this.players = [];
  }

  initializePlayers(players = []) {
    const ducks = players.reduce((prev, player) => {
      const { color, nickname } = player;
      const duck = new DuckObject({ type: 'left' });
      duck.createElement();
      duck.setNickname(nickname);
      duck.setColor(color);
      return [...prev, duck];
    }, []);
    this.players = ducks;
    this.render();
  }

  updatePlayers(updatedPlayer) {}

  render() {
    const playerCount = $id('participants-count');
    const playerWrapper = $id('participants-wrapper');
    const duckComponents = this.players.map((player) => player.getComponent());

    playerCount.innerText = this.players.length + 1;
    playerWrapper.innerHTML = duckComponents;
  }
}

export default new LeftTab();
