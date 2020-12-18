import socket from '@utils/socket';
import PlayerManager from '@utils/PlayerManager';

// eslint-disable-next-line import/prefer-default-export
export const sendGuesserdecision = ({ cardID, Modal }) => {
  socket.emit('send guesser decision', { cardID });
  PlayerManager.getCurrentPlayer().submittedCardID = cardID;
  Modal.delete();
};
