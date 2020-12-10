import ProgressBarObject from '@engine/ProgressBarObject';
import ButtonObject from '@engine/ButtonObject';
import TextObject from '@engine/TextObject';
import GameObject from '@engine/GameObject';
import TIME from '@type/time';
import TEXT from '@utils/text';
import { clickSkip, mouseOverSkip, mouseOutSkip, initTeller } from './events';

const renderDiscussion = () => {
  const ProgressBar = new ProgressBarObject();
  ProgressBar.createElement();
  ProgressBar.attachToRoot();
  ProgressBar.setTime(TIME.SELECT_CARD);
  ProgressBar.start();

  const HelpText = new TextObject();
  HelpText.addClass('discussion-helper-text');
  HelpText.setContent(TEXT.DISCUSSION.TITLE);
  HelpText.attachToRoot();

  const ActionWrapper = new GameObject();
  ActionWrapper.addClass('discussion-action-wrapper');
  ActionWrapper.attachToRoot();

  const WarningTextBox = new GameObject();
  WarningTextBox.addClass('warning-bubble');
  WarningTextBox.attachToObject(ActionWrapper);

  const WarningText = new TextObject();
  WarningText.addClass('warning-text');
  WarningText.setContent(TEXT.DISCUSSION.WARNING);
  WarningText.attachToObject(WarningTextBox);

  const SkipButton = new ButtonObject();
  SkipButton.setContent('Skip');
  SkipButton.addClass('skip-button');
  SkipButton.attachToObject(ActionWrapper);
  SkipButton.addClickHandler(clickSkip);
  SkipButton.instance.addEventListener('mouseover', mouseOverSkip);
  SkipButton.instance.addEventListener('mouseout', mouseOutSkip);

  const SkipText = new TextObject();
  SkipText.addClass('discussion-skip-text');
  SkipText.addClass('hide');
  SkipText.setContent(TEXT.DISCUSSION.SKIP);
  SkipText.attachToRoot();

  initTeller();
  const arrayToBeRemoved = [
    ProgressBar,
    HelpText,
    ActionWrapper,
    WarningTextBox,
    WarningText,
    SkipButton,
    SkipText,
  ];

  return {
    arrayToBeRemoved,
    SkipText,
  };
};

export default renderDiscussion;
