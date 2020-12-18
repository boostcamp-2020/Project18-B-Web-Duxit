import GameObject from './GameObject';

const ImageObject = class extends GameObject {
  constructor({ imagePath = '', ...rest } = {}) {
    super(rest);
    this.setImagePath(imagePath);
  }

  createElement() {
    const element = document.createElement('img');
    element.setAttribute('draggable', false);
    this.setElement(element);
  }

  setImagePath(imagePath) {
    this.instance.setAttribute('src', imagePath);
  }
};

export default ImageObject;
