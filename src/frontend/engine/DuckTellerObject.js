import { Duck, DuckHat } from '@utils/duck';
import DuckObejct from './DuckObject';

class DuckTellerObject extends DuckObejct {
  constructor(props) {
    super(props);
    this.addClass('teller-duck-wrapper');
    this.setInnerHTML(this.getComponent());
    this.setHat(true);
  }

  getComponent() {
    const { color } = this;
    const option = { color, width: 200 };
    return `
      <div class="duck-image">
        ${DuckHat({ width: 45 })}
        ${Duck(option)}
      </div>
    `;
  }
}

export default DuckTellerObject;
