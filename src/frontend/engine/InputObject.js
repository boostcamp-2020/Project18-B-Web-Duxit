import GameObject from './GameObject';

const InputObject = class extends GameObject {
  createElement() {
    const element = document.createElement('input');
    this.setElement(element);
  }

  setPlaceHolder(placeholder) {
    this.placeholder = placeholder;
  }

  addClickHandler(clickHandler) {
    this.instance.addEventListener('click', clickHandler);
  }
};

export default InputObject;
