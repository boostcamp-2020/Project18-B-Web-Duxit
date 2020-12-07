import socket from '@utils/socket';

// eslint-disable-next-line import/prefer-default-export
export const sendTellerDicision = ({ cardID, topic, Modal }) => {
  if (topic.trim().length === 0) return;
  socket.emit('send teller decision', { cardID, topic });
  Modal.delete();
};
