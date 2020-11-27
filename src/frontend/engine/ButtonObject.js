import TextObject from './TextObject';

const ButtonObject = class extends TextObject {
  createElement() {
    const element = document.createElement('button');
    this.setElement(element);
  }

  addClickHandler(clickHandler) {
    this.instance.addEventListener('click', clickHandler);
  }
};

export default ButtonObject;
