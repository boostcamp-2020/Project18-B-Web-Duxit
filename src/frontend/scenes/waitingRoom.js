import './waitingRoom.scss';
import ButtonObject from '../engine/ButtonObject';
import GameObject from '../engine/GameObject';
import TextObject from '../engine/TextObject';
import InputObject from '../engine/InputObject';
import SvgObject from '../engine/SvgObject';
import Svg from '../utils/svg';

const waitingRoom = (roomCode = '') => {
  const Header = new GameObject();
  Header.toggleClass('waiting-header');
  Header.attachToRoot();

  const NicknameHelpText = new TextObject();
  NicknameHelpText.setContent('게임에 참여할 닉네임을 정해주세요');
  NicknameHelpText.setClass('waiting-nickname-help');
  NicknameHelpText.attachToObject(Header);

  const InputWrapper = new GameObject();
  InputWrapper.toggleClass('waiting-input-wrapper');
  InputWrapper.attachToObject(Header);

  const NicknameInput = new InputObject();
  NicknameInput.toggleClass('waiting-nickname-input');
  NicknameInput.attachToObject(InputWrapper);

  const RefreshButton = new ButtonObject();
  RefreshButton.setClass('refresh-button');
  RefreshButton.attachToObject(InputWrapper);

  const RefreshIcon = new SvgObject();
  RefreshIcon.setInnerHtml(Svg.refresh);
  RefreshIcon.attachToObject(RefreshButton);

  const ActionWrapper = new GameObject();
  ActionWrapper.toggleClass('waiting-action-wrapper');
  ActionWrapper.attachToRoot();

  const ButtonReturnToLobby = new ButtonObject();
  ButtonReturnToLobby.setContent('로비로 돌아가기');
  ButtonReturnToLobby.setClass('button-cancel');
  ButtonReturnToLobby.attachToObject(ActionWrapper);

  const ButtonReady = new ButtonObject();
  ButtonReady.setContent('준비 완료');
  ButtonReady.setClass('button-primary');
  ButtonReady.attachToObject(ActionWrapper);

  const GameCodeWrapper = new ButtonObject();
  GameCodeWrapper.setClass('waiting-game-code-wrapper');
  GameCodeWrapper.attachToRoot();

  const GameCodeText = new TextObject();
  GameCodeText.setContent(`#${roomCode}`);
  GameCodeText.attachToObject(GameCodeWrapper);

  const GameCodeCopyButton = new GameObject();
  GameCodeCopyButton.setClass('waiting-code-icon');
  GameCodeCopyButton.attachToObject(GameCodeWrapper);

  const CopyIcon = new SvgObject();
  CopyIcon.setInnerHtml(Svg.copy);
  CopyIcon.attachToObject(GameCodeCopyButton);
};

export default waitingRoom;
