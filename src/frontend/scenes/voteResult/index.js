import renderVoteResult from './render';

const VoteResult = class {
  render() {
    const { arrayToBeRemoved = [] } = renderVoteResult();
    this.arrayToBeRemoved = arrayToBeRemoved;
  }

  wrapUp() {
    this.arrayToBeRemoved.forEach((gameObject) => {
      gameObject.delete();
    });
  }
};

export default VoteResult;
