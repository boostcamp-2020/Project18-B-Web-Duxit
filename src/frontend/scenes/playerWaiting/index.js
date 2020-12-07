import rendePlayerWaiting from './render';

const PlayerWaiting = class {
  render() {
    const { arrayToBeRemoved = [] } = rendePlayerWaiting();
    this.arrayToBeRemoved = arrayToBeRemoved;
  }

  wrapup() {
    this.arrayToBeRemoved.forEach((gameObject) => {
      gameObject.delete();
    });
  }
};

export default PlayerWaiting;
