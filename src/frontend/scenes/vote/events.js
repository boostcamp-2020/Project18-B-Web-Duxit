import socket from '@utils/socket';
import CardManager from '@utils/CardManager';
import { $id } from '@utils/dom';

const calcPosition = (event) => {
  const { clientX: cursorX, clientY: cursorY } = event;
  const root = $id('root');
  const { x: rootX, y: rootY, width, height } = root.getBoundingClientRect();
  const x = ((cursorX - rootX) / width) * 100;
  const y = ((cursorY - rootY) / height) * 100;

  return { x, y };
};

/* eslint-disable
 import/prefer-default-export */
export const sendVoteResult = ({ cardID, DuckStamp, event }) => {
  if (CardManager.votedCard === cardID) {
    CardManager.voteCard(null);
    DuckStamp.addClass('hide');
  } else {
    const { x, y } = calcPosition(event);
    CardManager.voteCard(cardID);
    DuckStamp.removeClass('hide');
    DuckStamp.move(x, y, 0);
  }
  socket.emit('vote card', { cardID: CardManager.votedCard });
};
