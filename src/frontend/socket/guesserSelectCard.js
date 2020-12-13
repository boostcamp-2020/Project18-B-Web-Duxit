import socket from '@utils/socket';
import CardManager from '@utils/CardManager';
import SceneManager from '@utils/SceneManager';
import PlayerManager from '@utils/PlayerManager';
import { PLAYER_WAITING, GUESSER_SELECT_CARD } from '@type/scene';
import PlayerWaiting from '@scenes/playerWaiting';

const setupGuesserSelectCard = () => {
  const onGuesserSelectCard = ({ cardID }) => {
    if (SceneManager.currentSceneType !== GUESSER_SELECT_CARD) return;
    CardManager.addSubmittedCardCount();
    CardManager.selectCard(cardID);
    // SceneManager.renderNextScene(new PlayerWaiting({ ProgressBar }));
    SceneManager.renderNextScene(new PlayerWaiting());
    SceneManager.updateCurrentSceneType(PLAYER_WAITING);

    const myDuck = PlayerManager.getCurrentPlayer().duck;
    myDuck.setVisibility(true, true);
  };

  const onOtherGuesserSelectCard = () => {
    if (SceneManager.currentSceneType !== GUESSER_SELECT_CARD) return;
    CardManager.addSubmittedCardCount();
  };

  socket.on('guesser select card', onGuesserSelectCard);
  socket.on('other guesser decision', onOtherGuesserSelectCard);
};

export default setupGuesserSelectCard;
