import socket from '@utils/socket';
import CardManager from '@utils/CardManager';

const setupPlayerWaiting = () => {
  const onOtherGuesserSelectCard = () => {
    CardManager.dropNewCard();
  };

  socket.on('other guesser decision', onOtherGuesserSelectCard);
};

export default setupPlayerWaiting;
