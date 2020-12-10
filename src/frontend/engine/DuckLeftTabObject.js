import { Duck, DuckHat } from '@utils/duck';
import DuckObject from './DuckObject';

class DuckLeftTabObject extends DuckObject {
  constructor({ socketID, nickname, ...rest }) {
    super(rest);
    this.socketID = socketID;
    this.nickname = nickname;
    this.score = 0;
    this.microphone = false;
    this.duckWidth = 55;
    this.hatWidth = 45;

    this.addClass('left-duck-wrapper');
    this.render();
  }

  setNickname(nickname) {
    this.nickname = nickname;
    const nicknameElement = this.getChildrenNode('.duck-nickname');
    nicknameElement.innerText = this.nickname;
  }

  setMicrophone(microphone = false) {
    this.microphone = microphone;
  }

  generateDuckHTML() {
    const { nickname, color, score, duckWidth, hatWidth } = this;
    return `
        <div class="duck-image">
          ${DuckHat({ width: hatWidth })}
          ${Duck({ color, width: duckWidth })}
          <span class="duck-score">${score}</span>
        </div>
        <span class="duck-nickname">${nickname}</span>
    `;
  }

  update({ nickname, color }) {
    if (this.nickname === nickname && this.color === color) return;
    this.setNickname(nickname);
    this.setColor(color);
  }
}

export default DuckLeftTabObject;
