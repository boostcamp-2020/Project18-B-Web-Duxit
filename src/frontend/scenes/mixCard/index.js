import renderMixCard from './render';

const MixCard = class {
  render() {
    const { arrayToBeRemoved = [] } = renderMixCard();
    this.arrayToBeRemoved = arrayToBeRemoved;
  }

  wrapup() {
    this.arrayToBeRemoved.forEach((gameObject) => {
      gameObject.delete();
    });
  }
};

export default MixCard;
