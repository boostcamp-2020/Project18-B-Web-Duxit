import CardObject from '@engine/CardObject';
import GameObject from '@engine/GameObject';
import TIME from '@type/time';
import { GET_IMAGE_PATH } from '@utils/text';
import CARD_POSITION from '@type/cardPosition.json';

// eslint-disable-next-line import/prefer-default-export
export const createCards = (sceneName, cardIds = Array(6).fill(null)) => {
  const cardPosition = CARD_POSITION[sceneName];
  const emptyObject = new GameObject();
  emptyObject.createElement();
  emptyObject.addClass('teller-cards-wrapper');
  const cards = cardIds.map((cardID, index) => {
    const card = new CardObject({
      imagePath: cardID ? GET_IMAGE_PATH(cardID) : undefined,
      cardID,
    });
    card.addClass('teller-duck-card');
    card.setWidth(cardPosition.size);
    card.move(50, cardPosition.moveFrom, 0);
    card.rotate(cardPosition.angle[index], 0);
    card.move(cardPosition.x[index], cardPosition.y[index], TIME.ONE_SECOND);
    emptyObject.appendChild(card);
    return card;
  });
  return { CardsWrapper: emptyObject, cards };
};
