import './guesserWaiting.scss';
import TextObject from '@engine/TextObject';
import TEXT from '@utils/text';

const renderGuesserWaiting = () => {
  const NotifyingTellerText = new TextObject();
  const tellerText = TEXT.WAIT_TELLER_SELECT;
  NotifyingTellerText.addClass('notify-teller');
  NotifyingTellerText.addClass('other');
  NotifyingTellerText.attachToRoot();
  NotifyingTellerText.setContent(tellerText);

  const removeArray = [NotifyingTellerText];

  return {
    removeArray,
  };
};

export default renderGuesserWaiting;
