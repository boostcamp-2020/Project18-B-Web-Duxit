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

export const toggleReady = ({ target }) => {
  const { isReady } = JSON.parse(target.dataset.data);
  // const nextStatus = target.dataset.status === 'not ready';
  const nextStatus = !isReady;
  // target.dataset.status = nextStatus ? 'ready' : 'not ready';
  target.dataset.data = JSON.stringify({ isReady: nextStatus });
  target.classList.toggle('button-primary');
  target.classList.toggle('button-primary-clicked');
  socket.emit('ready player', { isReady: nextStatus });
};
