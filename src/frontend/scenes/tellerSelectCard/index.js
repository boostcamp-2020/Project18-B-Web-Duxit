import TIME from '@type/time';
import CardManager from '@utils/CardManager';
import renderTellerSelect from './render';

const TellerSelectCard = class {
  constructor({ cards, endTime }) {
    this.cards = cards;
    this.endTime = endTime;
    this.wrapupInterval = TIME.WRAP_UP.TELLER_SELECT;
  }

  render() {
    const { endTime } = this;
    const { arrayToBeRemoved = [] } = renderTellerSelect({ endTime });
    this.arrayToBeRemoved = arrayToBeRemoved;
  }

  wrapup() {
    this.arrayToBeRemoved.forEach((gameObject) => {
      gameObject.delete();
    });
    CardManager.liftSelectedCardUp();
  }
};

export default TellerSelectCard;
