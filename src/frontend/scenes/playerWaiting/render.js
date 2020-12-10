import ProgressBarObject from '@engine/ProgressBarObject';
import TextObject from '@engine/TextObject';
import TEXT from '@utils/text';
import PlayerManager from '@utils/PlayerManager';

const renderPlayerWaiting = ({ ProgressBar, endTime }) => {
  const newProgressBar = new ProgressBarObject();
  newProgressBar.createElement();

  if (PlayerManager.isTeller()) {
    newProgressBar.attachToRoot();
    newProgressBar.setTime(endTime);
    newProgressBar.start();
  }

  const HelpText = new TextObject();
  HelpText.addClass('player-waiting-helper-text');
  HelpText.setContent(TEXT.WAIT_PLAYER_SELECT);
  HelpText.attachToRoot();

  const arrayToBeRemoved = [HelpText, newProgressBar];
  if (ProgressBar) arrayToBeRemoved.push(ProgressBar);

  return {
    arrayToBeRemoved,
  };
};

export default renderPlayerWaiting;
