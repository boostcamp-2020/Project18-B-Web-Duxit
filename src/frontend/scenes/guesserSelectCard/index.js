import renderGuesserSelect from './render';
import setupGuesserSelectCard from './socket';

const GuesserSelectCard = class {
  render() {
    const { arrayToBeRemoved, ProgressBar } = renderGuesserSelect();
    this.arrayToBeRemoved = arrayToBeRemoved;
    setupGuesserSelectCard({ ProgressBar });
  }

  wrapup() {
    this.arrayToBeRemoved.forEach((gameObject) => {
      gameObject.delete();
    });
  }
};

export default GuesserSelectCard;
