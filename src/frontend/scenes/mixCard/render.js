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

const shuffleCards = async (Cards, count) => {
  for (let i = 0; i < count; i += 1) {
    await shuffleCard(Cards[i]);
  }
};

const spreadCard = async (Cards) => {
  const promises = Cards.map(async (card, count) => {
    return card.move(
      spreadXPosition[count],
      position.SPREAD_Y,
      TIME.ONE_SECOND,
    );
  });
  await Promise.all(promises);
};

const flipCard = async (Cards) => {
  Cards.forEach((element) => {
    element.animateFlip();
  });
};

const mixCard = async (Cards) => {
  await stackCard(Cards);
  rotateCard(Cards);
  await shuffleCards(Cards, NUMBER.SHUFFLE_COUNT);
  await spreadCard(Cards);
  flipCard(Cards);
};

const setCardsImage = () => {
  // 이 함수 구현해서 아래 주석 쪽에 넣어주면 될 듯
};

const renderMixCard = () => {
  const Cards = CardManager.submittedCards;
  // Todo: 카드에 ID 및 Image 경로 할당하는 작업 해야 뒤집었을 때 그림 나옴
  mixCard(Cards);
  const arrayToBeRemoved = [];
  return {
    arrayToBeRemoved,
  };
};

export default renderMixCard;
