import setupWaitingRoomSocket from './waitingRoom';
import setupTellerSelectSocket from './tellerSelectCard';
import setupGuesserWaiting from './guesserWaiting';
import setupGuesserSelectCard from './guesserSelectCard';
import setupPlayerWaiting from './playerWaiting';
import setupMixCard from './mixCard';
import setupDiscussion from './discussion';
import setupVote from './vote';
import setupVoteResult from './voteResult';

const SocketManager = {
  initializeSocketOn() {
    setupWaitingRoomSocket();
    setupTellerSelectSocket();
    setupGuesserWaiting();
    setupGuesserSelectCard();
    setupPlayerWaiting();
    setupMixCard();
    setupDiscussion();
    setupVote();
    setupVoteResult();
  },
};

export default SocketManager;
