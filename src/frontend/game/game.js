import './game.scss';
import waitingRoom from '../scenes/waitingRoom';
import ioClient from 'socket.io-client'

const socket = ioClient("http://localhost:3000", {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
});

socket.on('hi', (data) => {
    console.log(data)
})

const urlParams = new URLSearchParams(window.location.search);
const roomCode = urlParams.get('room');
waitingRoom(roomCode);
