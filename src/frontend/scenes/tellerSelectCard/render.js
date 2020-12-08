import './tellerSelectCard.scss';
import TextObject from '@engine/TextObject';
import ProgressBarObject from '@engine/ProgressBarObject';
import TEXT from '@utils/text';
import TIME from '@type/time';
import { SELECT_CARD, TELLER_SELECT_CARD } from '@type/scene';
import { createCards } from '@utils/card';
import CardManager from '@utils/CardManager';
import onClickCard from '@utils/modal';
import { sendTellerdecision } from './events';

const renderTellerSelect = () => {
  const NotifyingTellerText = new TextObject();
  const tellerText = TEXT.TELLER_SELECT_CARD.NOTIFY;
  NotifyingTellerText.addClass('notify-teller');
  NotifyingTellerText.attachToRoot();
  NotifyingTellerText.setContent(tellerText);

  const ProgressBar = new ProgressBarObject();
  ProgressBar.createElement();
  ProgressBar.attachToRoot();
  ProgressBar.setTime(TIME.SELECT_CARD);
  ProgressBar.start();

  const { CardsWrapper, cards } = createCards(SELECT_CARD, CardManager.myCards);
  CardsWrapper.attachToRoot();
  cards.forEach((card) => {
    card.addClass('card-glow-gold-hover');
    card.animateFlip(3000, true);
    card.setAnimateMove();
    card.addClickHandler(() =>
      onClickCard({
        textType: TELLER_SELECT_CARD,
        cardID: card.cardID,
        submitEvent: sendTellerdecision,
        input: true,
      }),
    );
  });

  const arrayToBeRemoved = [
    NotifyingTellerText,
    ProgressBar,
    CardsWrapper,
    ...cards,
  ];

  return {
    arrayToBeRemoved,
  };
};

export default renderTellerSelect;
