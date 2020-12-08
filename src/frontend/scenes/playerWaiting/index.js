import './style.scss';
import DuckObject from '@engine/DuckObject';
import PlayerManager from '@utils/PlayerManager';
import CardManager from '@utils/CardManager';
import { $id } from '@utils/dom';
import { DUCK_TYPE } from '@type/duck';
import renderPlayerWaiting from './render';
import { moveMyDuck } from '../waitingRoom/events';
import setupPlayerWaiting from './socket';

const createDuck = ({
  color = '',
  x = 25 + Math.random() * 50,
  y = 25 + Math.random() * 50,
} = {}) => {
  const duck = new DuckObject({ type: DUCK_TYPE.CURSOR });
  duck.setColor(color);
  duck.createElement();
  duck.setOriginCenter();
  duck.move(x, y, 0);
  duck.setDepth(2);
  duck.attachToRoot();
  return duck;
};

const PlayerWaiting = class {
  constructor() {
    this.ducks = new Map();

    PlayerManager.forEach(({ socketID, ...duckData }) => {
      const duck = createDuck(duckData);
      this.ducks.set(socketID, duck);
    });
    const myDuck = this.ducks.get(PlayerManager.currentPlayerID);
    myDuck.setDepth(3);
    this.duckMoveEvent = (e) => moveMyDuck(e, myDuck);
    $id('root').addEventListener('click', this.duckMoveEvent);
    Array.from({ length: CardManager.submittedCount }, () =>
      CardManager.dropNewCard(),
    );
    setupPlayerWaiting();
  }

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
