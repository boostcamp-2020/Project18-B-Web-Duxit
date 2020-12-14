import { PLAYER, CARD, TIME } from '@utils/number';
import GAME_STATE from '@utils/gameState';
import { emit } from '@socket';

function startDiscussionScene() {
  this.setState(GAME_STATE.DISCUSSION);
  setTimeout(() => {
    this.endDiscussionScene();
  }, TIME.DELAY_GET_ALL_DECISIONS + TIME.WAIT_DISCUSSION);
}

function emitDiscussionEnd(skipped) {
  emit({
    users: this.getUsers(),
    name: 'end discussion',
    params: {
      skipped,
      endTime: this.getEndTime(TIME.SKIP_DISCUSSION + TIME.WAIT_VOTE),
    },
  });
}

function endDiscussionScene(skipped) {
  if (this.getState() !== GAME_STATE.DISCUSSION) return;

  this.emitDiscussionEnd(skipped);
}

const methodGroup = {
  startDiscussionScene,
  emitDiscussionEnd,
  endDiscussionScene,
};

export default methodGroup;
