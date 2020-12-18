import setupWaitingRoomSocket from './waitingRoom';
import setupTellerSelectSocket from './tellerSelectCard';
import setupGuesserWaiting from './guesserWaiting';
import setupGuesserSelectCard from './guesserSelectCard';
import setupPlayerWaiting from './playerWaiting';
import setupDiscussion from './discussion';
import setupScoreboardSocket from './scoreboard';
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
    setupScoreboardSocket();
    setupVote();
    setupVoteResult();
  },
};

export default SocketManager;
