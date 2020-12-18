import socket from '@utils/socket';
import SceneManager from '@utils/SceneManager';
import Scoreboard from '@scenes/scoreboard';

const setupVoteResult = () => {
  const onEndVoteResult = ({ round }) => {
    SceneManager.renderNextScene(new Scoreboard({ round }));
  };

  socket.on('end vote result', onEndVoteResult);
};

export default setupVoteResult;
