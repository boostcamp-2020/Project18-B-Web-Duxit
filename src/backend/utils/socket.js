import socketIO from '@socket';

export const findRoomID = (socket) => {
  return [...socket.rooms].find((id) => id !== socket.id);
};

export const emit = ({ users, socketID, name, params }) => {
  if (users && !socketID) {
    users.forEach((user) => socketIO.to(user.socketID).emit(name, params));
  } else socketIO.to(socketID).emit(name, params);
};
