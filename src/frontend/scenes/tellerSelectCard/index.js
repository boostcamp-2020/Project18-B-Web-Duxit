import renderTellerSelect from './render';

const TellerSelectCard = class {
  constructor({ cards }) {
    this.cards = cards;
  }

  render() {
    const { removeArray } = renderTellerSelect();
    this.removeArray = removeArray;
  }

  wrapup() {
    this.removeArray.forEach((gameObject) => {
      gameObject.delete();
    });
  }
};

export default TellerSelectCard;
