import renderGuesserWaiting from './render';
import setupGuesserWaiting from './socket';

const GuesserWaiting = class {
  constructor({ endTime }) {
    this.endTime = endTime;
  }

  render() {
    const { endTime } = this;
    const { arrayToBeRemoved = [] } = renderGuesserWaiting({ endTime });
    this.arrayToBeRemoved = arrayToBeRemoved;
    setupGuesserWaiting();
  }

  wrapup() {
    this.arrayToBeRemoved.forEach((gameObject) => {
      gameObject.delete();
    });
  }
};

export default GuesserWaiting;
