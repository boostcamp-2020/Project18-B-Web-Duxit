import { $create, $id } from '@utils/dom';
import TIME from '@utils/time';
import GameObject from './GameObject';

const ProgressBarObject = class extends GameObject {
  setTime(time) {
    this.time = time;
  }

  setFinishCallBack(callback) {
    this.callback = callback;
  }

  finish() {
    if (this.callback) this.callback();
    this.remove();
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
    const startTime = new Date().getTime();
    const targetTime = startTime + this.time;

    const progressBarTimer = setInterval(() => {
      const remainTime = targetTime - new Date().getTime();
      const widthSize = (remainTime / this.time) * 100;
      progressBar.style.width = `${widthSize}%`;
      timeText.innerText = (remainTime / 1000).toFixed(0);
    }, TIME.HALF_SECOND);

    const intervalManager = setTimeout(() => {
      clearInterval(progressBarTimer);
      clearTimeout(intervalManager);
      this.finish();
    }, this.time);
  }

  remove() {
    $id('root').removeChild(this.instance);
  }
};

export default ProgressBarObject;
