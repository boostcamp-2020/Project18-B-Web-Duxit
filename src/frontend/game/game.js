import './game.scss';
import { renderWaitingRoom, setupWaitingRoomSocket } from '@scenes/waitingRoom';
import socket from '@utils/socket';
import { $id, $create } from '@utils/dom';
import requestHandler from '@utils/requestHandler';
import LeftTab from './leftTab';

const scrollToBottom = (component) => {
  const scrollOption = {
    top: component.scrollHeight,
  };
  component.scrollTo(scrollOption);
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

  // TODO: initialize에서 분리하기
  const getMessageFromServer = ({ nickname, message }) => {
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

    chatMessageLog.appendChild(messageWrapper);
    scrollToBottom(chatMessageLog);
  };

  socket.on('send chat', getMessageFromServer);
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
  socket.emit('join player', { roomID });

  initializeLayout();

  const { NicknameInput, AllReadyText } = renderWaitingRoom(roomID);
  setupWaitingRoomSocket({ AllReadyText });

  socket.on('enter room', ({ nickname, players }) => {
    NicknameInput.setValue(nickname);
    LeftTab.initializePlayers(players);
  });

  socket.on('update player', (playerInfo) => {
    LeftTab.updatePlayer(playerInfo);
  });
};

initialize();
