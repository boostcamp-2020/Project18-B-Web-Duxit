import socket from '@utils/socket';
import CardManager from '@utils/CardManager';
import SceneManager from '@utils/SceneManager';
import PlayerWaiting from '../playerWaiting';

const setupGuesserSelectCard = ({ ProgressBar }) => {
  const onGuesserSelectCard = ({ cardID }) => {
    CardManager.addSubmittedCardCount();
    SceneManager.renderNextScene(new PlayerWaiting({ ProgressBar }));
  };

  const onOtherGuesserSelectCard = ({ playerID }) => {
    CardManager.addSubmittedCardCount();
  };

  socket.on('guesser select card', onGuesserSelectCard);
  socket.on('other guesser decision', onOtherGuesserSelectCard);
};

export default setupGuesserSelectCard;
