import CardManager from '@utils/CardManager';
import SceneManager from '@utils/SceneManager';
import renderPlayerWaiting from './render';

const PlayerWaiting = class {
  constructor(endTime) {
    this.endTime = endTime || null;
    this.ducks = new Map();

    SceneManager.beforeSubmittingPlayers.forEach(() =>
      CardManager.dropNewCard(),
    );
  }

  render() {
    const { endTime } = this;
    const { arrayToBeRemoved } = renderPlayerWaiting({ endTime });
    this.arrayToBeRemoved = arrayToBeRemoved;
  }

  wrapUp() {
    this.arrayToBeRemoved.forEach((gameObject) => {
      gameObject.delete();
    });
  }
};

export default PlayerWaiting;
