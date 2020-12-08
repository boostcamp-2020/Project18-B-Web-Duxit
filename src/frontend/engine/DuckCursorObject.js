import { Duck, DuckHat } from '@utils/duck';
import DuckObejct from './DuckObject';

class DuckCursorObject extends DuckObejct {
  constructor(props) {
    super(props);
    this.addClass('cursor-duck-wrapper');
    this.setInnerHTML(Duck({ color: this.color, width: 100 }));
    this.setOriginCenter();
    this.move(Math.random() * 50 + 25, Math.random() * 50 + 25, 0);
    this.attachToRoot();
  }
}

export default DuckCursorObject;
