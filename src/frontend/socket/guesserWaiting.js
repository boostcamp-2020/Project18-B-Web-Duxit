import socket from '@utils/socket';
import SceneManager from '@utils/SceneManager';
import CardManager from '@utils/CardManager';
import GuesserSelectCard from '@scenes/guesserSelectCard';
import GuesserWaiting from '@scenes/guesserWaiting';
import PlayerManager from '@utils/PlayerManager';

const setupGuesserWaiting = () => {
  const onTellerSelectCard = ({ topic, endTime }) => {
    if (!SceneManager.isCurrentScene(GuesserWaiting)) return;
    CardManager.updateTopic(topic);
    SceneManager.addBeforeSubmittingPlayers(PlayerManager.tellerID);
    SceneManager.renderNextScene(new GuesserSelectCard({ endTime }));
  };

  const onTellerPicking = ({ cardPosition }) => {
    if (!SceneManager.isCurrentScene(GuesserWaiting)) return;
    const GuesserWaitingScene = SceneManager.currentScene;
    const { cards } = GuesserWaitingScene;
    cards.forEach((card) => card.hoverMoveDownCallback());
    cards[cardPosition].hoverMoveUpCallback();
  };

  socket.on('teller decision', onTellerSelectCard);
  socket.on('get teller picking', onTellerPicking);
};

export default setupGuesserWaiting;
