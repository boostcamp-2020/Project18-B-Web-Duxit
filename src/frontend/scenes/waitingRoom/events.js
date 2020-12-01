import socket from '@utils/socket';

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
};

export const changeNickname = (NicknameInput) => {
  const newNickname = NicknameInput.instance.value;
  if (!newNickname || newNickname.length > 12) {
    // 이전 닉네임으로 되돌아가는 기능 추가해야 함
    return;
  }
  socket.emit('update player', { nickname: newNickname, color: '#578' });
};
