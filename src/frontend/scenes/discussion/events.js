import socket from '@utils/socket';
import { $qs } from '@utils/dom';

// eslint-disable-next-line import/prefer-default-export
export const clickSkip = ({ target }) => {
  const warningBox = $qs('.warning-bubble');
  target.classList.remove('skip-button');
  target.classList.add('skip-button-clicked');
  target.setAttribute('disabled', true);
  warningBox.style.visibility = 'hidden';
  socket.emit('skip player');
};

export const mouseOverSkip = ({ target }) => {
  const warningBox = $qs('.warning-bubble');
  warningBox.style.visibility = 'visible';
};

export const mouseOutSkip = ({ target }) => {
  const warningBox = $qs('.warning-bubble');
  warningBox.style.visibility = 'hidden';
};
