import './game.scss';
import ioClient from 'socket.io-client';
import waitingRoom from '../scenes/waitingRoom';

const socket = ioClient(process.env.API_BASE_URL);

const urlParams = new URLSearchParams(window.location.search);
const roomCode = urlParams.get('room');
waitingRoom(roomCode);
