import { $id } from '@utils/dom';
import ImageObject from '@engine/ImageObject';
import TextObject from '@engine/TextObject';
import stonePath from '@resources/stone.png';
import stonePosition from '@type/stonePosition.json';
import GameObject from '../engine/GameObject';

const initializeLayout = (background) =>
  stonePosition.map((position, index) => {
    const wrapper = new GameObject({
      classes: ['stone'],
      position,
      origin: [50, 30],
    });
    const stone = new ImageObject({
      imagePath: stonePath,
      parent: wrapper,
    });
    const number = new TextObject({
      parent: wrapper,
      classes: ['stone-text'],
    }).setContent(index);
    background.appendChild(wrapper.instance);
  });
};

const Background = class {
  constructor() {
    this.dom = $id('background');
    initializeLayout(this.dom);
  }
};

export default new Background();
