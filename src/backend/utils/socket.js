export const findRoomID = (socket) => {
  return [...socket.rooms].find((id) => id !== socket.id);
};
