import CardObject from '@engine/CardObject';
import { GET_IMAGE_PATH } from '@utils/text';
import TIME from '@type/time';

const CardManager = class {
  constructor() {
    this.myCards = [];
    this.selectedCard = null;
    this.topic = null;
    this.submittedCards = [];
    this.beforeSubmittedCount = 0;
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
    this.beforeSubmittedCount += 1;
  }

  addSubmittedCard(cardObject) {
    this.submittedCards = [...this.submittedCards, cardObject];
  }

  liftSelectedCardUp() {
    const liftingCard = new CardObject({
      position: [50, 50],
      facingUp: true,
      imagePath: GET_IMAGE_PATH(this.selectedCard),
    });
    liftingCard.setWidth(250);
    liftingCard.attachToRoot();
    liftingCard.move(50, 30, TIME.LIFT_CARD_UP);
    setTimeout(() => liftingCard.delete(), TIME.LIFT_CARD_DELETE);
  }

  dropNewCard() {
    const newCard = new CardObject({
      origin: [50, 50],
      position: [50, -50],
    });
    newCard.setWidth(150);
    newCard.angle = Math.random() * 360 - 180;
    newCard.roll(40 + Math.random() * 20, 65 + Math.random() * 20, 3000);
    newCard.attachToRoot();

    this.addSubmittedCard(newCard);
  }
};

export default new CardManager();
