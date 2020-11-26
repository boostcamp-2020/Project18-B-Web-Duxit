import { findRoomID } from '@utils/socket';

export const onSendChat = (socket, { message }) => {
  const roomID = findRoomID(socket);
  if (!roomID) return;

  socket.in(roomID).emit('send chat', { message });
  // socket.emit('send chat', { message });
};
