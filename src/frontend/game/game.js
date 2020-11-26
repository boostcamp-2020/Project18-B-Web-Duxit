import './game.scss';
import { renderWaitingRoom, setupWaitingRoomSocket } from '@scenes/waitingRoom';
import socket from '@utils/socket';
import requestHandler from '@utils/requestHandler';

const scrollToBottom = (component) => {
  const scrollOption = {
    top: component.scrollHeight,
  };
  component.scrollTo(scrollOption);
};

const initializeLayout = () => {
  const chatMessageLog = document.getElementById('chat-message-log');
  const chatForm = document.getElementById('chat-form');

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = e.target.message.value;
    if (!message.length) return;
    e.target.message.value = '';

    // TODO: initialize에서 분리하기
    const sendMessageToServer = () => {
      const messageWrapper = document.createElement('div');
      const messageBox = document.createElement('div');

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
    const messageWrapper = document.createElement('div');
    const nicknameBox = document.createElement('div');
    const messageBox = document.createElement('div');

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

  const { NicknameInput } = renderWaitingRoom(roomID);
  // const { PlayerList } = renderLeftTab();
  setupWaitingRoomSocket();

  socket.on('enter room', ({ nickname, color, players }) => {
    NicknameInput.setValue(nickname);
    // NicknameInput.instance.style.backgroundColor = color;
    // PlayerList.setListItems(players);
  });
};

initialize();
