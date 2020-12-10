import socket from '@utils/socket';
import { $qs } from '@utils/dom';
import PlayerManager from '@utils/PlayerManager';

// eslint-disable-next-line import/prefer-default-export
export const clickSkip = ({ target }) => {
  const warningBox = $qs('.warning-bubble');
  target.classList.remove('skip-button');
  target.classList.add('skip-button-clicked');
  target.setAttribute('disabled', true);
  warningBox.style.visibility = 'hidden';
  socket.emit('skip player');
};

export const mouseOverSkip = () => {
  const warningBox = $qs('.warning-bubble');
  warningBox.style.visibility = 'visible';
};

export const mouseOutSkip = () => {
  const warningBox = $qs('.warning-bubble');
  warningBox.style.visibility = 'hidden';
};

export const initTeller = () => {
  const isTeller = PlayerManager.isTeller();
  const skipButton = $qs('.skip-button');
  if (isTeller) {
    skipButton.classList.remove('skip-button');
    skipButton.classList.add('skip-button-clicked');
    socket.emit('skip player');
  }
};
