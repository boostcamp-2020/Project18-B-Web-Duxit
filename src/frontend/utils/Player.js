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
    this.isReady = false;
    this.duck = new DuckCursorObject({ color });
    this.setVisibility(false);
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

  setVisibility(value = false) {
    const displayStyle = value ? 'block' : 'none';
    this.duck.instance.style.display = displayStyle;

    if (this.isCurrentPlayer) this.setMouseEvent(value);
  }

  setMouseEvent(value = true) {
    if (value) this.duck.addMouseMoveEvent();
    else this.duck.removeMouseMoveEvent();
  }

  setReady(value) {
    if (this.isReady === value) return;
    this.isReady = value;
    this.setVisibility(value);
  }
};

export default Player;
