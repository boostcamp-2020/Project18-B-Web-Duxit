import renderTellerSelect from './render';
import setupTellerSelectSocket from './socket';

const TellerSelectCard = class {
  constructor({ cards }) {
    this.cards = cards;
  }

  render() {
    const { arrayToBeRemoved = [] } = renderTellerSelect();
    this.arrayToBeRemoved = arrayToBeRemoved;
    setupTellerSelectSocket();
  }

  wrapup() {
    this.arrayToBeRemoved.forEach((gameObject) => {
      gameObject.delete();
    });
  }
};

export default TellerSelectCard;
