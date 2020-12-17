import socket from '@utils/socket';
import { $qs } from '@utils/dom';
import PlayerManager from '@utils/PlayerManager';

const changeClass = ({ target }) => {
  target.classList.remove('skip-button');
  target.classList.add('skip-button-clicked');
};

// eslint-disable-next-line import/prefer-default-export
export const clickSkip = ({ target }) => {
  const warningBox = $qs('.warning-bubble');
  changeClass({ target });
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
  const bTeller = PlayerManager.isTeller();
  const skipButton = $qs('.skip-button');
  if (bTeller) {
    changeClass({ target: skipButton });
    skipButton.setAttribute('disabled', true);
    socket.emit('skip player');
  }
};
