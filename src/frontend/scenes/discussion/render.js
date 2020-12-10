import ProgressBarObject from '@engine/ProgressBarObject';
import ButtonObject from '@engine/ButtonObject';
import TextObject from '@engine/TextObject';
import GameObject from '@engine/GameObject';
import TIME from '@type/time';
import TEXT from '@utils/text';
import { clickSkip, mouseOverSkip, mouseOutSkip } from './events';

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

  const WarningTextBox = new GameObject();
  WarningTextBox.addClass('warning-bubble');
  WarningTextBox.attachToObject(ActionWrapper);

  const WarningText = new TextObject();
  WarningText.addClass('warning-text');
  WarningText.setContent(
    '한 번 Skip을 누르면 취소할 수 없어요! 신중하게 선택하세요!',
  );
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
  SkipText.setContent('모든 유저가 스킵했으므로 잠시 후 투표로 넘어갑니다.');
  SkipText.attachToRoot();
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
