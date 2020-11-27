import nickname from './nickname.json';

const randomStrings = new Set();

const generateRandomString = () =>
  Math.random().toString(36).substr(2, 5).toUpperCase();

export default {
  nickname: () => {
    const { adjective: adj, noun } = nickname;
    const randomAdj = adj[Math.floor(Math.random() * adj.length)];
    const randomNoun = noun[Math.floor(Math.random() * noun.length)];
    return `${randomAdj} ${randomNoun}`;
  },
  color: () => '#222222',
  code: () => {
    let randomString = generateRandomString();
    while (randomStrings.has(randomString)) {
      randomString = generateRandomString();
    }
    randomStrings.add(randomString);
    return randomString;
  },
};
