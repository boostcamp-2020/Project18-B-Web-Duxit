import './game.scss';
import waitingRoom from '../scenes/waitingRoom';

const urlParams = new URLSearchParams(window.location.search);
const roomCode = urlParams.get('room');
waitingRoom(roomCode);
