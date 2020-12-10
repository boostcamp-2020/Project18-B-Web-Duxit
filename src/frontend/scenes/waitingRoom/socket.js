import socket from '@utils/socket';
import PlayerManager from '@utils/PlayerManager';
import SceneManager from '@utils/SceneManager';
import CardManager from '@utils/CardManager';
import TellerSelectCard from '@scenes/tellerSelectCard';
import GuesserWaiting from '@scenes/guesserWaiting';

const setupWaitingRoomSocket = ({ AllReadyText }) => {
  const onEnterRoom = ({ nickname, players }) => {
    PlayerManager.initialize(players);
    PlayerManager.updateCurrentPlayer({ nickname });
  };

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

  const onGameStartAborted = () => {
    AllReadyText.addClass('hide');
    // TODO: 게임 시작 취소됐다는 메시지 띄워줘야됨~~
  };

  const onUpdatePlayer = ({ socketID, nickname, color }) => {
    PlayerManager.set({ socketID, nickname, color });
  };

  const onExitPlayer = ({ socketID }) => {
    PlayerManager.delete(socketID);
  };

  const onReadyPlayer = ({ playerID, isReady }) => {
    const player = PlayerManager.get(playerID);
    if (player) player.setReady(isReady);
  };

  const onGetRoundData = ({ tellerID, cards, endTime }) => {
    PlayerManager.setTellerID(tellerID);
    CardManager.initailizeMyCards(cards);
    const { isTeller } = PlayerManager.getCurrentPlayer();
    const nextScene = isTeller
      ? new TellerSelectCard({ cards, endTime })
      : new GuesserWaiting({ endTime });
    SceneManager.renderNextScene(nextScene);
  };

  socket.on('enter room', onEnterRoom);
  socket.on('update player', onUpdatePlayer);
  socket.on('exit player', onExitPlayer);
  socket.on('ready player', onReadyPlayer);
  socket.on('all ready', onAllReady);
  socket.on('game start aborted', onGameStartAborted);
  socket.on('get round data', onGetRoundData);
};

export default setupWaitingRoomSocket;
