import './game.scss';
import socket from '@utils/socket';
import { $id, $create } from '@utils/dom';
import requestHandler from '@utils/requestHandler';
import WaitingRoom from '@scenes/waitingRoom';
import SceneManager from '@utils/SceneManager';
import PlayerManager from '@utils/PlayerManager';
import SocketManager from '@socket';
import TIME from '@type/time';
import './LeftTab';
import './background';

const ALERT_MESSAGE = {
  1: '존재하지 않는 코드입니다. 오타가 있는지 확인해보세요! 😢',
  2: '빈 자리가 없어 입장할 수 없습니다. 😭',
  3: '게임이 이미 시작되었어요! 🤭',
};

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
  SceneManager.initializeComponents();
  SocketManager.initializeSocketOn();

  const urlParams = new URLSearchParams(window.location.search);
  const roomID = urlParams.get('room');
  const config = { method: 'GET', uri: `/rooms/${roomID}` };
  const { success, CODE } = await requestHandler(config);

  if (!success) {
    window.alert(ALERT_MESSAGE[CODE]);
    window.location.href = '/';
    return;
  }

  initializeLayout();
  SceneManager.renderNextScene(new WaitingRoom(roomID));
  socket.emit('join player', { roomID });
  socket.on('get duck move', ({ x, y, playerID: socketID }) => {
    if (!PlayerManager.has(socketID)) return;
    const { duck } = PlayerManager.get(socketID);
    duck.move(x, y, TIME.DUCK_SPEED);
  });
};

initialize();
