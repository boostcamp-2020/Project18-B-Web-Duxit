import renderGuesserSelect from './render';
import setupGuesserSelectCard from './socket';

const GuesserSelectCard = class {
  constructor({ endTime }) {
    this.endTime = endTime;
  }

  render() {
    const { endTime } = this;
    const { arrayToBeRemoved, ProgressBar } = renderGuesserSelect({ endTime });
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
