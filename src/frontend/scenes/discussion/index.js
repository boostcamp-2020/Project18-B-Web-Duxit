import './discussion.scss';
import renderDiscussion from './render';

const Discussion = class {
  render() {
    const { arrayToBeRemoved = [] } = renderDiscussion();
    this.arrayToBeRemoved = arrayToBeRemoved;
  }

  wrapup() {
    this.arrayToBeRemoved.forEach((gameObject) => {
      gameObject.delete();
    });
  }
};

export default Discussion;
