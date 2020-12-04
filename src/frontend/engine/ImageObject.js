import GameObject from './GameObject';

const ImageObject = class extends GameObject {
  createElement() {
    const element = document.createElement('img');
    this.setElement(element);
  }

  setImagePath(imagePath) {
    this.instance.setAttribute('src', imagePath);
  }
};

export default ImageObject;
