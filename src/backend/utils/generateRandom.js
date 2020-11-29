import Games from '@game/Games';
import nickname from './nickname.json';

const generateRandomString = () =>
  Math.random().toString(36).substr(2, 5).toUpperCase();

const randomFunctions = {
  nickname: () => {
    const { adjective: adj, noun } = nickname;
    const randomAdj = adj[Math.floor(Math.random() * adj.length)];
    const randomNoun = noun[Math.floor(Math.random() * noun.length)];
    return `${randomAdj} ${randomNoun}`;
  },
  color: () => '#222222',
  roomID: () => {
    const randomString = generateRandomString();
    if (Games.hasGame(randomString)) return randomFunctions.roomID();
    return randomString;
  },
};

export default randomFunctions;
