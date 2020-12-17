import renderVoteResult from './render';

const VoteResult = class {
  constructor(endTime) {
    this.endTime = endTime;
  }

  render() {
    const { arrayToBeRemoved = [] } = renderVoteResult(this.endTime);
    this.arrayToBeRemoved = arrayToBeRemoved;
  }

  wrapUp() {
    this.arrayToBeRemoved.forEach((gameObject) => {
      gameObject.delete();
    });
  }
};

export default VoteResult;
