import io from 'socket.io';

// eslint-disable-next-line import/prefer-default-export
export const socketIO = io();

socketIO.on('connection', (socket) => {
  console.log('a user connected');

  socket.emit('hi', '123');
});
