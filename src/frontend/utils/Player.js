import DuckObject from '@engine/DuckObject';
import DuckCursorObject from '@engine/DuckCursorObject';

const Player = class {
  constructor({
    socketID,
    nickname,
    color,
    isTeller = false,
    isCurrentPlayer = false,
    isReady = false,
  } = {}) {
    this.socketID = socketID;
    this.nickname = nickname;
    this.color = color;
    this.score = {
      correct: 0,
      bonus: 0,
      total: 0,
    };
    this.isTeller = isTeller;
    this.isCurrentPlayer = isCurrentPlayer;
    this.isReady = isReady;
    this.duck = new DuckCursorObject({ isReady, color });
    this.votedCardID = null;
    this.submittedCardID = null;
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

  updateScore(score) {
    const { correctScore: correct, bonusScore: bonus, totalScore } = score;
    const total = this.score.total + totalScore;
    this.score = {
      correct,
      bonus,
      total,
    };
  }

  updateCard(cards) {
    const { votedCardID, submittedCardID } = cards;
    this.submittedCardID = submittedCardID;
    this.votedCardID = votedCardID;
  }
};

export default Player;
