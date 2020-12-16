import PlayerManager from '@utils/PlayerManager';
import LeftTab from '../../game/LeftTab';
import renderScoreboard from './render';

const Scoreboard = class {
  constructor({ round = 0 } = {}) {
    this.round = round;
    this.players = PlayerManager.getPlayers();
  }

  render() {
    const { arrayToBeRemoved } = renderScoreboard({
      round: this.round,
      players: this.players,
    });
    this.arrayToBeRemoved = arrayToBeRemoved;
  }

  wrapup() {
    PlayerManager.updateCurrentScore();
    LeftTab.updateScore(this.players);
    this.arrayToBeRemoved.forEach((gameObject) => {
      gameObject.delete();
    });
  }
};

export default Scoreboard;
