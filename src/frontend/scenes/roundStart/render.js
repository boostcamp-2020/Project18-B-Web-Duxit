import './roundStart.scss';
import TextObject from '@engine/TextObject';
import TEXT from '@utils/text';

const renderRoundStart = ({ isTeller }) => {
  const NotifyingTellerText = new TextObject();
  const tellerText = TEXT.TELLER[isTeller];
  NotifyingTellerText.addClass('notify-teller');
  if (!isTeller) NotifyingTellerText.addClass('other');
  NotifyingTellerText.attachToRoot();
  NotifyingTellerText.setContent(tellerText);

  const removeArray = [NotifyingTellerText];

  return {
    removeArray,
  };
};

export default renderRoundStart;
