import renderDiscussion from './render';

const Discussion = class {
  constructor({ endTime }) {
    this.endTime = endTime;
    this.bMaintainDucks = true;
  }

  render() {
    const { endTime } = this;
    const { arrayToBeRemoved = [] } = renderDiscussion({ endTime });
    this.arrayToBeRemoved = arrayToBeRemoved;
  }

  wrapUp() {
    this.arrayToBeRemoved.forEach((gameObject) => {
      gameObject.delete();
    });
  }
};

export default Discussion;
