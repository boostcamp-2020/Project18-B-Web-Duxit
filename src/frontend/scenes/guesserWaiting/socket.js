import socket from '@utils/socket';
import SceneManager from '@utils/SceneManager';
import CardManager from '@utils/CardManager';
import GuesserSelectCard from '../guesserSelectCard';

const setupGuesserWaiting = () => {
  const onTellerSelectCard = ({ topic, endTime }) => {
    CardManager.updateTopic(topic);
    CardManager.addSubmittedCardCount();
    SceneManager.renderNextScene(new GuesserSelectCard({ endTime }));
  };

  const onTellerPicking = ({ cardPosition }) => {
    const GuesserWaitingScene = SceneManager.currentScene;
    const { cards } = GuesserWaitingScene;
    cards.forEach((card) => card.hoverMoveDownCallback());
    cards[cardPosition].hoverMoveUpCallback();
  };

  socket.on('teller decision', onTellerSelectCard);
  socket.on('get teller picking', onTellerPicking);
};

export default setupGuesserWaiting;
