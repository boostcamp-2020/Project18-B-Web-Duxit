import socket from '@utils/socket';

// eslint-disable-next-line import/prefer-default-export
export const sendGuesserdecision = ({ cardID, Modal }) => {
  socket.emit('send guesser decision', { cardID });
  Modal.delete();
};
