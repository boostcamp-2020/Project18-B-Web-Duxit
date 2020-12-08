import TIME from '@type/time';
import NUMBER from '@type/number';
import CardManager from '@utils/CardManager';
import CARD_POSITION from '@type/cardPosition.json';
import { MIX_CARD } from '@type/scene';

const cardCount = NUMBER[CardManager.submittedCards.length];
const position = CARD_POSITION[MIX_CARD];
const spreadXPosition = position.SPREAD_X[cardCount];

const stackCard = async (Cards) => {
  const promises = Cards.map(async (card) => {
    return card.roll(
      position.CENTER,
      position.STACK_Y,
      TIME.ONE_SECOND + TIME.HALF_SECOND,
      2,
      4,
    );
  });
  await Promise.all(promises);
};

const rotateCard = (Cards) => {
  Cards.forEach(async (element) => {
    element.rotate(NUMBER.ZERO, NUMBER.ZERO);
  });
};

const shuffleCard = async (card, zindex = NUMBER.MAX_Z_INDEX) => {
  await card.move(position.CENTER, position.CENTER);
  card.setDepth(zindex);
  await card.move(position.CENTER, position.STACK_Y);
  card.setDepth(null);
};

const renderMixCard = () => {
  const Cards = CardManager.submittedCards;
  const arrayToBeRemoved = [];
  return {
    arrayToBeRemoved,
  };
};

export default renderMixCard;
