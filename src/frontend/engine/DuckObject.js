import ImageObject from './ImageObject';

const DuckObject = class extends ImageObject {
  constructor({ type, ...rest }) {
    super(rest);
    this.nickname = null;
    this.score = 0;
    this.type = type;
    this.hat = true;
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

  getComponent() {
    const { nickname, color, score, hat } = this;
    return `
      <div class="left-duck-wrapper">
        <div class="duck-image" color=${color}>
          ${hat ? '<span class="duck-hat">hat</span>' : ''}
          <span class="duck-score">${score}</span>
        </div>
        <span class="duck-nickname">${nickname}</span>
      </div>
    `;
  }
};

export default DuckObject;
