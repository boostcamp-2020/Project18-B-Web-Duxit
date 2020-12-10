import './discussion.scss';
import renderDiscussion from './render';
import setupDiscussion from './socket';

const Discussion = class {
  constructor({ endTime }) {
    this.endTime = endTime;
  }

  render() {
    const { endTime } = this;
    const { arrayToBeRemoved = [], SkipText } = renderDiscussion({ endTime });
    this.arrayToBeRemoved = arrayToBeRemoved;
    setupDiscussion({ SkipText });
  }

  wrapup() {
    this.arrayToBeRemoved.forEach((gameObject) => {
      gameObject.delete();
    });
  }
};

export default Discussion;
