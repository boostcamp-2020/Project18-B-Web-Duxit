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

const requestEnterRoom = (codeInput, error) => async (e) => {
  e.preventDefault();
  const roomCode = e.target['code-input'].value.toUpperCase();
  const config = { method: 'GET', uri: `/rooms/${roomCode}` };
  const { success } = await requestHandler(config);
  if (success) redirectToGameRoom(roomCode);
  else {
    Object.assign(error.style, { display: 'inline' });
    Object.assign(codeInput, { value: '' });
    codeInput.focus();
  }
};

const focusInput = (codeInput) => () => {
  codeInput.focus();
};

const initializeOnEvents = () => {
  const makeRoomButton = $id('create-room');
  const enterRoomForm = $id('enter-room');
  const codeCheckbox = $id('input-code');
  const codeInput = $id('code-input');
  const error = $id('code-error');

  makeRoomButton.addEventListener('click', requestMakeRoom);
  enterRoomForm.addEventListener('submit', requestEnterRoom(codeInput, error));
  codeCheckbox.addEventListener('change', focusInput(codeInput));
};

initializeOnEvents();
