import socket from '@utils/socket';
import SceneManager from '@utils/SceneManager';
import Discussion from '@scenes/discussion';

const setupMixCard = () => {
  const onStartDiscussion = ({ endTime }) => {
    SceneManager.renderNextScene(new Discussion({ endTime }));
  };
  socket.on('start discussion', onStartDiscussion);
};

export default setupMixCard;
