import renderRoundStart from './render';

const RoundStart = class {
  constructor({ tellerID, socketID }) {
    this.isTeller = tellerID === socketID;
  }

  render() {
    renderRoundStart({ isTeller: this.isTeller });
  }

  wrapup() {
    this.removeArray.forEach((gameObject) => {
      gameObject.delete();
    });
  }
};

export default RoundStart;
