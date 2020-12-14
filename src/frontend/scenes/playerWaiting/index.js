import './style.scss';
import CardManager from '@utils/CardManager';
import renderPlayerWaiting from './render';

const PlayerWaiting = class {
  constructor(endTime) {
    this.endTime = endTime || null;
    this.ducks = new Map();

    Array.from({ length: CardManager.beforeSubmittedCount }, () =>
      CardManager.dropNewCard(),
    );
  }

  render() {
    const { endTime } = this;
    const { arrayToBeRemoved } = renderPlayerWaiting({ endTime });
    this.arrayToBeRemoved = arrayToBeRemoved;
  }

  wrapup() {
    this.arrayToBeRemoved.forEach((gameObject) => {
      gameObject.delete();
    });
  }
};

export default PlayerWaiting;
