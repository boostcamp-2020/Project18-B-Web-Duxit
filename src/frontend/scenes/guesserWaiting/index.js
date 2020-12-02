import renderGuesserWaiting from './render';

const GuesserWaiting = class {
  constructor() {
    this.cards = null;
  }

  render() {
    const { removeArray } = renderGuesserWaiting();
    this.removeArray = removeArray;
  }

  wrapup() {
    this.removeArray.forEach((gameObject) => {
      gameObject.delete();
    });
  }
};

export default GuesserWaiting;
