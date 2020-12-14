import setupWaitingRoomSocket from './waitingRoom';
import setupTellerSelectSocket from './tellerSelectCard';
import setupGuesserWaiting from './guesserWaiting';
import setupGuesserSelectCard from './guesserSelectCard';
import setupPlayerWaiting from './playerWaiting';
import setupMixCard from './mixCard';
import setupDiscussion from './discussion';

const SocketManager = {
  initializeSocketOn() {
    setupWaitingRoomSocket();
    setupTellerSelectSocket();
    setupGuesserWaiting();
    setupGuesserSelectCard();
    setupPlayerWaiting();
    setupMixCard();
    setupDiscussion();
  },
};

export default SocketManager;
