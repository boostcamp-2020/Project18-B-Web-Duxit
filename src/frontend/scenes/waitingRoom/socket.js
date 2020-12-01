import socket from '@utils/socket';
import SceneManager from '../../utils/SceneManager';
import SomeNextScene from '../someNextScene';

const setupWaitingRoomSocket = ({ AllReadyText }) => {
  const onAllReady = () => {
    AllReadyText.removeClass('hide');
    AllReadyText.instance.animate(
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

  const onGameStart = () => {
    SceneManager.renderNextScene(new SomeNextScene());
  };

  const onGameStartAborted = () => {
    AllReadyText.addClass('hide');
    // TODO: 게임 시작 취소됐다는 메시지 띄워줘야됨~~
  };

  socket.on('all ready', onAllReady);
  socket.on('game start', onGameStart);
  socket.on('game start aborted', onGameStartAborted);
};

export default setupWaitingRoomSocket;
