import CardManager from '@utils/CardManager';
import renderTellerSelect from './render';

const TellerSelectCard = class {
  constructor({ cards, endTime }) {
    this.cards = cards;
    this.endTime = endTime;
  }

  render() {
    const { endTime } = this;
    const { arrayToBeRemoved = [] } = renderTellerSelect({ endTime });
    this.arrayToBeRemoved = arrayToBeRemoved;
  }

  wrapUp() {
    this.arrayToBeRemoved.forEach((gameObject) => {
      gameObject.delete();
    });
    CardManager.liftSelectedCardUp();
  }
};

export default TellerSelectCard;
