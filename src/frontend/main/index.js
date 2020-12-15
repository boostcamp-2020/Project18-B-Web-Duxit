import './main.scss';
import requestHandler from '@utils/requestHandler';
import { $id } from '@utils/dom';

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
    const error = $id('code-error');
    error.style.display = 'inline';
  }
};

const initializeOnEvents = () => {
  const makeRoomButton = $id('create-room');
  const enterRoomForm = $id('enter-room');

  makeRoomButton.addEventListener('click', requestMakeRoom);
  enterRoomForm.addEventListener('submit', requestEnterRoom);
};

initializeOnEvents();
