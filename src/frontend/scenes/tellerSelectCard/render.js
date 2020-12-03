import './tellerSelectCard.scss';
import TextObject from '@engine/TextObject';
import ProgressBarObject from '@engine/ProgressBarObject';
import TEXT from '@utils/text';
import TIME from '@utils/time';

const renderTellerSelect = () => {
  const NotifyingTellerText = new TextObject();
  const tellerText = TEXT.TELLER_SELECT;
  NotifyingTellerText.addClass('notify-teller');
  NotifyingTellerText.attachToRoot();
  NotifyingTellerText.setContent(tellerText);

  const ProgressBar = new ProgressBarObject();
  ProgressBar.createElement();
  ProgressBar.attachToRoot();
  ProgressBar.setTime(TIME.SELECT_CARD);
  ProgressBar.start();

  const removeArray = [NotifyingTellerText, ProgressBar];

  return {
    removeArray,
  };
};

export default renderTellerSelect;
