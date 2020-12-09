import { emit } from '@socket';

export const findRoomID = (socket) => {
  return [...socket.rooms].find((id) => id !== socket.id);
};

export const forceTellerSelect = ({ teller, users }) => {
  const { cardID, topic } = teller.selectCardFromUser({ teller: true });
  users.forEach((user) => {
    const { socketID } = user;
    const isTeller = socketID === teller.socketID;
    const name = isTeller ? 'teller select card' : 'teller decision';
    const params = isTeller ? { cardID, topic } : { cardID };
    emit({ socketID, name, params });
  });
  return topic;
};

export const forceGuesserSelect = ({ unsubmittedUsers, users }) => {
  unsubmittedUsers.forEach((user) => {
    const { socketID } = user;
    const otherUsers = users.filter(
      ({ socketID: guesserID }) => guesserID !== socketID,
    );
    const { cardID } = user.selectCardFromUser({ teller: false });
    emit({ socketID, name: 'guesser select card', params: { cardID } });
    emit({
      users: otherUsers,
      name: 'other guesser decision',
      params: { playerID: socketID },
    });
  });
};
