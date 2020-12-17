import socket from '@utils/socket';
import PlayerManager from '@utils/PlayerManager';
import SceneManager from '@utils/SceneManager';
import CardManager from '@utils/CardManager';
import Scoreboard from '@scenes/scoreboard';
import EndGame from '@scenes/endGame';
import TellerSelectCard from '@scenes/tellerSelectCard';
import GuesserWaiting from '@scenes/guesserWaiting';

const onGameOver = (...args) => {
  if (!SceneManager.isCurrentScene(Scoreboard)) return;
  SceneManager.renderNextScene(new EndGame(...args));
};

const onTellerSelect = ({ tellerID, cards, endTime }) => {
  if (!SceneManager.isCurrentScene(Scoreboard)) return;
  PlayerManager.setTellerID(tellerID);
  CardManager.initializeMyCards(cards);
  SceneManager.initializeSubmiitingPlayers();
  const { bTeller } = PlayerManager.getCurrentPlayer();
  const nextScene = bTeller
    ? new TellerSelectCard({ cards, endTime })
    : new GuesserWaiting({ endTime });
  SceneManager.renderNextScene(nextScene);
};

const setupScoreboardSocket = () => {
  socket.on('game end', onGameOver);
  socket.on('get round data', onTellerSelect);
};

export default setupScoreboardSocket;
