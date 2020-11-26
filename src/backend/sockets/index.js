import io from 'socket.io';

const socketIO = io();

socketIO.on('connection', (socket) => {
  console.log('a user connected');

  socket.emit('hi', '123');
});

export default socketIO;
