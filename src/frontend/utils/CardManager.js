const CardManager = class {
  constructor() {
    this.myCards = [];
    this.selectedCard = null;
    this.topic = null;
    this.submittedCount = 0;
  }

  initailizeMyCards(cards) {
    this.myCards = cards;
  }

  addMyCard(card) {
    this.myCards = [...this.myCards, card];
  }

  selectCard(selectedCard) {
    this.selectedCard = selectedCard;
  }

  removeSelectedCard() {
    this.myCards = this.myCards.filter((card) => card !== this.selectedCard);
  }

  updateTopic(topic) {
    this.topic = topic;
  }

  addSubmittedCardCount() {
    this.submittedCount += 1;
  }
};

export default new CardManager();
