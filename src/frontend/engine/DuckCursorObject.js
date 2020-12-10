import socket from '@utils/socket';
import { $id } from '@utils/dom';
import TIME from '@type/time';
import DuckObejct from './DuckObject';

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
  constructor({ isReady, ...props }) {
    super(props);
    this.addClass('cursor-duck-wrapper');
    this.setOriginCenter();
    this.move(Math.random() * 50 + 25, Math.random() * 50 + 25, 0);
    this.attachToRoot();
    this.throttling = false;
    this.lastPosition = null;
    this.mouseHandler = this.makeFollowMouse.bind(this);
    this.width = 100;
    this.render();
    this.setVisibility(isReady);
  }

  addMouseMoveEvent() {
    $id('root').addEventListener('mousemove', this.mouseHandler);
  }

  removeMouseMoveEvent() {
    $id('root').removeEventListener('mousemove', this.mouseHandler);
  }

  makeFollowMouse(event) {
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
    }, TIME.DUCK_THROTTLE);
  }

  moveToMouse(position) {
    const { x, y } = position;
    this.move(x, y, TIME.DUCK_SPEED);

    socket.emit('send duck move', { x, y });
  }

  setVisibility(value = false, isCurrentPlayer = false) {
    const displayStyle = value ? 'block' : 'none';
    this.instance.style.display = displayStyle;

    if (isCurrentPlayer) this.setMouseEvent(value);
  }

  setMouseEvent(value = true) {
    if (value) this.addMouseMoveEvent();
    else this.removeMouseMoveEvent();
  }
}

export default DuckCursorObject;
