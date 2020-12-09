import TIME from '@type/time';
import CardManager from '../../utils/CardManager';
import renderTellerSelect from './render';
import setupTellerSelectSocket from './socket';

const TellerSelectCard = class {
  constructor({ cards }) {
    this.cards = cards;
    this.wrapupInterval = TIME.WRAP_UP.TELLER_SELECT;
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
    CardManager.liftSelectedCardUp();
  }
};

export default TellerSelectCard;
