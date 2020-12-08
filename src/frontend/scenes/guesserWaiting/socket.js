import socket from '@utils/socket';
import SceneManager from '@utils/SceneManager';

const setupGuesserWaiting = () => {
  const onTellerSelectCard = ({ topic }) => {
    // SceneManager.render(new GuesserSelectCard(topic));
  };

  socket.on('teller select card', onTellerSelectCard);
};

export default setupGuesserWaiting;