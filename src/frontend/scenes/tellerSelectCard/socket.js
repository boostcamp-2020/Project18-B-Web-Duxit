import socket from '@utils/socket';
import SceneManager from '@utils/SceneManager';

const setupTellerSelectSocket = () => {
  const onTellerSelectCard = ({ cardID, topic }) => {
    console.log(topic);
  };

  socket.on('teller select card', onTellerSelectCard);
};

export default setupTellerSelectSocket;
