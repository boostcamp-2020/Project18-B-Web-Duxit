import socket from '@utils/socket';
import Peer from 'peerjs';
import leftSound from '@resources/left.mp3';
import {
  getAudioStream,
  setAnswerBehavior,
  connectToNewUser,
  peerMap,
  deleteOtherPeer,
  closeVoiceButton,
  transformVoiceButton,
  putBackVoiceButton,
} from '@utils/voiceChatUtil';

let myPeerJSClient = null;
let myAudioStream = null;

const isConnectedToVoiceChat = () => {
  return myPeerJSClient && myAudioStream;
};

// 내가 보이스 채팅 접속
const activateVoiceChat = () => {
  myPeerJSClient = new Peer(socket.id);
  myPeerJSClient.on('open', async () => {
    try {
      // 마이크 연결
      closeVoiceButton();
      myAudioStream = await getAudioStream();
      transformVoiceButton();
      setAnswerBehavior({
        stream: myAudioStream,
        peer: myPeerJSClient,
      });
    } catch (err) {
      console.log('Get Media error: ', err);
    }

    socket.emit('player connect voice');
  });
};

// 내가 보이스 채팅 접속을 끊었을 때
const deactivateVoiceChat = () => {
  socket.emit('player disconnect voice');
  myPeerJSClient.destroy();
  myPeerJSClient = null;
  myAudioStream.getTracks().forEach((track) => {
    track.stop();
  });

  [...peerMap.keys()].forEach((socketID) => {
    deleteOtherPeer(socketID);
  });

  putBackVoiceButton();
};

// 연결된 유저가 보이스 채팅 접속을 끊었을 때
socket.on('voice disconnected', ({ socketID }) => {
  if (!isConnectedToVoiceChat()) return;

  const se = new Audio(leftSound);
  se.play();

  deleteOtherPeer(socketID);
});

socket.on('another voice connected', ({ socketID }) => {
  if (!isConnectedToVoiceChat()) return;

  connectToNewUser({
    peer: myPeerJSClient,
    socketID,
    stream: myAudioStream,
  });
});

export { activateVoiceChat, deactivateVoiceChat };
