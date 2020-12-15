import socket from '@utils/socket';
import CardManager from '@utils/CardManager';
import SceneManager from '@utils/SceneManager';
import PlayerManager from '@utils/PlayerManager';
import PlayerWaiting from '@scenes/playerWaiting';
import GuesserSelectCard from '@scenes/guesserSelectCard';

const setupGuesserSelectCard = () => {
  const onGuesserSelectCard = ({ cardID }) => {
    if (!SceneManager.isCurrentScene(GuesserSelectCard)) return;
    CardManager.addSubmittedCardCount();
    CardManager.selectCard(cardID);
    SceneManager.renderNextScene(new PlayerWaiting());

    const myDuck = PlayerManager.getCurrentPlayer().duck;
    myDuck.setVisibility(true, true);
  };

  const onOtherGuesserSelectCard = () => {
    if (!SceneManager.isCurrentScene(GuesserSelectCard)) return;
    CardManager.addSubmittedCardCount();
  };

  socket.on('guesser select card', onGuesserSelectCard);
  socket.on('other guesser decision', onOtherGuesserSelectCard);
};

export default setupGuesserSelectCard;
