import { Duck, DuckHat, DuckCrown } from '@utils/duck';
import GameObject from './GameObject';

class DuckObject extends GameObject {
  constructor({ color = '#555', width = 100, ...rest } = {}) {
    super(rest);
    this.color = color;
    this.width = width;
    this.render();
  }

  setColor(color) {
    this.color = color;
    this.render();
  }

  setHat(boolean) {
    const hatElement = this.getChildrenNode('[data-hat="teller"]');
    const display = boolean ? 'block' : 'none';
    hatElement.style.display = display;
  }

  setCrown(boolean) {
    const crownElement = this.getChildrenNode('[data-hat="crown"]');
    const display = boolean ? 'block' : 'none';
    crownElement.style.display = display;
  }

  generateDuckHTML() {
    const { color, width } = this;
    return `
      <div class="duck-container">
        ${DuckHat({ width: (width / 11) * 9 })}
        ${DuckCrown({ width: (width / 11) * 9 })}
        ${Duck({ color, width })}
      </div>
    `;
  }

  getChildrenNode(className) {
    const { instance } = this;
    return instance.querySelector(className);
  }

  render() {
    const duckHTML = this.generateDuckHTML();
    this.setInnerHTML(duckHTML);
  }
}

export default DuckObject;
