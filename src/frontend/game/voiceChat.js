import socket from '@utils/socket';
import Peer from 'peerjs';
import {
  getAudioStream,
  setAnswerBehavior,
  connectToNewUser,
} from '@utils/voiceChatUtil';

let myPeerJSClient = null;
let myAudioStream = null;

const peerMap = new Map();

const deleteOtherPeer = (socketID) => {
  if (peerMap.has(socketID)) {
    peerMap.get(socketID).mediaConnection.close();
    peerMap.delete(socketID);
  }
};

const isConnectedToVoiceChat = () => {
  return myPeerJSClient && myAudioStream;
};

// 내가 보이스 채팅 접속
const activateVoiceChat = () => {
  myPeerJSClient = new Peer(socket.id);
  myPeerJSClient.on('open', async () => {
    try {
      // 마이크 연결
      myAudioStream = await getAudioStream();
      setAnswerBehavior({
        stream: myAudioStream,
        peerMap,
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

  peerMap.forEach((_, socketID) => {
    deleteOtherPeer(socketID);
  });
};

// 연결된 유저가 보이스 채팅 접속을 끊었을 때
socket.on('voice disconnected', ({ socketID }) => {
  if (!isConnectedToVoiceChat()) return;

  deleteOtherPeer(socketID);
});

socket.on('another voice connected', ({ socketID }) => {
  if (!isConnectedToVoiceChat()) return;

  connectToNewUser({
    peer: myPeerJSClient,
    socketID,
    stream: myAudioStream,
    peerMap,
  });
});

export { activateVoiceChat, deactivateVoiceChat };
