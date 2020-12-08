import socket from '@utils/socket';
import SceneManager from '@utils/SceneManager';
import CardManager from '@utils/CardManager';
import PlayerWaiting from '../playerWaiting';

const setupTellerSelectSocket = () => {
  const onTellerSelectCard = ({ topic }) => {
    console.log(topic);
    SceneManager.renderNextScene(new PlayerWaiting());
    CardManager.updateTopic(topic);
  };

  socket.on('teller select card', onTellerSelectCard);
};

export default setupTellerSelectSocket;
