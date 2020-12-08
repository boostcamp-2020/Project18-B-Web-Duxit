import { $create } from '@utils/dom';
import ImageObject from './ImageObject';

class DuckObject extends ImageObject {
  constructor({ color, ...rest } = {}) {
    super(rest);
    this.color = color;
    this.hat = false;
    this.setElement($create('div'));
  }

  setColor(color) {
    this.color = color;
  }

  setHat(boolean) {
    const hatElement = this.getChildrenNode('.duck-hat');
    const display = boolean ? 'block' : 'none';
    hatElement.style.display = display;
  }

  // createElement(elementType = 'div') {
  //   const element = $create(elementType);
  //   this.setElement(element);
  //   if (this.type === DUCK_TYPE.TELLER) this.createTellerDuckElement();
  //   else if (this.type === DUCK_TYPE.CURSOR) this.createCursorDuckElement();
  //   else this.createLeftTabDuckElement();
  // }

  // createTellerDuckElement() {
  //   this.addClass('teller-duck-wrapper');
  //   this.setInnerHTML(this.getComponentForTeller());
  // }

  // createLeftTabDuckElement() {
  //   this.addClass('left-duck-wrapper');
  //   this.setInnerHTML(this.getComponentForLeft());
  // }

  // createCursorDuckElement() {
  //   this.addClass('cursor-duck-wrapper');
  //   this.setInnerHTML(Duck({ color: this.color, width: 100 }));
  // }

  // getComponentForTeller() {
  //   const { color } = this;
  //   const option = { color, width: 200 };
  //   return Duck(option);
  // }

  // getComponentForLeft() {
  //   const { nickname, color, score } = this;
  //   const option = { color, width: 55 };
  //   return `
  //       <div class="duck-image">
  //         ${DuckHat({ width: 45 })}
  //         ${Duck(option)}
  //         <span class="duck-score">${score}</span>
  //       </div>
  //       <span class="duck-nickname">${nickname}</span>
  //   `;
  // }

  // update({ nickname, color }) {
  //   if (this.nickname === nickname && this.color === color) return;
  //   this.setNickname(nickname);
  //   this.setColor(color);
  //   this.render();
  // }

  getChildrenNode(className) {
    const { instance } = this;
    return instance.querySelector(className);
  }

  // render() {
  //   const nicknameElement = this.getChildrenNode('.duck-nickname');
  //   nicknameElement.innerText = this.nickname;
  // }
}

export default DuckObject;
