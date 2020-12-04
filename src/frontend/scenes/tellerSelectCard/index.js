import renderTellerSelect from './render';

const TellerSelectCard = class {
  constructor({ cards }) {
    this.cards = cards;
  }

  render() {
    const { arrayToBeRemoved } = renderTellerSelect();
    this.arrayToBeRemoved = arrayToBeRemoved;
  }

  wrapup() {
    this.arrayToBeRemoved.forEach((gameObject) => {
      gameObject.delete();
    });
  }
};

export default TellerSelectCard;
