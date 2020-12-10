import socket from '@utils/socket';
import CardManager from '@utils/CardManager';
import SceneManager from '@utils/SceneManager';
import PlayerWaiting from '../playerWaiting';
import PlayerManager from '../../utils/PlayerManager';

const setupGuesserSelectCard = ({ ProgressBar, scene }) => {
  const onGuesserSelectCard = ({ cardID }) => {
    CardManager.addSubmittedCardCount();
    CardManager.selectCard(cardID);
    SceneManager.renderNextScene(new PlayerWaiting({ ProgressBar }));

    const myDuck = PlayerManager.getCurrentPlayer().duck;
    myDuck.setVisibility(true, true);
  };

  const onOtherGuesserSelectCard = () => {
    if (SceneManager.currentScene === scene) {
      CardManager.addSubmittedCardCount();
    }
  };

  socket.on('guesser select card', onGuesserSelectCard);
  socket.on('other guesser decision', onOtherGuesserSelectCard);
};

export default setupGuesserSelectCard;
