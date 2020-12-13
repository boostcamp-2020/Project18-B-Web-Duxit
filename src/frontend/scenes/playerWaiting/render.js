import TextObject from '@engine/TextObject';
import PlayerManager from '@utils/PlayerManager';
import SceneManager from '@utils/SceneManager';
import TEXT from '@utils/text';

const renderPlayerWaiting = ({ endTime }) => {
  const isTeller = PlayerManager.isTeller();
  const tellerDuck = PlayerManager.getTeller().duck;
  tellerDuck.setVisibility(true, isTeller);

  if (isTeller) {
    const { ProgressBar } = SceneManager.sharedComponents;
    ProgressBar.setTime(endTime);
    ProgressBar.start();
  }

  const HelpText = new TextObject();
  HelpText.addClass('player-waiting-helper-text');
  HelpText.setContent(TEXT.WAIT_PLAYER_SELECT);
  HelpText.attachToRoot();

  const arrayToBeRemoved = [HelpText];

  return {
    arrayToBeRemoved,
  };
};

export default renderPlayerWaiting;
