import './game.scss';
import renderWaitingRoom from '@scenes/waitingRoom';
import socket from '@utils/socket';

const initializeLayout = () => {
  const chatMessageLog = document.getElementById('chat-message-log');
  const chatForm = document.getElementById('chat-form');

  chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = e.target.message.value;
    e.target.message.value = '';

    // TODO: initialize에서 분리하기
    const sendMessageToServer = () => {
      const messageWrapper = document.createElement('div');
      const messageBox = document.createElement('div');
      messageWrapper.classList.add('chat-mine');
      messageBox.classList.add('chat-message');
      messageWrapper.appendChild(messageBox);
      chatMessageLog.appendChild(messageWrapper);
      messageBox.innerText = message;
    };

    // sendMessageToServer();

    socket.emit('send chat', { message }, sendMessageToServer);
  });

  // TODO: initialize에서 분리하기
  const getMessageFromServer = ({ nickname, message }) => {
    const messageWrapper = document.createElement('div');
    const nicknameBox = document.createElement('div');
    const messageBox = document.createElement('div');
    messageWrapper.classList.add('chat-other-player');
    nicknameBox.classList.add('chat-nickname');
    messageBox.classList.add('chat-message');
    messageWrapper.appendChild(nicknameBox);
    messageWrapper.appendChild(messageBox);
    chatMessageLog.appendChild(messageWrapper);
    nicknameBox.innerText = nickname;
    messageBox.innerText = message;
  };

  socket.on('send chat', getMessageFromServer);
};

const initialize = () => {
  const urlParams = new URLSearchParams(window.location.search);
  const roomID = urlParams.get('room');
  socket.emit('join player', { roomID });

  initializeLayout();

  renderWaitingRoom(roomID);
};

initialize();
