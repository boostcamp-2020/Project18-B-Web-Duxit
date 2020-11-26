import GameObject from './GameObject';

const TextObject = class extends GameObject {
  setContent(content) {
    this.instance.innerText = content;
  }
};

export default TextObject;
