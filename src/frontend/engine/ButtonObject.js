import { $create } from '@utils/dom';
import TextObject from './TextObject';

const ButtonObject = class extends TextObject {
  createElement() {
    const element = $create('button');
    this.setElement(element);
  }

  addClickHandler(clickHandler) {
    this.instance.addEventListener('click', clickHandler);
  }
};

export default ButtonObject;
