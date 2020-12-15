import socket from '@utils/socket';
import CardManager from '@utils/CardManager';
import { calcAbsolutePosFromRoot } from '@utils/calculate';

/* eslint-disable
 import/prefer-default-export */
export const sendVoteResult = ({ cardID, DuckStamp, event }) => {
  if (CardManager.votedCard === cardID) {
    CardManager.voteCard(null);
    DuckStamp.addClass('hide');
  } else {
    const { x, y } = calcAbsolutePosFromRoot(event);
    CardManager.voteCard(cardID);
    DuckStamp.removeClass('hide');
    DuckStamp.move(x, y, 0);
  }
  socket.emit('vote card', { cardID: CardManager.votedCard });
};
