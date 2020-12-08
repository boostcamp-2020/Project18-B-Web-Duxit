import { Duck, DuckHat } from '@utils/duck';
import DuckObject from './DuckObject';

class DuckLeftTabObject extends DuckObject {
  constructor({ socketID, color, nickname, ...rest }) {
    super(rest);
    this.socketID = socketID;
    this.color = color;
    this.nickname = nickname;
    this.score = 0;
    this.microphone = false;

    this.addClass('left-duck-wrapper');
    this.setInnerHTML(this.getComponent());
  }

  setNickname(nickname) {
    this.nickname = nickname;
  }

  setColor(color) {
    this.color = color;
  }

  setMicrophone(microphone = false) {
    this.microphone = microphone;
  }

  getComponent() {
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

  render() {
    const nicknameElement = this.instance.querySelector('.duck-nickname');
    nicknameElement.innerText = this.nickname;
  }
}

export default DuckLeftTabObject;
