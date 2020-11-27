import io from 'socket.io';
import onWaitingRoom from './waitingRoom';
import onChat from './chat';

const socketIO = io();

socketIO.on('connection', (socket) => {
  console.log('a user connected');

  onWaitingRoom(socket);
  onChat(socket);
});

export default socketIO;
