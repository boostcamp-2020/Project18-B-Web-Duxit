import './index.scss';
import request from '../utils/requestHandler';

const redirectToGameRoom = (code) => {
  window.location.href = `/game?room=${code}`;
};

const requestMakeRoom = async (e) => {
  e.preventDefault();
  const config = { method: 'POST', uri: '/rooms' };
  const { ok, code } = await request(config);
  if (ok) redirectToGameRoom(code);
};

const requestEnterRoom = async (e) => {
  e.preventDefault();
  const code = e.target['code-input'].value;
  const config = { method: 'GET', uri: `/rooms/${code}` };
  const { ok } = await request(config);
  if (ok) redirectToGameRoom(code);
};

const initialize = () => {
  const makeRoomButton = document.getElementById('create-room');
  const enterRoomForm = document.getElementById('enter-room');

  makeRoomButton.addEventListener('click', requestMakeRoom);
  enterRoomForm.addEventListener('submit', requestEnterRoom);
};

initialize();
