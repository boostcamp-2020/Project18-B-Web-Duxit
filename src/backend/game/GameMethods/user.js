import generateRandom from '@utils/generateRandom';
import GameList from '@game/GameList';
import User from '@game/User';

function addUser({ socketID }) {
  const nickname = generateRandom.nickname();
  const color = generateRandom.color();
  const user = new User({ socketID, nickname, color });
  GameList.addID(socketID, this);
  this.users.set(socketID, user);
  return user;
}

function removeUser({ socketID }) {
  this.users.delete(socketID);
  GameList.removeID(socketID);
  if (this.users.size < 1) {
    GameList.removeID(this.roomID);
  }
}

function getUser(socketID) {
  return this.users.get(socketID);
}

function getUsers() {
  return [...this.users.values()];
}

function getTeller() {
  const [teller] = this.getUsers().filter((user) => user.bTeller);
  return teller;
}

function getGuessers() {
  return this.getUsers().filter((user) => !user.bTeller);
}

function getUsersProfile() {
  return [...this.users.keys()].map((socketID) => {
    return { ...this.users.get(socketID).getProfile(), socketID };
  });
}

const methodGroup = {
  addUser,
  removeUser,
  getUser,
  getUsers,
  getTeller,
  getGuessers,
  getUsersProfile,
};

export default methodGroup;
