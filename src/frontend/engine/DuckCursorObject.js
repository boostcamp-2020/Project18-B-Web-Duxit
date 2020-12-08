import { Duck, DuckHat } from '@utils/duck';
import socket from '@utils/socket';
import { $id } from '@utils/dom';
import DuckObejct from './DuckObject';

const THROTTLE_TIME = 100;
const MOVE_SPEED = 1000;

const calcPosition = (event) => {
  const { clientX: cursorX, clientY: cursorY, currentTarget } = event;
  const {
    x: rootX,
    y: rootY,
    width,
    height,
  } = currentTarget.getBoundingClientRect();
  const x = ((cursorX - rootX) / width) * 100;
  const y = ((cursorY - rootY) / height) * 100;

  return { x, y };
};

class DuckCursorObject extends DuckObejct {
  constructor(props) {
    super(props);
    this.addClass('cursor-duck-wrapper');
    this.setInnerHTML(Duck({ color: this.color, width: 100 }));
    this.setOriginCenter();
    this.move(Math.random() * 50 + 25, Math.random() * 50 + 25, 0);
    this.attachToRoot();
    this.throttling = false;
    this.lastPosition = null;
  }

  makeFollowMouse() {
    $id('root').addEventListener('mousemove', (event) => {
      if (this.throttling) {
        this.lastPosition = calcPosition(event);
        return;
      }

      this.throttling = true;
      this.moveToMouse(calcPosition(event));
      setTimeout(() => {
        this.throttling = false;
        if (this.lastPosition) {
          this.moveToMouse(this.lastPosition);
          this.lastPosition = null;
        }
      }, THROTTLE_TIME);
    });
  }

  moveToMouse(position) {
    const { x, y } = position;
    this.move(x, y);

    socket.emit('send duck move', { x, y });
  }

  // Override
  move(x, y, moveSpeed = MOVE_SPEED) {
    super.move(x, y, moveSpeed);
  }
}

export default DuckCursorObject;
