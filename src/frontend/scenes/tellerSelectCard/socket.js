import socket from '@utils/socket';
import SceneManager from '@utils/SceneManager';
import CardManager from '@utils/CardManager';
import PlayerWaiting from '../playerWaiting';

const setupTellerSelectSocket = () => {
  const onTellerSelectCard = ({ cardID, topic, endTime }) => {
    CardManager.updateTopic(topic);
    CardManager.addSubmittedCardCount();
    CardManager.selectCard(cardID);
    SceneManager.renderNextScene(new PlayerWaiting({ endTime }));
  };

  socket.on('teller select card', onTellerSelectCard);
};

export default setupTellerSelectSocket;
