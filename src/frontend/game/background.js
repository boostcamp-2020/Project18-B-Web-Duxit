import { $id } from '@utils/dom';
import ImageObject from '@engine/ImageObject';
import TextObject from '@engine/TextObject';
import stonePath from '@resources/stone.png';
import stonePosition from '@type/stonePosition.json';
import GameObject from '../engine/GameObject';

const initializeBackground = () => {
  const background = $id('background');
  stonePosition.forEach((position, index) => {
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
    }).setContent(index + 1);
    background.appendChild(wrapper.instance);
  });
};

export default initializeBackground;
