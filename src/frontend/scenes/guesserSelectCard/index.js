import renderGuesserSelect from './render';
import setupGuesserSelectCard from './socket';

const GuesserSelectCard = class {
  render() {
    const { arrayToBeRemoved = [] } = renderGuesserSelect();
    this.arrayToBeRemoved = arrayToBeRemoved;
    setupGuesserSelectCard();
  }

  wrapup() {
    this.arrayToBeRemoved.forEach((gameObject) => {
      gameObject.delete();
    });
  }
};

export default GuesserSelectCard;
