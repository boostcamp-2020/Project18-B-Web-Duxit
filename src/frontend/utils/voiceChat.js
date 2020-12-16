import socket from '@utils/socket';
import Peer from 'peerjs';

let myPeer = null;
let peerID = null;

const audioContainer = document.getElementById('voice-chat-audio-container');

const peers = {};

const peerMap = new Map();

function addAudioStream(mediaConnection) {
  const socketID = mediaConnection.peer;

  if (peerMap.has(socketID)) return;

  const audioElement = document.createElement('audio');

  mediaConnection.on('stream', (stream) => {
    // eslint-disable-next-line no-param-reassign
    audioElement.srcObject = stream;
    audioElement.addEventListener('loadedmetadata', () => {
      audioElement.play();
    });
    audioContainer.append(audioElement);
  });

  mediaConnection.on('close', () => {
    audioElement.remove();
  });

  peerMap.set(socketID, {
    mediaConnection,
    audioElement,
  });
}

// socket을 통해 다른 사람이 접속한걸 받았을 때
// 다른 사람에게 mediaConnection 요청을 보냄
function connectToNewUser(userId, stream) {
  const mediaConnection = myPeer.call(userId, stream);
  addAudioStream(mediaConnection);

  peers[userId] = mediaConnection;
}

// 내가 다른 사람의 mediaConnection 요청을 받았을 때
function setAnswerBehavior(stream) {
  myPeer.on('call', (mediaConnection) => {
    // 다른 사람의 요청에 answer를 날림
    mediaConnection.answer(stream);
    addAudioStream(mediaConnection);
  });

  // 계속 소켓 on 쌓일거 같은데?
  socket.on('another voice connected', (userId) => {
    connectToNewUser(userId, stream);
  });
}

const getAudioStream = () =>
  navigator.mediaDevices.getUserMedia({
    video: false,
    audio: true,
  });

// 내가 보이스 채팅 접속
function activateVoiceChat() {
  myPeer = new Peer(socket.id);
  myPeer.on('open', async (id) => {
    peerID = id;
    try {
      const stream = await getAudioStream();
      setAnswerBehavior(stream);
    } catch (err) {
      console.log('Get Media error: ', err);
    }

    socket.emit('player connect voice', id);
  });
}

// 내가 보이스 채팅 접속을 끊었을 때
function deactivateVoiceChat() {
  socket.emit('player disconnect voice', { id: peerID });
  socket.removeAllListeners('another voice connected');
  myPeer.destroy();
}

// 연결된 유저가 보이스 채팅 접속을 끊었을 때
socket.on('voice disconnected', (userId) => {
  if (peers[userId]) peers[userId].close();
});

export { activateVoiceChat, deactivateVoiceChat };
