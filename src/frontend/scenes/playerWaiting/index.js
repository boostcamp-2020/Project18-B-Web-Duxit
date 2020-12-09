import './style.scss';
import TIME from '@type/time';
import CardManager from '@utils/CardManager';
import renderPlayerWaiting from './render';
import setupPlayerWaiting from './socket';

const PlayerWaiting = class {
  constructor({ ProgressBar, endTime }) {
    this.wrapupInterval = TIME.WRAP_UP.PLAYER_WAITING;
    this.endTime = endTime;
    this.ProgressBar = ProgressBar;
    this.ducks = new Map();
    setupPlayerWaiting();
  }

  render() {
    const { ProgressBar, endTime } = this;
    const { arrayToBeRemoved } = renderPlayerWaiting({ ProgressBar, endTime });
    this.arrayToBeRemoved = arrayToBeRemoved;

    Array.from({ length: CardManager.beforeSubmittedCount }, () =>
      CardManager.dropNewCard(),
    );
  }

  wrapup() {
    this.arrayToBeRemoved.forEach((gameObject) => {
      gameObject.delete();
    });
  }
};

export default PlayerWaiting;
