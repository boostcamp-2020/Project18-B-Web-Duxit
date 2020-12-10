import socket from '@utils/socket';

// eslint-disable-next-line import/prefer-default-export
export const clickSkip = ({ target }) => {
  target.classList.remove('skip-button');
  target.classList.add('skip-button-clicked');
  target.setAttribute('disabled', true);
  //   socket.emit('skip player', { isSkip: nextStatus });
};
