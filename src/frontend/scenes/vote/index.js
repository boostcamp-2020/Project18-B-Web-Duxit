import renderVote from './render';

const Vote = class {
  constructor({ endTime }) {
    this.endTime = endTime;
  }

  render() {
    const { endTime } = this;
    const { arrayToBeRemoved = [] } = renderVote({ endTime });
    this.arrayToBeRemoved = arrayToBeRemoved;
  }

  wrapup() {
    this.arrayToBeRemoved.forEach((gameObject) => {
      gameObject.delete();
    });
  }
};

export default Vote;
