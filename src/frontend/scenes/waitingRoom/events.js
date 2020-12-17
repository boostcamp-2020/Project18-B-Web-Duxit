import socket from '@utils/socket';
import PlayerManager from '@utils/PlayerManager';
import { testHexColorString } from '@utils/hexColor';
import { $qs } from '@utils/dom';
import TIME from '@type/time';

export const redirectToLobby = () => {
  window.location.href = '/';
};

export const copyGameCode = (e) => {
  const roomID = e.currentTarget.firstChild;
  navigator.permissions.query({ name: 'clipboard-write' }).then(({ state }) => {
    if (state === 'granted' || state === 'prompt') {
      navigator.clipboard.writeText(roomID.innerText);
    }
  });
  const copyNotice = $qs('.copy-notice');
  if (copyNotice.classList.contains('copy-notice-animate')) return;
  copyNotice.classList.add('copy-notice-animate');
  setTimeout(() => {
    copyNotice.classList.remove('copy-notice-animate');
  }, TIME.TWO_SECONDS);
};

export const changeNickname = (NicknameInput) => {
  const newNickname = NicknameInput.instance.value;
  if (!newNickname || newNickname.length > 12) {
    // 이전 닉네임으로 되돌아가는 기능 추가해야 함
    return;
  }
  socket.emit('update player', { nickname: newNickname });
};

export const toggleReady = ({ target }) => {
  const currentPlayer = PlayerManager.getCurrentPlayer();
  const { bReady } = currentPlayer;
  const nextStatus = !bReady;

  target.innerText = nextStatus ? '준비 해제' : '준비 완료';
  target.classList.toggle('button-primary');
  target.classList.toggle('button-primary-clicked');

  PlayerManager.getCurrentPlayer().setReady(nextStatus);
  socket.emit('ready player', { bReady: nextStatus });
};

export const changeColor = ({ target }) => {
  const { value: color } = target;
  if (testHexColorString(color)) {
    target.classList.remove('input-state-invalid');
    socket.emit('update player', { color });
  } else {
    target.classList.add('input-state-invalid');
  }
};

export const inputColorHandler = ({ target }) => {
  const { value: color = '' } = target;
  if (!color.startsWith('#')) {
    Object.assign(target, { value: `#${color}` });
    inputColorHandler({ target });
    return;
  }
  if (color.length > 7) {
    Object.assign(target, { value: color.slice(0, 7) });
    inputColorHandler({ target });
    return;
  }
  changeColor({ target });
};
