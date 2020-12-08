import DuckCursorObject from '@engine/DuckCursorObject';

const Player = class {
  constructor({ socketID, nickname, color, score = 0, isTeller = false } = {}) {
    this.socketID = socketID;
    this.nickname = nickname;
    this.color = color;
    this.score = score;
    this.isTeller = isTeller;
    this.duck = new DuckCursorObject({ color });
  }

  update(params) {
    Object.keys(params).forEach((param) => {
      this[param] = params[param];
    });
  }
};

export default Player;
