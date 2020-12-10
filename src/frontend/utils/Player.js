import DuckCursorObject from '@engine/DuckCursorObject';

const Player = class {
  constructor({
    socketID,
    nickname,
    color,
    score = 0,
    isTeller = false,
    isCurrentPlayer = false,
  } = {}) {
    this.socketID = socketID;
    this.nickname = nickname;
    this.color = color;
    this.score = score;
    this.isTeller = isTeller;
    this.isCurrentPlayer = isCurrentPlayer;
    this.duck = new DuckCursorObject({ color });

    if (this.isCurrentPlayer) {
      this.duck.makeFollowMouse();
    } else {
    }
  }

  update(params) {
    const keys = Object.keys(params);
    keys.forEach((key) => {
      this[key] = params[key];
    });

    // update player duck
    this.duck.setColor(this.color);
  }

  delete() {
    this.duck.delete();
  }
};

export default Player;
