import './guesserWaiting.scss';
import GameObject from '@engine/GameObject';
import CardObject from '@engine/CardObject';
import TextObject from '@engine/TextObject';
import ProgressBarObject from '@engine/ProgressBarObject';
import DuckObject from '@engine/DuckObject';
import TEXT from '@utils/text';
import TIME from '@utils/time';
import NUM from '@utils/number';
import { DUCK_TYPE } from '@utils/type';
import cardPosition from './cardPosition.json';

let count = 0;
const createCards = () => {
  const emptyObject = new GameObject();
  emptyObject.createElement();
  emptyObject.addClass('teller-cards-wrapper');
  const cards = Array.from({ length: NUM.CARD }, () => {
    const card = new CardObject();
    card.addClass('teller-duck-card');
    card.move(50, 0, 0);
    card.rotate(cardPosition.angle[count], 0);
    card.move(cardPosition.x[count], cardPosition.y[count], TIME.ONE_SECOND);
    count += 1;
    emptyObject.appendChild(card);
    return card;
  });
  return { CardsWrapper: emptyObject, cards };
};

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
  const TellerDuck = new DuckObject({ type: DUCK_TYPE.TELLER });
  // TODO : setColor 텔러에 맞는 색깔로 하면 될까?
  TellerDuck.createElement();
  TellerDuck.attachToRoot();
  TellerDuck.move(50, 0, 0);
  TellerDuck.move(50, 10, TIME.ONE_SECOND);
  const { CardsWrapper, cards } = createCards();
  CardsWrapper.attachToRoot();

  const arrayToBeRemoved = [NotifyingTellerText, ProgressBar, TellerDuck];

  return {
    arrayToBeRemoved,
  };
};

export default renderGuesserWaiting;
