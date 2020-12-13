import socket from '@utils/socket';
import SceneManager from '@utils/SceneManager';
import { DISCUSSION, VOTE } from '@type/scene';

const setupDiscussion = () => {
  const onAllSkip = () => {
    if (SceneManager.currentSceneType !== DISCUSSION) return;
    const { SkipText } = SceneManager.sharedComponents;
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
    if (SceneManager.currentSceneType !== DISCUSSION) return;
    // 이 부분에 vote로 넘어가는 부분 추가하면 됩니다.
    SceneManager.renderNextScene();
    SceneManager.updateCurrentSceneType(VOTE);
  };
  socket.on('all skip', onAllSkip);
  socket.on('end discussion', onEndDiscussion);
};

export default setupDiscussion;
