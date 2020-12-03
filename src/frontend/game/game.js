import './game.scss';
import socket from '@utils/socket';
import { $id, $create } from '@utils/dom';
import requestHandler from '@utils/requestHandler';
import WaitingRoom from '@scenes/waitingRoom';
import TellerSelectCard from '@scenes/tellerSelectCard';
import GuesserWaiting from '@scenes/guesserWaiting';
import SceneManager from '@utils/SceneManager';
import PlayerManager from '@utils/PlayerManager';

const scrollToBottom = (component) => {
  const scrollOption = {
    top: component.scrollHeight,
  };
  component.scrollTo(scrollOption);
};

const getMessageFromServer = ({ nickname, message }, logObject) => {
  const messageWrapper = $create('div');
  const nicknameBox = $create('div');
  const messageBox = $create('div');

  messageWrapper.classList.add('chat-other-player');
  messageWrapper.appendChild(nicknameBox);
  messageWrapper.appendChild(messageBox);

  nicknameBox.classList.add('chat-nickname');
  nicknameBox.innerText = nickname;

  messageBox.classList.add('chat-message');
  messageBox.innerText = message;

  logObject.appendChild(messageWrapper);
  scrollToBottom(logObject);
};

const initializeLayout = () => {
  const chatMessageLog = $id('chat-message-log');
  const chatForm = $id('chat-form');

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = e.target.message.value;
    if (!message.trim().length) return;
    e.target.message.value = '';

    // TODO: initialize에서 분리하기
    const sendMessageToServer = () => {
      const messageWrapper = $create('div');
      const messageBox = $create('div');

      messageWrapper.classList.add('chat-mine');
      messageWrapper.appendChild(messageBox);

      messageBox.classList.add('chat-message');
      messageBox.innerText = message;

      chatMessageLog.appendChild(messageWrapper);
    };

    socket.emit('send chat', { message });
    sendMessageToServer();
    scrollToBottom(chatMessageLog);
  });

  const logMessage = (args) => getMessageFromServer(args, chatMessageLog);

  socket.on('send chat', logMessage);
};

const initialize = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const roomID = urlParams.get('room');
  const config = { method: 'GET', uri: `/rooms/${roomID}` };
  const { success } = await requestHandler(config);
  if (!success) {
    window.alert('올바르지 않은 코드입니다.');
    window.location.href = '/';
    return;
  }

  initializeLayout();
  SceneManager.renderNextScene(new WaitingRoom(roomID));

  // initialize game event socket
  socket.on('enter room', ({ nickname, players }) => {
    PlayerManager.initialize(players);
    PlayerManager.updateCurrentPlayer({ nickname });
  });
  socket.on('update player', ({ socketID, nickname, color }) => {
    PlayerManager.set({ socketID, nickname, color });
  });
  socket.on('exit player', ({ socketID }) => {
    PlayerManager.delete(socketID);
  });
  socket.emit('join player', { roomID });
  socket.on('get round data', ({ tellerID, cards }) => {
    PlayerManager.setTellerID(tellerID);
    const { isTeller } = PlayerManager.getCurrentPlayer();
    console.log(PlayerManager.getCurrentPlayer(), isTeller);
    const nextScene = isTeller
      ? new TellerSelectCard({ cards })
      : new GuesserWaiting();
    SceneManager.renderNextScene(nextScene);
  });
};

initialize();
