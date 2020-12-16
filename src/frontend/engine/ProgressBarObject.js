import { $create, $id } from '@utils/dom';
import TIME from '@type/time';
import GameObject from './GameObject';

const RED_COLOR = '#d82e21';
const YELLOW_COLOR = '#ffd600';
const GREEN_COLOR = '#3ed78d';

const ProgressBarObject = class extends GameObject {
  constructor() {
    super();
    this.timerStack = [];
    this.timeManagerStack = [];
  }

  setTime(endTime) {
    this.endTime = new Date(endTime).getTime();
    this.time = this.endTime - new Date().getTime();
  }

  setFinishCallBack(callback) {
    this.callback = callback;
  }

  clear() {
    if (this.callback) this.callback();
    while (this.timerStack.length > 0) {
      const timer = this.timerStack.pop();
      const timeManager = this.timeManagerStack.pop();
      clearInterval(timer);
      clearTimeout(timeManager);
    }
    const [progressBar] = this.getProgessBar();
    progressBar.style.width = '100%';
    progressBar.style.backgroundColor = GREEN_COLOR;
    this.addClass('hide');
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
    this.removeClass('hide');
    const [progressBar, timeText] = this.getProgessBar();
    const { endTime } = this;
    const timer = setInterval(() => {
      const remainTime = endTime - new Date().getTime();
      const widthSize = (remainTime / this.time) * 100;
      progressBar.style.width = `${widthSize}%`;
      if (widthSize < 30) progressBar.style.backgroundColor = RED_COLOR;
      else if (widthSize < 60) progressBar.style.backgroundColor = YELLOW_COLOR;
      timeText.innerText = (remainTime / 1000).toFixed(0);
    }, TIME.HALF_SECOND);

    const timeManager = setTimeout(() => {
      this.clear();
    }, this.time);

    this.timerStack.push(timer);
    this.timeManagerStack.push(timeManager);
  }

  remove() {
    $id('root').removeChild(this.instance);
  }
};

export default ProgressBarObject;
