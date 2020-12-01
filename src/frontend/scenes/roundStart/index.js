import renderRoundStart from './render';

const RoundStart = class {
  constructor({ tellerID, socketID }) {
    this.isTeller = tellerID === socketID;
  }

  render() {
    const { removeArray } = renderRoundStart({ isTeller: this.isTeller });
    this.removeArray = removeArray;
  }

  wrapup() {
    this.removeArray.forEach((gameObject) => {
      gameObject.delete();
    });
  }
};

export default RoundStart;
