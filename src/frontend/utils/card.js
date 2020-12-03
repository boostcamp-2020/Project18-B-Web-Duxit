import CardObject from '@engine/CardObject';
import GameObject from '@engine/GameObject';
import TIME from '@utils/time';
import NUM from './number';
import CARD_POSITION from './cardPosition.json';

const imagePath = (id) => `http://duxit.ga/assets/cards/${id}.png`;

// eslint-disable-next-line import/prefer-default-export
export const createCards = (sceneName, cardIds = Array(6).fill(null)) => {
  const cardPosition = CARD_POSITION[sceneName];
  const emptyObject = new GameObject();
  emptyObject.createElement();
  emptyObject.addClass('teller-cards-wrapper');
  const cards = cardIds.map((cardID, index) => {
    const card = new CardObject({
      imagePath: cardID ? imagePath(cardID) : undefined,
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
