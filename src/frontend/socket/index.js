import setupWaitingRoomSocket from './waitingRoom';
import setupTellerSelectSocket from './tellerSelectCard';
import setupGuesserWaiting from './guesserWaiting';
import setupGuesserSelectCard from './guesserSelectCard';
import setupPlayerWaiting from './playerWaiting';
import setupDiscussion from './discussion';
import setupEndGameSocket from './endGame';
import setupVote from './vote';
import setupVoteResult from './voteResult';

const SocketManager = {
  initializeSocketOn() {
    setupWaitingRoomSocket();
    setupTellerSelectSocket();
    setupGuesserWaiting();
    setupGuesserSelectCard();
    setupPlayerWaiting();
    setupDiscussion();
    setupEndGameSocket();
    setupVote();
    setupVoteResult();
  },
};

export default SocketManager;
