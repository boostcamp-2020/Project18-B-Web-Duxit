class User {
  constructor({ socketID, nickname, color }) {
    this.socketID = socketID;
    this.nickname = nickname;
    this.color = color;
    this.turnID = 0;
    this.submittedCard = null;
    this.votedCard = null;
    this.isTeller = null;
    this.cards = [];
    this.score = 0;
    this.isReady = false;
  }

  initRound() {
    this.submittedCard = null;
    this.votedCard = null;
    this.isTeller = false;
    this.isReady = false;
  }

  setReady(isReady) {
    this.isReady = isReady;
  }

  setColor(color) {
    this.color = color;
  }

  setNickname(nickname) {
    this.nickname = nickname;
  }

  submitCard(cardID) {
    this.submittedCard = cardID;
  }

  voteCard(cardID) {
    this.votedCard = cardID;
  }

  addCard(cardID) {
    this.cards = [...this.cards, cardID];
  }

  getState() {
    const {
      socketID,
      nickname,
      color,
      turnID,
      submittedCard,
      votedCard,
      isTeller,
      cards,
      score,
      isReady,
    } = this;

    return {
      socketID,
      nickname,
      color,
      turnID,
      submittedCard,
      votedCard,
      isTeller,
      cards,
      score,
      isReady,
    };
  }

  getProfile() {
    const { nickname, color, score } = this;
    return {
      nickname,
      color,
      score,
    };
  }
}

export default User;
