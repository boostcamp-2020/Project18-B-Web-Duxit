import PlayerManager from '@utils/PlayerManager';
import renderScoreboard from './render';

const Scoreboard = class {
  constructor({ round = 0 } = {}) {
    this.round = round;
    this.animationTimeout = null;
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
    PlayerManager.forEach((player, socketID) => {
      PlayerManager.set(socketID, {
        ...player,
        score: {
          ...player.score,
          current:
            player.score.current + player.score.correct + player.score.bonus,
        },
      });
    });
    this.arrayToBeRemoved.forEach((gameObject) => {
      gameObject.delete();
    });
  }
};

export default Scoreboard;
