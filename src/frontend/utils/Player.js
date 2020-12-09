import DuckCursorObject from '@engine/DuckCursorObject';

const Player = class {
  constructor({
    socketID,
    nickname,
    color,
    score = 0,
    isTeller = false,
    isMine = false,
  } = {}) {
    this.socketID = socketID;
    this.nickname = nickname;
    this.color = color;
    this.score = score;
    this.isTeller = isTeller;
    this.isMine = isMine;
    this.duck = new DuckCursorObject({ color });

    if (this.isMine) {
      this.duck.makeFollowMouse();
    } else {
    }
  }

  update(params) {
    const keys = Object.keys(params);
    keys.forEach((key) => {
      this[key] = params[key];
    });
  }

  delete() {
    this.duck.delete();
  }
};

export default Player;
