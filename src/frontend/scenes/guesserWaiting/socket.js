import socket from '@utils/socket';
import SceneManager from '@utils/SceneManager';
import CardManager from '@utils/CardManager';
import GuesserSelectCard from '../guesserSelectCard';

const setupGuesserWaiting = () => {
  const onTellerSelectCard = ({ topic }) => {
    CardManager.updateTopic(topic);
    CardManager.addSubmittedCardCount();
    SceneManager.renderNextScene(new GuesserSelectCard());
  };

  socket.on('teller decision', onTellerSelectCard);
};

export default setupGuesserWaiting;
