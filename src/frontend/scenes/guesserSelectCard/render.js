import TextObject from '@engine/TextObject';
import ProgressBarObject from '@engine/ProgressBarObject';
import CardManager from '@utils/CardManager';
import TIME from '@type/time';
import { SELECT_CARD, GUESSER_SELECT_CARD } from '@type/scene';
import { createCards } from '@utils/card';
import { sendGuesserdecision } from './events';
import onClickCard from '@utils/modal';

const renderGuesserSelect = () => {
  const { topic, myCards } = CardManager;

  const TopicText = new TextObject();
  TopicText.addClass('topic-text');
  TopicText.attachToRoot();
  TopicText.setContent(topic);

  const ProgressBar = new ProgressBarObject();
  ProgressBar.createElement();
  ProgressBar.attachToRoot();
  ProgressBar.setTime(TIME.SELECT_CARD);
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

  const arrayToBeRemoved = [TopicText, CardsWrapper, ...cards];

  return {
    arrayToBeRemoved,
    ProgressBar,
  };
};

export default renderGuesserSelect;
