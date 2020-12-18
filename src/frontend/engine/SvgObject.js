import { $create } from '@utils/dom';
import GameObject from './GameObject';

const SvgObject = class extends GameObject {
  setSvg(svgText) {
    const wrapper = $create('div');
    wrapper.innerHTML = svgText;
    this.instance = wrapper.firstChild;
  }
};

export default SvgObject;
