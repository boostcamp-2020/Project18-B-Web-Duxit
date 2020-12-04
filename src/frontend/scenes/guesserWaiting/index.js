import renderGuesserWaiting from './render';

const GuesserWaiting = class {
  constructor() {
    this.cards = null;
  }

  render() {
    const { arrayToBeRemoved } = renderGuesserWaiting();
    this.arrayToBeRemoved = arrayToBeRemoved;
  }

  wrapup() {
    this.arrayToBeRemoved.forEach((gameObject) => {
      gameObject.delete();
    });
  }
};

export default GuesserWaiting;
