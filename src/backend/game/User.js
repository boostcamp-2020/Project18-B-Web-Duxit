import generateRandom from '@utils/generateRandom';

class User {
  constructor({ socketID, nickname, color }) {
    this.socketID = socketID;
    this.nickname = nickname;
    this.color = color;

    this.isTeller = false;

    this.turnID = 0;
    this.score = 0;
    this.cards = [];

    this.submittedCard = null;
    this.votedCard = null;
    this.isReady = false;
    this.isSkip = false;
  }

  initOnStart({ turnID } = {}) {
    this.turnID = turnID;
    this.score = 0;
    this.cards = [];
  }

  initOnRound() {
    this.submittedCard = null;
    this.votedCard = null;
    this.isReady = false;
    this.isSkip = false;
  }

  setTeller(boolean) {
    this.isTeller = boolean;
  }

  setReady(isReady) {
    this.isReady = isReady;
  }

  setSkip() {
    this.isSkip = true;
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

    // 뽑은 카드를 리스트에서 지움
    this.cards = this.cards.filter((card) => card !== cardID);
  }

  voteCard(cardID) {
    // 악성 유저가 있을까봐 자기 카드 선택하는거 방지
    if (cardID === this.submittedCard) return;
    // 텔러가 vote 못하게 막기
    if (this.isTeller) return;

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
    const { nickname, color, score, isReady } = this;
    return {
      nickname,
      color,
      score,
      isReady,
    };
  }

  forceSubmitCard() {
    const cardID = generateRandom.pickOneFromArray(this.cards);
    this.submitCard(cardID);
  }

  // forceVoteCard는 다른 플레이어들의 정보가 필요하기 때문에 voteScene에 작성
}

export default User;
