import socket from '@utils/socket';
import PlayerManager from '@utils/PlayerManager';
import SceneManager from '@utils/SceneManager';
import PlayerWaiting from '../playerWaiting';

const setupGuesserSelectCard = ({ ProgressBar }) => {
  const onGuesserSelectCard = ({ playerID }) => {
    const { currentPlayerID } = PlayerManager;
    if (playerID === currentPlayerID) {
      SceneManager.renderNextScene(new PlayerWaiting({ ProgressBar }));
    }
  };

  socket.on('guesser select card', onGuesserSelectCard);
};

export default setupGuesserSelectCard;
