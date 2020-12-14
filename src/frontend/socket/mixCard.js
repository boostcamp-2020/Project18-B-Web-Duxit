import socket from '@utils/socket';
import SceneManager from '@utils/SceneManager';
import Discussion from '@scenes/discussion';
import MixCard from '@scenes/mixCard';

const setupMixCard = () => {
  const onStartDiscussion = ({ endTime }) => {
    if (!SceneManager.isCurrentScene(MixCard)) return;
    SceneManager.renderNextScene(new Discussion({ endTime }));
  };

  socket.on('start discussion', onStartDiscussion);
};

export default setupMixCard;
