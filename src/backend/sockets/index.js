import io from 'socket.io';
import onWaitingRoom from './waitingRoom';
import onChat from './chat';
import exitRoom from './exitRoom.ts';
import onTellerSelectCard from './tellerSelectCard';
import onGuesserSelectCard from './guesserSelectCard';
import onVoiceChat from './voiceChat';
import onDuckMove from './duckMove';

const socketIO = io();

socketIO.on('connection', (socket) => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`User connected ${socket.id}`);
  }

  onVoiceChat(socket);
  onWaitingRoom(socket);
  onChat(socket);
  exitRoom(socket);
  onTellerSelectCard(socket);
  onGuesserSelectCard(socket);
  onDuckMove(socket);
});

export default socketIO;
