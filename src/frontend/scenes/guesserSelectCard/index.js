import renderGuesserSelect from './render';

const GuesserSelectCard = class {
  constructor({ endTime }) {
    this.endTime = endTime;
    this.passingTimerClear = true;
  }

  render() {
    const { endTime } = this;
    const { arrayToBeRemoved } = renderGuesserSelect({ endTime });
    this.arrayToBeRemoved = arrayToBeRemoved;
  }

  wrapup() {
    this.arrayToBeRemoved.forEach((gameObject) => {
      gameObject.delete();
    });
  }
};

export default GuesserSelectCard;
