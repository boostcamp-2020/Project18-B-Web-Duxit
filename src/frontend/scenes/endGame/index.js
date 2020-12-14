import renderScoreboard from './render';

const Scoreboard = class {
  render() {
    const { arrayToBeRemoved } = renderScoreboard();
    this.arrayToBeRemoved = arrayToBeRemoved;
  }

  wrapup() {
    this.arrayToBeRemoved.forEach((gameObject) => {
      gameObject.delete();
    });
  }
};

export default Scoreboard;
