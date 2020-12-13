import socket from '@utils/socket';
import Peer from 'peerjs';

let myPeer;

const videoGrid = document.getElementById('video-grid');

const myVideo = document.createElement('video');
myVideo.muted = true;
const peers = {};

function addVideoStream(video, stream) {
  video.srcObject = stream;
  video.addEventListener('loadedmetadata', () => {
    video.play();
  });
  videoGrid.append(video);
}

function connectToNewUser(userId, stream) {
  // userId를 가진 peer에게 call을 보내고 media connection을 return 받는다.
  // media connection은 local voice 또는 local video를 뜻한다.
  // 내가 다른 사람의 mediaConnection을 받아오는 부분!
  const mediaConnection = myPeer.call(userId, stream);
  const video = document.createElement('video');
  // peer.call 또는 call event의 callback은 MediaConnection 객체를 제공한다.
  // MediaConnection은 스스로 stream event를 emit한다.
  // stream event의 callback은 다른 peer의 video/audio stream을 포함한다.
  mediaConnection.on('stream', (userVideoStream) => {
    addVideoStream(video, userVideoStream);
  });
  mediaConnection.on('close', () => {
    video.remove();
  });

  peers[userId] = mediaConnection;
}

function connectionHandler(stream) {
  addVideoStream(myVideo, stream);
  // 내가 다른 사람의 mediaConnection을 받았을 때
  myPeer.on('call', (mediaConnection) => {
    // 다른 사람의 콜에 answer를 날림
    mediaConnection.answer(stream);
    const video = document.createElement('video');
    // answer를 받고 나면 stream 이벤트를 받을 수 있음.
    // stream이벤트를 통해 remote의 stream을 받아옴
    mediaConnection.on('stream', (userVideoStream) => {
      addVideoStream(video, userVideoStream);
    });
  });

  socket.on('another voice connected', (userId) => {
    connectToNewUser(userId, stream);
  });
}

function initVoiceChat() {
  const connectButton = document.querySelector('.microphone-controller');
  connectButton.addEventListener('click', async (e) => {
    myPeer = new Peer();
    myPeer.on('open', (id) => {
      socket.emit('player connect voice channel', id);
    });

    let stream = null;
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: false,
        audio: true,
      });
      connectionHandler(stream);
    } catch (err) {
      console.log(err);
    }
  });
  socket.on('voice disconnected', (userId) => {
    if (peers[userId]) peers[userId].close();
  });
}

export default initVoiceChat;
