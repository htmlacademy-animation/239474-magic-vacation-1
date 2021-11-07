export default class Timer {
  constructor(node, minutes, seconds) {
    this._node = node;
    this._element = document.querySelector(this._node);
    this.animation;
    this.start;

    this.minutes = minutes;
    this.seconds = seconds;
    this.secInMin = 60;
    this.msInSec = 1000;
    this.end = this.minutes * this.secInMin * this.msInSec;

    this.initialValues = `${this.renderTime(this.minutes)}:${this.renderTime(
      this.seconds
    )}`;
    this._element.innerHTML = this.initialValues;
  }

  init() {
    setTimeout(() => {
      this.start = new Date().getTime();
      this.animate();
    }, 1000);
  }

  animate() {
    requestAnimationFrame(this.tick.bind(this));
  }

  clear() {
    cancelAnimationFrame(this.animation);
  }

  renderTime(time) {
    return time < 10 ? `0${time}` : time;
  }

  calcTime(step) {
    const secInStep = step / this.msInSec;
    const minutes = Math.floor(secInStep / this.secInMin);
    const seconds = Math.floor(secInStep - minutes * this.secInMin);

    return { minutes, seconds };
  }

  tick() {
    this.animation = this.animate();
    const current = new Date().getTime();
    const step = current - this.start;

    if (step > this.end) {
      this.clear();
    }

    const reverseStep = this.end - step;
    const { minutes, seconds } = this.calcTime(reverseStep);
    const renderMinutes = this.renderTime(minutes);
    const renderSeconds = this.renderTime(seconds);

    const time = `${renderMinutes}:${renderSeconds}`;
    this._element.innerHTML = time;
  }
}
