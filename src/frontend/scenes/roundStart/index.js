import SceneManager from '@utils/SceneManager';
import TellerSelectCard from '../tellerSelectCard';
import GuesserWaiting from '../guesserWaiting';

const RoundStart = class {
  constructor({ tellerID, socketID, cards }) {
    this.cards = cards;
    this.isTeller = tellerID === socketID;
  }

  render() {
    const nextScene = this.isTeller
      ? new TellerSelectCard({ cards: this.cards })
      : new GuesserWaiting();
    SceneManager.renderNextScene(nextScene);
  }

  wrapup() {}
};

export default RoundStart;
