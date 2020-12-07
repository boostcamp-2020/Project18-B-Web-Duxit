import socket from '@utils/socket';
import SceneManager from '@utils/SceneManager';
import PlayerWaiting from '../playerWaiting';

const setupTellerSelectSocket = () => {
  const onTellerSelectCard = () => {
    SceneManager.renderNextScene(new PlayerWaiting());
  };

  socket.on('teller select card', onTellerSelectCard);
};

export default setupTellerSelectSocket;
