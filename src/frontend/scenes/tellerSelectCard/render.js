import './tellerSelectCard.scss';
import TextObject from '@engine/TextObject';
import ProgressBarObject from '@engine/ProgressBarObject';
import TEXT from '@utils/text';
import TIME from '@utils/time';
import { TELLER_SELECT_CARD } from '@utils/scene';
import { createCards } from '@utils/card';
import CardManager from '@utils/CardManager';

const renderTellerSelect = () => {
  const NotifyingTellerText = new TextObject();
  const tellerText = TEXT.TELLER_SELECT;
  NotifyingTellerText.addClass('notify-teller');
  NotifyingTellerText.attachToRoot();
  NotifyingTellerText.setContent(tellerText);

  const ProgressBar = new ProgressBarObject();
  ProgressBar.createElement();
  ProgressBar.attachToRoot();
  ProgressBar.setTime(TIME.SELECT_CARD);
  ProgressBar.start();

  const { CardsWrapper, cards } = createCards(
    TELLER_SELECT_CARD,
    CardManager.myCards,
  );
  CardsWrapper.attachToRoot();
  cards.forEach((card) => card.animateFlip(3000, true));

  const arrayToBeRemoved = [NotifyingTellerText, ProgressBar];

  return {
    arrayToBeRemoved,
  };
};

export default renderTellerSelect;
