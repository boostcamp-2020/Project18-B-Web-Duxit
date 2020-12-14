import DuckObject from '@engine/DuckObject';
import DuckCursorObject from '@engine/DuckCursorObject';

const Player = class {
  constructor({
    socketID,
    nickname,
    color,
    score = 0,
    isTeller = false,
    isCurrentPlayer = false,
    isReady = false,
  } = {}) {
    this.socketID = socketID;
    this.nickname = nickname;
    this.color = color;
    this.score = score;
    this.isTeller = isTeller;
    this.isCurrentPlayer = isCurrentPlayer;
    this.isReady = isReady;
    this.duck = new DuckCursorObject({ isReady, color });
  }

  makeDuck(options = {}) {
    return new DuckObject({ color: this.color, ...options });
  }

  update(params) {
    const keys = Object.keys(params);
    keys.forEach((key) => {
      this[key] = params[key];
    });

    this.duck.setColor(this.color);
  }

  delete() {
    this.duck.delete();
  }

  setReady(value) {
    if (this.isReady === value) return;
    this.isReady = value;
    this.duck.setVisibility(value, this.isCurrentPlayer);
  }
};

export default Player;
