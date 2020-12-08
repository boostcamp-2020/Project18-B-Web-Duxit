const CardManager = class {
  constructor() {
    this.myCards = [];
    this.selectedCard = null;
    this.topic = null;
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
};

export default new CardManager();
