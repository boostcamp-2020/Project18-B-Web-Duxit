import './guesserWaiting.scss';
import TextObject from '@engine/TextObject';
import ProgressBarObject from '@engine/ProgressBarObject';
import DuckTellerObject from '@engine/DuckTellerObject';
import TEXT from '@utils/text';
import TIME from '@type/time';
import { createCards } from '@utils/card';
import { GUESSER_WAITING } from '@type/scene';

const renderGuesserWaiting = ({ endTime }) => {
  const NotifyingTellerText = new TextObject();
  NotifyingTellerText.addClass(['notify-teller', 'other']);
  NotifyingTellerText.attachToRoot();
  NotifyingTellerText.setContent(TEXT.WAIT_TELLER_SELECT);
  NotifyingTellerText.move(50, 100, 0);
  NotifyingTellerText.move(50, 70, TIME.ONE_SECOND);

  const ProgressBar = new ProgressBarObject();
  ProgressBar.createElement();
  ProgressBar.attachToRoot();
  ProgressBar.setTime(endTime);
  ProgressBar.start();

  const TellerDuck = new DuckTellerObject();
  TellerDuck.attachToRoot();
  TellerDuck.move(50, 0, 0);
  TellerDuck.move(50, 10, TIME.ONE_SECOND);

  const { CardsWrapper, cards } = createCards(GUESSER_WAITING);
  CardsWrapper.attachToRoot();

  const arrayToBeRemoved = [
    NotifyingTellerText,
    ProgressBar,
    TellerDuck,
    CardsWrapper,
    ...cards,
  ];

  return {
    arrayToBeRemoved,
  };
};

export default renderGuesserWaiting;
