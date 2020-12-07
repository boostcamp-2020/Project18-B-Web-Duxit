import renderGuesserWaiting from './render';
import setupGuesserWaiting from './socket';

const GuesserWaiting = class {
  constructor() {
    this.cards = null;
  }

  render() {
    const { arrayToBeRemoved = [] } = renderGuesserWaiting();
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
