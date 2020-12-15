import './vote.scss';
import TextObject from '@engine/TextObject';
import SceneManager from '@utils/SceneManager';
import CardManager from '@utils/CardManager';
import TEXT from '@utils/text';
import DuckObject from '@engine/DuckObject';
import PlayerManager from '@utils/PlayerManager';
import { sendVoteResult } from './events';

const renderDiscussion = ({ endTime }) => {
  const { ProgressBar } = SceneManager.sharedComponents;
  const cards = CardManager.submittedCards;

  const { color } = PlayerManager.getCurrentPlayer();
  const DuckStamp = new DuckObject({ width: 30, color });
  DuckStamp.render();
  DuckStamp.instance.style.borderColor = color;
  DuckStamp.setOriginCenter();
  DuckStamp.addClass(['hide', 'movable', 'duck-stamp']);
  DuckStamp.attachToRoot();

  if (!PlayerManager.isTeller()) {
    cards.forEach((card) => {
      card.addClass(['card-glow-gold-hover', 'hover-larger']);
      card.addClickHandler((event) =>
        sendVoteResult({ cardID: card.cardID, DuckStamp, event }),
      );
    });
  }

  ProgressBar.setTime(endTime);
  ProgressBar.start();

  const HelpText = new TextObject();
  HelpText.addClass('helper-text');
  HelpText.setContent(TEXT.VOTE.TITLE);
  HelpText.attachToRoot();

  const arrayToBeRemoved = [DuckStamp];

  return {
    arrayToBeRemoved,
  };
};

export default renderDiscussion;
