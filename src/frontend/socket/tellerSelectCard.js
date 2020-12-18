import socket from '@utils/socket';
import SceneManager from '@utils/SceneManager';
import CardManager from '@utils/CardManager';
import PlayerWaiting from '@scenes/playerWaiting';
import TellerSelectCard from '@scenes/tellerSelectCard';
import PlayerManager from '@utils/PlayerManager';

const setupTellerSelectSocket = () => {
  const onTellerSelectCard = ({ cardID, topic, endTime }) => {
    if (!SceneManager.isCurrentScene(TellerSelectCard)) return;
    CardManager.updateTopic(topic);
    CardManager.selectCard(cardID);
    SceneManager.addBeforeSubmittingPlayers(PlayerManager.tellerID);
    SceneManager.renderNextScene(new PlayerWaiting(endTime));
  };

  socket.on('teller select card', onTellerSelectCard);
};

export default setupTellerSelectSocket;
