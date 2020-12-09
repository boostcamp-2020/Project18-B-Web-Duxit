import './style.scss';
import PlayerManager from '@utils/PlayerManager';
import CardManager from '@utils/CardManager';
import { $id } from '@utils/dom';
import renderPlayerWaiting from './render';
import setupPlayerWaiting from './socket';

const PlayerWaiting = class {
  constructor() {

    this.ducks = new Map();
    setupPlayerWaiting();
  }

  render() {
    const { arrayToBeRemoved } = renderPlayerWaiting();
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
