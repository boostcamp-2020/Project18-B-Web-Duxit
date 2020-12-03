import { $create } from '@utils/dom';
import { DUCK_TYPE } from '@utils/type';
import Duck, { DuckHat } from '@utils/duck';
import ImageObject from './ImageObject';

const DuckObject = class extends ImageObject {
  constructor({ socketID, type = DUCK_TYPE.LEFT_TAB, ...rest }) {
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
    if (this.type === DUCK_TYPE.TELLER) this.createTellerDuckElement();
    else this.createLeftTabDuckElement();
  }

  createTellerDuckElement() {
    this.instance.classList.add('teller-duck-wrapper');
    this.instance.innerHTML = this.getComponentForTeller();
  }

  createLeftTabDuckElement() {
    this.instance.classList.add('left-duck-wrapper');
    this.instance.innerHTML = this.getComponentForLeft();
  }

  getComponentForTeller() {
    const { color } = this;
    const option = { color, width: 200 };
    return Duck(option);
  }

  getComponentForLeft() {
    const { nickname, color, score, hat } = this;
    const option = { color, width: 50 };
    return `
        <div class="duck-image">
          ${hat ? DuckHat({ width: 40 }) : ''}
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
    const nicknameElement = this.getChildrenNode('.duck-nickname');
    nicknameElement.innerText = this.nickname;
  }
};

export default DuckObject;
