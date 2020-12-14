import TIME from '@type/time';
import NUMBER from '@type/number';
import CardManager from '@utils/CardManager';
import CARD_POSITION from '@type/cardPosition.json';
import { MIX_CARD } from '@type/scene';
import socket from '@utils/socket';

const stackCards = async ({ Cards, position }) => {
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

const rotateCards = ({ Cards }) => {
  Cards.forEach((card) => {
    card.rotate(NUMBER.ZERO, NUMBER.ZERO);
  });
};

const shuffleCard = async ({ card, position, zindex = NUMBER.MAX_Z_INDEX }) => {
  await card.move(position.CENTER, position.CENTER);
  card.setDepth(zindex);
  await card.move(position.CENTER, position.STACK_Y);
  card.setDepth(null);
};

const shuffleCards = async ({ Cards, position }) => {
  for (const card of Cards) {
    await shuffleCard({ card, position });
  }
};

const spreadCards = async ({ Cards, position, spreadXPosition }) => {
  const promises = Cards.map(async (card, count) => {
    return card.move(
      spreadXPosition[count],
      position.SPREAD_Y,
      TIME.ONE_SECOND,
    );
  });
  await Promise.all(promises);
};

const flipCards = async (Cards) => {
  Cards.forEach((element) => {
    element.animateFlip();
  });
};

const mixCards = async (Cards) => {
  const cardCount = NUMBER[Cards.length];
  const position = CARD_POSITION[MIX_CARD];
  const spreadXPosition = position.SPREAD_X[cardCount];
  await stackCards({ Cards, position });
  rotateCards({ Cards });
  await shuffleCards({ Cards, position });
  await spreadCards({ Cards, position, spreadXPosition });
  await flipCards(Cards);
  socket.emit('mix card end');
};

const renderMixCard = () => {
  const Cards = CardManager.submittedCards;
  mixCards(Cards);

  return {
    arrayToBeRemoved: [],
  };
};

export default renderMixCard;
