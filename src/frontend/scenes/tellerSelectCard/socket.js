import socket from '@utils/socket';
import SceneManager from '@utils/SceneManager';
import CardManager from '@utils/CardManager';
import PlayerWaiting from '../playerWaiting';

const setupTellerSelectSocket = () => {
  const onTellerSelectCard = ({ topic }) => {
    CardManager.updateTopic(topic);
    CardManager.addSubmittedCardCount();
    SceneManager.renderNextScene(new PlayerWaiting());
  };

  socket.on('teller select card', onTellerSelectCard);
};

export default setupTellerSelectSocket;
