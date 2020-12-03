import GameList from '@game/GameList';
import nickname from './nickname.json';

const generateRandomString = () =>
  Math.random().toString(36).substr(2, 5).toUpperCase();

const sortByRandom = () => Math.random() - 0.5;

const randomFunctions = {
  nickname: () => {
    const { adjective: adj, noun } = nickname;
    const randomAdj = adj[Math.floor(Math.random() * adj.length)];
    const randomNoun = noun[Math.floor(Math.random() * noun.length)];
    return `${randomAdj} ${randomNoun}`;
  },
  color: () => {
    const r = Math.round(Math.random() * 255).toString(16);
    const g = Math.round(Math.random() * 255).toString(16);
    const b = Math.round(Math.random() * 255).toString(16);
    const color = `#${r}${g}${b}`.padEnd(7, '0');
    return color;
  },
  roomID: () => {
    const randomString = generateRandomString();
    if (GameList.hasGame(randomString)) return randomFunctions.roomID();
    return randomString;
  },
  cards: (count) =>
    Array.from({ length: process.env.CARD_COUNT }, (value, index) => index)
      .sort(sortByRandom)
      .slice(0, count),
  pickOneFromArray: (array) => {
    return array[Math.floor(Math.random() * array.length)];
  },
};

export default randomFunctions;
