import socket from '@utils/socket';
import SceneManager from '@utils/SceneManager';

const setupDiscussion = ({ SkipText }) => {
  const onAllSkip = () => {
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
  };

  const onEndDiscussion = () => {
    // 이 부분에 vote로 넘어가는 부분 추가하면 됩니다.
    SceneManager.renderNextScene();
  };
  socket.on('all skip', onAllSkip);
  socket.on('end discussion', onEndDiscussion);
};

export default setupDiscussion;
