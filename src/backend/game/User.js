import generateRandom from '@utils/generateRandom';

class User {
  constructor({ socketID, nickname, color }) {
    this.socketID = socketID;
    this.nickname = nickname;
    this.color = color;

    this.bTeller = false;

    this.turnID = 0;
    this.score = 0;
    this.cards = [];

    this.submittedCard = null;
    this.votedCard = null;
    this.bReady = false;
    this.bSkip = false;
  }

  initOnStart({ turnID } = {}) {
    this.turnID = turnID;
    this.score = 0;
    this.cards = [];
  }

  initOnRound() {
    this.submittedCard = null;
    this.votedCard = null;
    this.bReady = false;
    this.bSkip = false;
  }

  setTeller(boolean) {
    this.bTeller = boolean;
  }

  setReady(bReady) {
    this.bReady = bReady;
  }

  setSkip() {
    this.bSkip = true;
  }

  setColor(color) {
    this.color = color;
  }

  setNickname(nickname) {
    this.nickname = nickname;
  }

  addScore(score) {
    this.score += score;
  }

  submitCard(cardID) {
    this.submittedCard = cardID;
    this.cards = this.cards.filter((card) => card !== cardID);
  }

  voteCard(cardID) {
    if (cardID === this.submittedCard) return;
    if (this.bTeller) return;

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
      bTeller,
      cards,
      score,
      bReady,
    } = this;

    return {
      socketID,
      nickname,
      color,
      turnID,
      submittedCard,
      votedCard,
      bTeller,
      cards,
      score,
      bReady,
    };
  }

  getProfile() {
    const { nickname, color, score, bReady } = this;
    return {
      nickname,
      color,
      score,
      bReady,
    };
  }

  forceSubmitCard() {
    const cardID = generateRandom.pickOneFromArray(this.cards);
    this.submitCard(cardID);
  }

  // forceVoteCard는 다른 플레이어들의 정보가 필요하기 때문에 voteScene에 작성
}

export default User;
