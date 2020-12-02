import { $create } from '@utils/dom';
import Duck from '@utils/duck';
import ImageObject from './ImageObject';

const DuckObject = class extends ImageObject {
  constructor({ socketID, type, ...rest }) {
    super(rest);
    this.socketID = socketID;
    this.nickname = null;
    this.score = 0;
    this.type = type;
    this.hat = false;
    this.microphone = false;
  }

  setNickname(nickname) {
    this.nickname = nickname;
  }

  setColor(color) {
    this.color = color;
  }

  setHat(hat = false) {
    this.hat = hat;
  }

  setMicrophone(microphone = false) {
    this.microphone = microphone;
  }

  createElement() {
    const element = $create('div');
    this.setElement(element);
    this.instance.classList.add('left-duck-wrapper');
    this.instance.innerHTML = this.getComponent();
  }

  getComponent() {
    const { nickname, color, score, hat } = this;
    const option = { color, width: 65 };
    return `
        <div class="duck-image">
          ${hat ? '<span class="duck-hat">hat</span>' : ''}
          ${Duck(option)}
          <span class="duck-score">${score}</span>
        </div>
        <span class="duck-nickname">${nickname}</span>
    `;
  }

  update({ nickname, color }) {
    if (this.nickname === nickname && this.color === color) return;
    this.setNickname(nickname);
    this.setColor(color);
    this.render();
  }

  getChildrenNode(className) {
    const { instance } = this;
    return instance.querySelector(className);
  }

  render() {
    const nicknameElement = this.getChildrenNode('duck-nickname');
    nicknameElement.innerText = this.nickname;
  }
};

export default DuckObject;
