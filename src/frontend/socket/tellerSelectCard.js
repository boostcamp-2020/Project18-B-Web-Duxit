import socket from '@utils/socket';
import SceneManager from '@utils/SceneManager';
import CardManager from '@utils/CardManager';
import { TELLER_SELECT_CARD, PLAYER_WAITING } from '@type/scene';
import PlayerWaiting from '@scenes/playerWaiting';

const setupTellerSelectSocket = () => {
  const onTellerSelectCard = ({ cardID, topic, endTime }) => {
    if (SceneManager.currentSceneType !== TELLER_SELECT_CARD) return;
    CardManager.updateTopic(topic);
    CardManager.addSubmittedCardCount();
    CardManager.selectCard(cardID);
    SceneManager.renderNextScene(new PlayerWaiting({ endTime }));
    SceneManager.updateCurrentSceneType(PLAYER_WAITING);
  };

  socket.on('teller select card', onTellerSelectCard);
};

export default setupTellerSelectSocket;
