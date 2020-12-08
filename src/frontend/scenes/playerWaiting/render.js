import ProgressBarObject from '@engine/ProgressBarObject';
import TextObject from '@engine/TextObject';
import TIME from '@type/time';
import TEXT from '@utils/text';

const renderPlayerWaiting = () => {
  const ProgressBar = new ProgressBarObject();
  ProgressBar.createElement();
  ProgressBar.attachToRoot();
  ProgressBar.setTime(TIME.SELECT_CARD);
  ProgressBar.start();

  const HelpText = new TextObject();
  HelpText.addClass('player-waiting-helper-text');
  HelpText.setContent(TEXT.WAIT_PLAYER_SELECT);
  HelpText.attachToRoot();

  const arrayToBeRemoved = [ProgressBar];

  return {
    arrayToBeRemoved,
  };
};

export default renderPlayerWaiting;
