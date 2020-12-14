import PlayerManager from '@utils/PlayerManager';
import renderScoreboard from './render';

const EndGame = class {
  constructor({ winnerID } = {}) {
    this.winnerID = winnerID;
  }

  render() {
    const players = PlayerManager.getPlayers();

    const { arrayToBeRemoved } = renderScoreboard({
      players,
      winnerID: this.winnerID,
    });
    this.arrayToBeRemoved = arrayToBeRemoved;
  }

  wrapup() {
    this.arrayToBeRemoved.forEach((gameObject) => {
      gameObject.delete();
    });
  }
};

export default EndGame;
