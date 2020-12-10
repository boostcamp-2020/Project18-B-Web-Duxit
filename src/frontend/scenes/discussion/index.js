import './discussion.scss';
import renderDiscussion from './render';
import setupDiscussion from './socket';

const Discussion = class {
  render() {
    const { arrayToBeRemoved = [], SkipText } = renderDiscussion();
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
