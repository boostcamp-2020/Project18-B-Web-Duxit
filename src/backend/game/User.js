import generateRandom from '@utils/generateRandom';
import TOPIC from '@utils/cardTopic.json';

class User {
  constructor({ socketID, nickname, color }) {
    this.socketID = socketID;
    this.nickname = nickname;
    this.color = color;
    this.turnID = 0;
    this.submittedCard = null;
    this.votedCard = null;
    this.isTeller = false;
    this.cards = [];
    this.score = 0;
    this.isReady = false;
  }

  initOnStart({ turnID } = {}) {
    this.turnID = turnID;
    this.score = 0;
  }

  initOnRound({ tellerID = '', cards = [] } = {}) {
    this.submittedCard = null;
    this.votedCard = null;
    this.isReady = false;
    this.isTeller = this.socketID === tellerID;
    this.cards = cards;
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
    const { nickname, color, score, isReady } = this;
    return {
      nickname,
      color,
      score,
      isReady,
    };
  }

  selectCardFromUser({ teller = true }) {
    const cardID = generateRandom.pickOneFromArray(this.cards);
    this.submittedCard = cardID;
    return teller ? { cardID, topic: TOPIC[cardID] } : { cardID };
  }
}

export default User;
