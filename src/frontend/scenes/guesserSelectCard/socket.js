import socket from '@utils/socket';
import SceneManager from '@utils/SceneManager';

const setupGuesserSelectCard = () => {
  const onTellerSelectCard = ({ topic }) => {
    // SceneManager.render(new GuesserSelectCard(topic));
  };

  socket.on('gues select card', onTellerSelectCard);
};

export default setupGuesserSelectCard;
