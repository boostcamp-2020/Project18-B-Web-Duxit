import socket from '@utils/socket';
import SceneManager from '@utils/SceneManager';
import Scoreboard from '@scenes/scoreboard';
import EndGame from '@scenes/endGame';

const onGameOver = (...args) => {
  if (!SceneManager.isCurrentScene(Scoreboard)) return;
  SceneManager.renderNextScene(new EndGame(...args));
};

const setupEndGameSocket = () => {
  socket.on('game over', onGameOver);
};

export default setupEndGameSocket;
