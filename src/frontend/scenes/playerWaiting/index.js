import './style.scss';
import CardObject from '@engine/CardObject';
import DuckCursorObject from '@engine/DuckCursorObject';
import { DUCK_TYPE } from '@type/duck';
import PlayerManager from '@utils/PlayerManager';
import { $id } from '@utils/dom';
import renderPlayerWaiting from './render';

const createDuck = ({
  color = '',
  x = 25 + Math.random() * 50,
  y = 25 + Math.random() * 50,
} = {}) => {
  const duck = new DuckCursorObject();
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
    this.cards = [];
    this.dropNewCard();
  }

  dropNewCard() {
    const newCard = new CardObject({
      origin: [50, 50],
      position: [50, -50],
    });
    newCard.setWidth(150);
    newCard.angle = Math.random() * 360 - 180;
    newCard.roll(40 + Math.random() * 20, 65 + Math.random() * 20, 3000);
    newCard.attachToRoot();

    this.cards = [...this.cards, newCard];
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
