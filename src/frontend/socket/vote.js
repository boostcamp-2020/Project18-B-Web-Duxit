import socket from '@utils/socket';
import SceneManager from '@utils/SceneManager';
import VoteResult from '@scenes/voteResult';
import PlayerManager from '../utils/PlayerManager';

const setupVote = () => {
  const onEndVote = ({ players }) => {
    players.forEach((playerInfo) => {
      const { socketID } = playerInfo;
      const player = PlayerManager.get(socketID);
      player.updateScore(playerInfo);
      player.updateCard(playerInfo);
    });
    SceneManager.renderNextScene(new VoteResult());
  };

  socket.on('end vote', onEndVote);
};

export default setupVote;
