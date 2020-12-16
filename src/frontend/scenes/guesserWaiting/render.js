import './style.scss';
import TextObject from '@engine/TextObject';
import DuckObject from '@engine/DuckObject';
import PlayerManager from '@utils/PlayerManager';
import SceneManager from '@utils/SceneManager';
import TEXT from '@utils/text';
import { createCards } from '@utils/card';
import { GUESSER_WAITING } from '@type/scene';
import TIME from '@type/time';

const renderGuesserWaiting = ({ endTime }) => {
  const NotifyingTellerText = new TextObject();
  NotifyingTellerText.addClass(['notify-teller', 'other']);
  NotifyingTellerText.attachToRoot();
  NotifyingTellerText.setContent(TEXT.WAIT_TELLER_SELECT);
  NotifyingTellerText.move(50, 100, 0);
  NotifyingTellerText.move(50, 70, TIME.ONE_SECOND);

  const { ProgressBar } = SceneManager.sharedComponents;
  ProgressBar.setTime(endTime);
  ProgressBar.start();

  PlayerManager.getPlayers().forEach((player) =>
    player.duck.setVisibility(!player.isTeller, player.isCurrentPlayer),
  );

  const tellerColor = PlayerManager.getTeller().color;
  const TellerDuck = new DuckObject({ color: tellerColor, width: 200 });
  TellerDuck.addClass('teller-duck-wrapper');
  TellerDuck.attachToRoot();
  TellerDuck.move(50, 0, 0);
  TellerDuck.setHat(true);
  TellerDuck.move(50, 10, TIME.ONE_SECOND);

  const { CardsWrapper, cards } = createCards(GUESSER_WAITING);
  CardsWrapper.attachToRoot();
  cards.forEach((card) => {
    card.setAnimateMove(false);
  });

  const arrayToBeRemoved = [
    NotifyingTellerText,
    TellerDuck,
    CardsWrapper,
    ...cards,
  ];

  return {
    arrayToBeRemoved,
    cards,
  };
};

export default renderGuesserWaiting;
