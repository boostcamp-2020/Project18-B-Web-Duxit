import { $create, $id } from '@utils/dom';
import TIME from '@utils/time';
import GameObject from './GameObject';

const ProgressBarObject = class extends GameObject {
  setTime(time) {
    this.time = time;
    this.remainTime = time;
  }

  setRemainTime(subtractTime) {
    this.remainTime -= subtractTime;
  }

  createElement() {
    const wrapper = $create('div');
    const progressBar = $create('div');
    const timeText = $create('span');

    this.setElement(wrapper);
    this.instance.appendChild(progressBar);
    progressBar.appendChild(timeText);

    wrapper.classList.add('progress-bar-wrapper');
    progressBar.classList.add('progress-bar');
    timeText.classList.add('time-text');
  }

  getProgessBar() {
    const progressBar = this.instance.children.item(0);
    const timeText = progressBar.children.item(0);
    return [progressBar, timeText];
  }

  start() {
    const [progressBar, timeText] = this.getProgessBar();

    const progressBarTimer = setInterval(() => {
      this.setRemainTime(TIME.HALF_SECOND);
      const widthSize = (this.remainTime / this.time).toFixed(3) * 100;
      progressBar.style.width = `${widthSize}%`;
      timeText.innerText = (this.remainTime / 1000).toFixed(0);
    }, TIME.HALF_SECOND);

    setTimeout(() => {
      clearInterval(progressBarTimer);
    }, this.time);
  }

  remove() {
    $id('root').removeChild(this.instance);
  }
};

export default ProgressBarObject;
