import { $create } from '@utils/dom';
import GameObject from './GameObject';

const InputObject = class extends GameObject {
  createElement() {
    const element = $create('input');
    this.setElement(element);
  }

  setDisabled() {
    this.instance.setAttribute('disabled', true);
  }

  setPlaceHolder(placeholder) {
    this.placeholder = placeholder;
  }

  setValue(value) {
    this.instance.value = value;
  }

  addClickHandler(clickHandler) {
    this.instance.addEventListener('click', clickHandler);
  }
};

export default InputObject;
