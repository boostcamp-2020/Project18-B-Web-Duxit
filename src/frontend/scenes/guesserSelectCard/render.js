import TextObject from '@engine/TextObject';
import CardManager from '@utils/CardManager';
import SceneManager from '@utils/SceneManager';
import { createCards } from '@utils/card';
import { onClickCard } from '@utils/modal';
import { SELECT_CARD, GUESSER_SELECT_CARD } from '@type/scene';
import { sendGuesserdecision } from './events';

const renderGuesserSelect = ({ endTime }) => {
  const { topic, myCards } = CardManager;

  const TopicText = new TextObject();
  TopicText.addClass('topic-text');
  TopicText.attachToRoot();
  TopicText.setContent(topic);

  const { ProgressBar } = SceneManager.sharedComponents;
  ProgressBar.setTime(endTime);
  ProgressBar.start();

  const { CardsWrapper, cards } = createCards(SELECT_CARD, myCards);
  CardsWrapper.attachToRoot();
  cards.forEach((card) => {
    card.addClass('card-glow-gold-hover');
    card.animateFlip(3000, true);
    card.setAnimateMove();
    card.addClickHandler(() =>
      onClickCard({
        textType: GUESSER_SELECT_CARD,
        cardID: card.cardID,
        topic,
        submitEvent: sendGuesserdecision,
        input: false,
      }),
    );
  });

  const arrayToBeRemoved = [CardsWrapper, ...cards];

  return {
    arrayToBeRemoved,
  };
};

export default renderGuesserSelect;
