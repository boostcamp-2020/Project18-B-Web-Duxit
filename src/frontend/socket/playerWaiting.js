import socket from '@utils/socket';
import CardManager from '@utils/CardManager';
import PlayerManager from '@utils/PlayerManager';
import SceneManager from '@utils/SceneManager';
import MixCard from '@scenes/mixCard';
import { PLAYER_WAITING, MIX_CARD } from '@type/scene';

const setupPlayerWaiting = () => {
  const onOtherGuesserSelectCard = ({ playerID }) => {
    if (SceneManager.currentSceneType !== PLAYER_WAITING) return;
    CardManager.dropNewCard();
    const guesserDuck = PlayerManager.get(playerID).duck;
    guesserDuck.setVisibility(true);
  };

  const onGetAllDecisions = ({ cards }) => {
    if (SceneManager.currentSceneType !== PLAYER_WAITING) return;
    CardManager.updateCardInformation(cards);
    SceneManager.renderNextScene(new MixCard());
    SceneManager.updateCurrentSceneType(MIX_CARD);
  };

  socket.on('other guesser decision', onOtherGuesserSelectCard);
  socket.on('get all decisions', onGetAllDecisions);
};

export default setupPlayerWaiting;
