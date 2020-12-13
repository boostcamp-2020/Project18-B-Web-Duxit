import socket from '@utils/socket';
import SceneManager from '@utils/SceneManager';
import CardManager from '@utils/CardManager';
import { GUESSER_WAITING, GUESSER_SELECT_CARD } from '@type/scene';
import GuesserSelectCard from '../scenes/guesserSelectCard';

const setupGuesserWaiting = () => {
  const onTellerSelectCard = ({ topic, endTime }) => {
    if (SceneManager.currentSceneType !== GUESSER_WAITING) return;
    CardManager.updateTopic(topic);
    CardManager.addSubmittedCardCount();
    SceneManager.renderNextScene(new GuesserSelectCard({ endTime }));
    SceneManager.updateCurrentSceneType(GUESSER_SELECT_CARD);
  };

  const onTellerPicking = ({ cardPosition }) => {
    if (SceneManager.currentSceneType !== GUESSER_WAITING) return;
    const GuesserWaitingScene = SceneManager.currentScene;
    const { cards } = GuesserWaitingScene;
    cards.forEach((card) => card.hoverMoveDownCallback());
    cards[cardPosition].hoverMoveUpCallback();
  };

  socket.on('teller decision', onTellerSelectCard);
  socket.on('get teller picking', onTellerPicking);
};

export default setupGuesserWaiting;
