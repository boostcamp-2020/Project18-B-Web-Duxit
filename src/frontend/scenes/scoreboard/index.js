import PlayerManager from '@utils/PlayerManager';
import renderScoreboard from './render';

const Scoreboard = class {
  constructor(
    params = {
      round: 0,
    },
  ) {
    this.params = params;
    this.animationTimeout = null;
  }

  render() {
    const players = PlayerManager.getPlayers();

    const { arrayToBeRemoved } = renderScoreboard({
      ...this.params,
      players,
    });
    this.arrayToBeRemoved = arrayToBeRemoved;
  }

  wrapup() {
    this.arrayToBeRemoved.forEach((gameObject) => {
      gameObject.delete();
    });
  }
};

export default Scoreboard;
