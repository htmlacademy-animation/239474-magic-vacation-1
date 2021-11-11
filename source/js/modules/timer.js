export default class Timer {
  constructor(node, minutes, seconds) {
    this._node = node;
    this._element = document.querySelector(this._node);
    this.animation = null;
    this.start = 0;

    this.minutes = minutes;
    this.seconds = seconds;
    this.secInMin = 60;
    this.msInSec = 1000;
    this.end = this.minutes * this.secInMin * this.msInSec;

    this.initialValues = `${this.renderTime(this.minutes)}:${this.renderTime(
        this.seconds,
    )}`;
    this._element.innerHTML = this.initialValues;

    this.renderedSeconds = null;
  }

  init() {
    setTimeout(() => {
      this.start = performance.now();
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
    const currentFrame = Math.floor(step / this.msInSec);
    const minutes = Math.floor(currentFrame / this.secInMin);
    const seconds = Math.floor(currentFrame - minutes * this.secInMin);

    return {currentFrame, minutes, seconds};
  }

  tick() {
    this.animation = this.animate();
    const current = performance.now();
    const currentTickTime = current - this.start;

    if (currentTickTime > this.end) {
      this.clear();
      return;
    }

    const reverseTickTime = this.end - currentTickTime;
    const {currentFrame, minutes, seconds} = this.calcTime(reverseTickTime);

    if (currentFrame === this.renderedSeconds) {
      return;
    }

    this.renderedSeconds = currentFrame;
    const renderMinutes = this.renderTime(minutes);
    const renderSeconds = this.renderTime(seconds);

    const time = `${renderMinutes}:${renderSeconds}`;
    this._element.innerHTML = time;
  }
}
