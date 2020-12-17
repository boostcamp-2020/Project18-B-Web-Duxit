import renderGuesserWaiting from './render';

const GuesserWaiting = class {
  constructor({ endTime }) {
    this.endTime = endTime;
  }

  render() {
    const { endTime } = this;
    const { arrayToBeRemoved = [], cards } = renderGuesserWaiting({ endTime });
    this.arrayToBeRemoved = arrayToBeRemoved;
    this.cards = cards;
  }

  wrapUp() {
    this.arrayToBeRemoved.forEach((gameObject) => {
      gameObject.delete();
    });
  }
};

export default GuesserWaiting;
