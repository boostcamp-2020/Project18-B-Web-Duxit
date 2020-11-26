import './game.scss';
import ioClient from 'socket.io-client';
import waitingRoom from '../scenes/waitingRoom';

const socket = ioClient('http://localhost:3000');

socket.on('hi', (data) => {
  console.log(data);
});

const urlParams = new URLSearchParams(window.location.search);
const roomCode = urlParams.get('room');
waitingRoom(roomCode);
