import io from 'socket.io';
import { onJoinPlayer } from './waitingRoom';
import { onSendChat } from './chat';

const socketIO = io();

socketIO.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('join player', (params) => onJoinPlayer(socket, { ...params }));
  socket.on('send chat', (params) => onSendChat(socket, { ...params }));
});

export default socketIO;
