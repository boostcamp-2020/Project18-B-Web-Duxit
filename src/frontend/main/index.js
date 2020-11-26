import './index.scss';
import requestHandler from '../utils/requestHandler';

const redirectToGameRoom = (roomCode) => {
  window.location.href = `/game?room=${roomCode}`;
};

const requestMakeRoom = async (e) => {
  e.preventDefault();
  const config = { method: 'POST', uri: '/rooms' };
  const { success, roomID } = await requestHandler(config);
  if (success) redirectToGameRoom(roomID);
};

const requestEnterRoom = async (e) => {
  e.preventDefault();
  const roomCode = e.target['code-input'].value;
  const config = { method: 'GET', uri: `/rooms/${roomCode}` };
  const { success } = await requestHandler(config);
  if (success) redirectToGameRoom(roomCode);
  else {
    const error = document.getElementById('code-error');
    error.style.display = 'inline';
  }
};

const initializeOnEvents = () => {
  const makeRoomButton = document.getElementById('create-room');
  const enterRoomForm = document.getElementById('enter-room');

  makeRoomButton.addEventListener('click', requestMakeRoom);
  enterRoomForm.addEventListener('submit', requestEnterRoom);
};

initializeOnEvents();
