import './tellerSelectCard.scss';
import TextObject from '@engine/TextObject';
import TEXT from '@utils/text';
import { SELECT_CARD, TELLER_SELECT_CARD } from '@type/scene';
import { createCards } from '@utils/card';
import CardManager from '@utils/CardManager';
import { onClickCard } from '@utils/modal';
import SceneManager from '@utils/SceneManager';
import { sendTellerdecision } from './events';

const renderTellerSelect = ({ endTime }) => {
  const NotifyingTellerText = new TextObject();
  const tellerText = TEXT.TELLER_SELECT_CARD.NOTIFY;
  NotifyingTellerText.addClass('notify-teller');
  NotifyingTellerText.attachToRoot();
  NotifyingTellerText.setContent(tellerText);

  const { ProgressBar } = SceneManager.sharedComponents;
  ProgressBar.setTime(endTime);
  ProgressBar.start();

  const { CardsWrapper, cards } = createCards(SELECT_CARD, CardManager.myCards);
  CardsWrapper.attachToRoot();
  cards.forEach((card) => {
    card.setTellerCard(true);
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

  const arrayToBeRemoved = [NotifyingTellerText, CardsWrapper, ...cards];

  return {
    arrayToBeRemoved,
  };
};

export default renderTellerSelect;
