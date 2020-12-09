import socket from '@utils/socket';
import CardManager from '@utils/CardManager';
import SceneManager from '@utils/SceneManager';
import MixCard from '../mixCard';

const setupPlayerWaiting = () => {
  const onOtherGuesserSelectCard = () => {
    CardManager.dropNewCard();
  };

  const onGetAllDecisions = ({ cards }) => {
    CardManager.updateCardInformation(cards);
    SceneManager.renderNextScene(new MixCard());
  };

  socket.on('other guesser decision', onOtherGuesserSelectCard);
  socket.on('get all decisions', onGetAllDecisions);
};

export default setupPlayerWaiting;
