import io from 'socket.io';
import onWaitingRoom from './waitingRoom';
import onChat from './chat';
import exitRoom from './exitRoom.ts';
import onGuesserSelectCard from './guesserSelectCard';

const socketIO = io();

socketIO.on('connection', (socket) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`User connected ${socket.id}`);
  }

  onWaitingRoom(socket);
  onChat(socket);
  exitRoom(socket);
  onGuesserSelectCard(socket);
});

export default socketIO;
