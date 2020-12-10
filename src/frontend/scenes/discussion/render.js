import ProgressBarObject from '@engine/ProgressBarObject';
import ButtonObject from '@engine/ButtonObject';
import TextObject from '@engine/TextObject';
import GameObject from '@engine/GameObject';
import TIME from '@type/time';
import TEXT from '@utils/text';
import { clickSkip } from './events';

const renderDiscussion = () => {
  const ProgressBar = new ProgressBarObject();
  ProgressBar.createElement();
  ProgressBar.attachToRoot();
  ProgressBar.setTime(TIME.SELECT_CARD);
  ProgressBar.start();

  const HelpText = new TextObject();
  HelpText.addClass('discussion-helper-text');
  HelpText.setContent(TEXT.DISCUSSION);
  HelpText.attachToRoot();

  const ActionWrapper = new GameObject();
  ActionWrapper.addClass('discussion-action-wrapper');
  ActionWrapper.attachToRoot();

  const SkipButton = new ButtonObject();
  SkipButton.setContent('Skip');
  SkipButton.addClass('skip-button');
  SkipButton.attachToObject(ActionWrapper);
  SkipButton.addClickHandler(clickSkip);
  const arrayToBeRemoved = [ProgressBar];

  return {
    arrayToBeRemoved,
  };
};

export default renderDiscussion;
