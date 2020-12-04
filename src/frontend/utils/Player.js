const Player = class {
  constructor({ socketID, nickname, color, score = 0, isTeller = false } = {}) {
    this.socketID = socketID;
    this.nickname = nickname;
    this.color = color;
    this.score = score;
    this.isTeller = isTeller;
  }
};

export default Player;
