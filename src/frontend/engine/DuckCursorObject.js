import { Duck, DuckHat } from '@utils/duck';
import socket from '@utils/socket';
import { $id } from '@utils/dom';
import DuckObejct from './DuckObject';

class DuckCursorObject extends DuckObejct {
  constructor(props) {
    super(props);
    this.addClass('cursor-duck-wrapper');
    this.setInnerHTML(Duck({ color: this.color, width: 100 }));
    this.setOriginCenter();
    this.move(Math.random() * 50 + 25, Math.random() * 50 + 25, 0);
    this.attachToRoot();
    $id('root').addEventListener('click', this.mouseMoveEvent);
  }

  mouseMoveEvent(event) {
    const { clientX: cursorX, clientY: cursorY, target, currentTarget } = event;
    if (target !== currentTarget) return;
    const {
      x: rootX,
      y: rootY,
      width,
      height,
    } = currentTarget.getBoundingClientRect();
    const x = ((cursorX - rootX) / width) * 100;
    const y = ((cursorY - rootY) / height) * 100;
    this.move(x, y);

    // 오리정보를 서버에 넘긴다면 여기서
    socket.emit('send duck move', { x, y });
  }
}

export default DuckCursorObject;
