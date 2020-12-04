import { $create } from '@utils/dom';
import { DUCK_TYPE } from '@utils/type';
import Duck, { DuckHat } from '@utils/duck';
import ImageObject from './ImageObject';

const DuckObject = class extends ImageObject {
  constructor({ socketID, type = DUCK_TYPE.LEFT_TAB, ...rest } = {}) {
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
    const hatElement = this.getChildrenNode('.duck-hat');
    const displayType = hat ? 'block' : 'none';
    hatElement.style.display = displayType;
  }

  setMicrophone(microphone = false) {
    this.microphone = microphone;
  }

  createElement(elementType = 'div') {
    const element = $create(elementType);
    this.setElement(element);
    if (this.type === DUCK_TYPE.TELLER) this.createTellerDuckElement();
    else if (this.type === DUCK_TYPE.CURSOR) this.createCursorDuckElement();
    else this.createLeftTabDuckElement();
  }

  createTellerDuckElement() {
    this.addClass('teller-duck-wrapper');
    this.setInnerHTML(this.getComponentForTeller());
  }

  createLeftTabDuckElement() {
    this.addClass('left-duck-wrapper');
    this.setInnerHTML(this.getComponentForLeft());
  }

  createCursorDuckElement() {
    this.addClass('cursor-duck-wrapper');
    this.setInnerHTML(Duck({ color: this.color, width: 100 }));
  }

  getComponentForTeller() {
    const { color } = this;
    const option = { color, width: 200 };
    return Duck(option);
  }

  getComponentForLeft() {
    const { nickname, color, score } = this;
    const option = { color, width: 55 };
    return `
        <div class="duck-image">
          ${DuckHat({ width: 45 })}
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
