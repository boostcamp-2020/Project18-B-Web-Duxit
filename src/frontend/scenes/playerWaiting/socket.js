import socket from '@utils/socket';
import CardManager from '@utils/CardManager';
import PlayerManager from '@utils/PlayerManager';
import SceneManager from '@utils/SceneManager';
import MixCard from '../mixCard';

const setupPlayerWaiting = () => {
  const onOtherGuesserSelectCard = ({ playerID }) => {
    CardManager.dropNewCard();
    const guesserDuck = PlayerManager.get(playerID).duck;
    guesserDuck.setVisibility(true);
  };

  const onGetAllDecisions = ({ cards }) => {
    CardManager.updateCardInformation(cards);
    SceneManager.renderNextScene(new MixCard());
  };

  socket.on('other guesser decision', onOtherGuesserSelectCard);
  socket.on('get all decisions', onGetAllDecisions);
};

export default setupPlayerWaiting;
