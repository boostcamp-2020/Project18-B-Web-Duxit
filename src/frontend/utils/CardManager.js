import CardObject from '@engine/CardObject';
import TextObject from '@engine/TextObject';
import { GET_IMAGE_PATH } from '@utils/text';
import TIME from '@type/time';

const CardManager = class {
  constructor() {
    this.myCards = [];
    this.selectedCard = null;
    this.topic = null;
    this.submittedCards = [];
    this.beforeSubmittedCount = 0;
    this.votedCard = null;
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

  voteCard(votedCard) {
    this.votedCard = votedCard;
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

  updateCardInformation(cardIDs) {
    this.submittedCards.forEach((card, idx) => {
      card.setCardInformation(cardIDs[idx]);
    });
  }

  liftSelectedCardUp() {
    const liftingCard = new CardObject({
      position: [50, 60],
      facingUp: true,
      imagePath: GET_IMAGE_PATH(this.selectedCard),
    });
    liftingCard.setWidth(250);
    liftingCard.setDepth(10);
    liftingCard.attachToRoot();

    setTimeout(
      () => liftingCard.move(50, -50, TIME.LIFT_CARD_UP),
      TIME.ONE_SECOND,
    );

    const topicText = new TextObject();
    topicText.setContent(this.topic);
    topicText.addClass(['topic-text', 'bottom']);
    topicText.attachToRoot();

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
