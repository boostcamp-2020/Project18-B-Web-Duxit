import socket from '@utils/socket';
import CardManager from '@utils/CardManager';
import PlayerManager from '@utils/PlayerManager';
import SceneManager from '@utils/SceneManager';
import MixCard from '@scenes/mixCard';
import PlayerWaiting from '@scenes/playerWaiting';

const setupPlayerWaiting = () => {
  const onOtherGuesserSelectCard = ({ playerID }) => {
    if (!SceneManager.isCurrentScene(PlayerWaiting)) return;
    CardManager.dropNewCard();
    const guesserDuck = PlayerManager.get(playerID).duck;
    guesserDuck.setVisibility(true);
  };

  const onGetAllDecisions = ({ cards, endTime }) => {
    if (!SceneManager.isCurrentScene(PlayerWaiting)) return;
    CardManager.updateCardInformation(cards);
    SceneManager.renderNextScene(new MixCard(endTime));
  };

  socket.on('other guesser decision', onOtherGuesserSelectCard);
  socket.on('get all decisions', onGetAllDecisions);
};

export default setupPlayerWaiting;
