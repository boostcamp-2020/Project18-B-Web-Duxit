import socket from '@utils/socket';
import SceneManager from '@utils/SceneManager';
import Discussion from '@scenes/discussion';
import Vote from '@scenes/vote';

const setupDiscussion = () => {
  const onEndDiscussion = ({ skipped, endTime }) => {
    if (!SceneManager.isCurrentScene(Discussion)) return;
    const { SkipText } = SceneManager.sharedComponents;
    if (skipped) {
      SkipText.removeClass('hide');
      SkipText.instance.animate(
        [
          { transform: 'translate(-50%, -150%)', opacity: 0 },
          { transform: 'translate(-50%, -50%)', opacity: 1 },
        ],
        {
          duration: 200,
          function: 'ease',
        },
      );
    }
    setTimeout(() => {
      SceneManager.renderNextScene(new Vote({ endTime }));
      SkipText.addClass('hide');
    }, 1500);
  };
  socket.on('end discussion', onEndDiscussion);
};

export default setupDiscussion;
