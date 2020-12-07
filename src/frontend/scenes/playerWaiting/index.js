import './style.scss';
import renderPlayerWaiting from './render';

const PlayerWaiting = class {
  render() {
    const { arrayToBeRemoved } = renderPlayerWaiting();
    this.arrayToBeRemoved = arrayToBeRemoved;
  }

  wrapup() {
    this.arrayToBeRemoved.forEach((gameObject) => {
      gameObject.delete();
    });
  }
};

export default PlayerWaiting;
