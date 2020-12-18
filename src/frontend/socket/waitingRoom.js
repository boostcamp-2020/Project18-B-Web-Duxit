import socket from '@utils/socket';
import PlayerManager from '@utils/PlayerManager';
import SceneManager from '@utils/SceneManager';
import CardManager from '@utils/CardManager';
import TellerSelectCard from '@scenes/tellerSelectCard';
import GuesserWaiting from '@scenes/guesserWaiting';
import WaitingRoom from '@scenes/waitingRoom';

const setupWaitingRoomSocket = () => {
  const onEnterRoom = ({ nickname, players }) => {
    // if (!SceneManager.isCurrentScene(WaitingRoom)) return;
    PlayerManager.initialize(players);
    PlayerManager.updateCurrentPlayer({ nickname });
  };

  const onAllReady = () => {
    if (!SceneManager.isCurrentScene(WaitingRoom)) return;
    const { AllReadyText } = SceneManager.sharedComponents;
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
    if (!SceneManager.isCurrentScene(WaitingRoom)) return;
    const { AllReadyText } = SceneManager.sharedComponents;
    AllReadyText.addClass('hide');
    // TODO: 게임 시작 취소됐다는 메시지 띄워줘야됨~~
  };

  const onUpdatePlayer = ({ socketID, nickname, color }) => {
    if (!SceneManager.isCurrentScene(WaitingRoom)) return;
    PlayerManager.set({ socketID, nickname, color });
  };

  const onExitPlayer = ({ socketID }) => {
    if (!SceneManager.isCurrentScene(WaitingRoom)) return;
    PlayerManager.delete(socketID);
  };

  const onReadyPlayer = ({ playerID, bReady }) => {
    if (!SceneManager.isCurrentScene(WaitingRoom)) return;
    const player = PlayerManager.get(playerID);
    if (player) player.setReady(bReady);
  };

  const onGetRoundData = ({ tellerID, cards, endTime }) => {
    if (!SceneManager.isCurrentScene(WaitingRoom)) return;
    PlayerManager.setTellerID(tellerID);
    CardManager.initializeMyCards(cards);
    const { bTeller } = PlayerManager.getCurrentPlayer();
    const nextScene = bTeller
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
