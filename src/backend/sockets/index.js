import io from 'socket.io';
import onWaitingRoom from './waitingRoom';
import onChat from './chat';
import exitRoom from './exitRoom.ts';
import onGuesserSelectCard from './guesserSelectCard';
import onVoiceChat from './voiceChat';

const socketIO = io();

socketIO.on('connection', (socket) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`User connected ${socket.id}`);
  }

  onVoiceChat(socket);
  onWaitingRoom(socket);
  onChat(socket);
  exitRoom(socket);
  onGuesserSelectCard(socket);
});

export default socketIO;
