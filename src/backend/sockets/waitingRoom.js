import Games from '@game/Games';
import generateRandom from '@utils/generateRandom';

/*
클라이언트가 room id를 가지고 join player를 쏘면 👍
서버에서 해당 게임에 참가할 수 있는지 확인하고 👍
서버에서 해당 플레이어를 해당 room에 join시킨다 (socket join method) 👍
서버는 랜덤닉네임과 랜덤컬러를 생성해서 해당 아이디를 가지는 룸에 플레이어를 enter room 시킨다. (event) 👍
플레이어의 정보를 그 룸에 있는 다른 플레이어에게 update player를 쏜다. 👍
*/
export const onJoinPlayer = (socket, { roomID }) => {
  // 일단 테스트 위해 주석 처리
  // if (!roomID) return;
  const game = Games.get(roomID);
  const nickname = generateRandom.nickname();
  const color = generateRandom.color();
  // if (!game || !game.isPlaying) return;

  // game.addUser(socket.id);
  socket.join(roomID);
  socket.emit('enter room', {
    nickname,
    color,
    roomID,
    players: null,
  });
};
