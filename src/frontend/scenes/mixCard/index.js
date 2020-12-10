import renderMixCard from './render';
import setupMixCard from './socket';

const MixCard = class {
  render() {
    const { arrayToBeRemoved = [] } = renderMixCard();
    this.arrayToBeRemoved = arrayToBeRemoved;
    setupMixCard();
  }

  wrapup() {
    this.arrayToBeRemoved.forEach((gameObject) => {
      gameObject.delete();
    });
  }
};

export default MixCard;
