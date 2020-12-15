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

    const { arrayToBeRemoved, totalAnimationTime } = renderScoreboard({
      ...this.params,
      players,
    });
    this.arrayToBeRemoved = arrayToBeRemoved;
    this.animationTimeout = setTimeout(
      this.afterAnimation.bind(this),
      totalAnimationTime,
    );
  }

  afterAnimation() {
    this.animationTimeout = null;
    // socket.emit('scoreboard animation ends');
  }

  wrapup() {
    if (this.animationTimeout) {
      this.afterAnimation();
      clearTimeout(this.animationTimeout);
    }
    this.arrayToBeRemoved.forEach((gameObject) => {
      gameObject.delete();
    });
  }
};

export default Scoreboard;
