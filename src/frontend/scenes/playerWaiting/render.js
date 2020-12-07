import './playerWaiting.scss';
import ProgressBarObject from '@engine/ProgressBarObject';
import TIME from '@utils/time';

const renderPlayerWaiting = () => {
  const ProgressBar = new ProgressBarObject();
  ProgressBar.createElement();
  ProgressBar.attachToRoot();
  ProgressBar.setTime(TIME.SELECT_CARD);
  ProgressBar.start();

  const arrayToBeRemoved = [ProgressBar];

  return {
    arrayToBeRemoved,
  };
};

export default renderPlayerWaiting;
