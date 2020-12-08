import { $create } from '@utils/dom';
import ImageObject from './ImageObject';

class DuckObject extends ImageObject {
  constructor({ color, ...rest } = {}) {
    super(rest);
    this.color = color;
    this.hat = false;
    this.setElement($create('div'));
  }

  setColor(color) {
    this.color = color;
  }

  setHat(boolean) {
    const hatElement = this.getChildrenNode('.duck-hat');
    const display = boolean ? 'block' : 'none';
    hatElement.style.display = display;
  }

  getChildrenNode(className) {
    const { instance } = this;
    return instance.querySelector(className);
  }
}

export default DuckObject;
