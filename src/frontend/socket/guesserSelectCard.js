import socket from '@utils/socket';
import CardManager from '@utils/CardManager';
import SceneManager from '@utils/SceneManager';
import PlayerManager from '@utils/PlayerManager';
import PlayerWaiting from '@scenes/playerWaiting';
import GuesserSelectCard from '@scenes/guesserSelectCard';

const setupGuesserSelectCard = () => {
  const onGuesserSelectCard = ({ cardID }) => {
    if (!SceneManager.isCurrentScene(GuesserSelectCard)) return;
    const currentPlayer = PlayerManager.getCurrentPlayer();
    CardManager.selectCard(cardID);
    SceneManager.addBeforeSubmittingPlayers(currentPlayer.socketID);
    SceneManager.renderNextScene(new PlayerWaiting());
  };

  const onOtherGuesserSelectCard = ({ playerID }) => {
    if (!SceneManager.isCurrentScene(GuesserSelectCard)) return;
    SceneManager.addBeforeSubmittingPlayers(playerID);
  };

  socket.on('guesser select card', onGuesserSelectCard);
  socket.on('other guesser decision', onOtherGuesserSelectCard);
};

export default setupGuesserSelectCard;
