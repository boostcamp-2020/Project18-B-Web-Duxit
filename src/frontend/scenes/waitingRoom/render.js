import './waitingRoom.scss';
import ButtonObject from '@engine/ButtonObject';
import GameObject from '@engine/GameObject';
import TextObject from '@engine/TextObject';
import InputObject from '@engine/InputObject';
import SvgObject from '@engine/SvgObject';
import Svg from '@utils/svg';
import {
  copyGameCode,
  redirectToLobby,
  toggleReady,
  changeNickname,
} from './events';

const renderWaitingRoom = (roomID = '') => {
  const Header = new GameObject();
  Header.addClass('waiting-header');
  Header.attachToRoot();

  const NicknameHelpText = new TextObject();
  NicknameHelpText.setContent('게임에 참여할 닉네임을 정해주세요');
  NicknameHelpText.addClass('waiting-nickname-help');
  NicknameHelpText.attachToObject(Header);

  const InputWrapper = new GameObject();
  InputWrapper.addClass('waiting-input-wrapper');
  InputWrapper.attachToObject(Header);

  const NicknameInput = new InputObject();
  NicknameInput.addClass('waiting-nickname-input');
  NicknameInput.attachToObject(InputWrapper);

  const RefreshButton = new ButtonObject();
  RefreshButton.addClass('refresh-button');
  RefreshButton.attachToObject(InputWrapper);
  RefreshButton.addClickHandler(() => changeNickname(NicknameInput));

  const RefreshIcon = new SvgObject();
  RefreshIcon.setSvg(Svg.refresh);
  RefreshIcon.attachToObject(RefreshButton);

  const ActionWrapper = new GameObject();
  ActionWrapper.addClass('waiting-action-wrapper');
  ActionWrapper.attachToRoot();

  const ButtonReturnToLobby = new ButtonObject();
  ButtonReturnToLobby.setContent('로비로 돌아가기');
  ButtonReturnToLobby.addClass('button-cancel');
  ButtonReturnToLobby.attachToObject(ActionWrapper);
  ButtonReturnToLobby.addClickHandler(redirectToLobby);

  const ButtonReady = new ButtonObject();
  ButtonReady.setContent('준비 완료');
  ButtonReady.addClass('button-primary');
  ButtonReady.attachToObject(ActionWrapper);
  ButtonReady.instance.dataset.data = JSON.stringify({ isReady: false });
  ButtonReady.addClickHandler(toggleReady);

  const GameCodeWrapper = new ButtonObject();
  GameCodeWrapper.addClass('waiting-game-code-wrapper');
  GameCodeWrapper.attachToRoot();
  GameCodeWrapper.addClickHandler(copyGameCode);

  const GameCodeText = new TextObject();
  GameCodeText.setContent(roomID);
  GameCodeText.attachToObject(GameCodeWrapper);

  const GameCodeCopyButton = new GameObject();
  GameCodeCopyButton.addClass('waiting-code-icon');
  GameCodeCopyButton.attachToObject(GameCodeWrapper);

  const CopyIcon = new SvgObject();
  CopyIcon.setSvg(Svg.copy);
  CopyIcon.attachToObject(GameCodeCopyButton);

  const AllReadyText = new TextObject();
  AllReadyText.addClass('waiting-text-all-ready');
  AllReadyText.addClass('hide');
  AllReadyText.setContent('잠시 뒤 게임이 시작됩니다.');
  AllReadyText.attachToRoot();

  const removeArray = [Header, ActionWrapper, GameCodeWrapper, AllReadyText];

  return {
    removeArray,
    NicknameInput,
    AllReadyText,
  };
};

export default renderWaitingRoom;
