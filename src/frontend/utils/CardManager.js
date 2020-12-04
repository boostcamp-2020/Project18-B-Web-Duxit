const CardManager = class {
  constructor() {
    this.myCards = [];
    this.selectedCard = null;
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
};

export default new CardManager();
