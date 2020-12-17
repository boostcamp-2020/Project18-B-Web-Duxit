import './style.scss';
import TextObject from '@engine/TextObject';
import PlayerManager from '@utils/PlayerManager';
import SceneManager from '@utils/SceneManager';
import TEXT from '@utils/text';
import { $qs } from '@utils/dom';

const renderPlayerWaiting = ({ endTime }) => {
  const bTeller = PlayerManager.isTeller();
  const currentPlayer = PlayerManager.getCurrentPlayer();

  SceneManager.beforeSubmittingPlayers.forEach((playerID) => {
    const bMyDuck = playerID === currentPlayer.socketID;
    const { duck } = PlayerManager.get(playerID);
    duck.setVisibility(true, bMyDuck);
  });

  const modal = $qs('.modal');
  if (modal) {
    modal.remove();
  }

  if (bTeller) {
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
