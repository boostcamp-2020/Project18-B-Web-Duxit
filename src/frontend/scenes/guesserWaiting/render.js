import './guesserWaiting.scss';
import TextObject from '@engine/TextObject';
import ProgressBarObject from '@engine/ProgressBarObject';
import DuckTellerObject from '@engine/DuckTellerObject';
import TEXT from '@utils/text';
import TIME from '@type/time';
import { DUCK_TYPE } from '@type/duck';
import { createCards } from '@utils/card';
import { GUESSER_WAITING } from '@type/scene';

const renderGuesserWaiting = () => {
  const NotifyingTellerText = new TextObject();
  const tellerText = TEXT.WAIT_TELLER_SELECT;
  NotifyingTellerText.addClass('notify-teller');
  NotifyingTellerText.addClass('other');
  NotifyingTellerText.attachToRoot();
  NotifyingTellerText.setContent(tellerText);
  NotifyingTellerText.move(50, 100, 0);
  NotifyingTellerText.move(50, 70, TIME.ONE_SECOND);

  const ProgressBar = new ProgressBarObject();
  ProgressBar.createElement();
  ProgressBar.attachToRoot();
  ProgressBar.setTime(TIME.SELECT_CARD);
  ProgressBar.start();

  const TellerDuck = new DuckTellerObject();
  // TellerDuck.createElement();
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
