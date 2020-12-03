import './guesserWaiting.scss';
import GameObject from '@engine/GameObject';
import CardObject from '@engine/CardObject';
import TextObject from '@engine/TextObject';
import ProgressBarObject from '@engine/ProgressBarObject';
import DuckObject from '@engine/DuckObject';
import TEXT from '@utils/text';
import TIME from '@utils/time';
import { DUCK_TYPE } from '@utils/type';

const xPoint = [37.5, 42.5, 47.5, 52.5, 57.5, 62.5];
const yPoint = [20, 17, 15, 15, 17, 20];
const angle = [-25, -15, -5, 5, 15, 25];
let count = 0;
const createCards = () => {
  const emptyObject = new GameObject();
  emptyObject.createElement();
  emptyObject.addClass('teller-cards-wrapper');
  const cards = Array.from({ length: 6 }, () => {
    const card = new CardObject();
    card.addClass('teller-duck-card');
    card.move(50, 0, 0);
    card.rotate(angle[count], 0);
    card.move(xPoint[count], yPoint[count], 1);
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
  NotifyingTellerText.move(50, 70, 1);

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
  TellerDuck.move(50, 10, 1);
  const { CardsWrapper, cards } = createCards();
  CardsWrapper.attachToRoot();

  const removeArray = [NotifyingTellerText, ProgressBar, TellerDuck];

  return {
    removeArray,
  };
};

export default renderGuesserWaiting;
