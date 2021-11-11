export default class Timer {
  constructor(node, start, end, duration, delay) {
    this._node = node;
    this._element = document.querySelector(this._node);

    this.animation = null;
    this.start = 0;
    this.end = end;
    this.duration = duration;
    this.framesPerSec = 12;
    this.delay = delay;

    this.initialValues = start;
  }

  init() {
    setTimeout(() => {
      this._element.innerHTML = this.initialValues;
      this.start = performance.now();
      this.animate();
    }, this.delay);
  }

  animate() {
    return requestAnimationFrame(this.tick.bind(this));
  }

  clear() {
    cancelAnimationFrame(this.animation);
  }

  tick() {
    this.animation = this.animate();
    const current = performance.now();
    const currentTickTime = current - this.start;

    if (currentTickTime > this.duration) {
      this.clear();
      return;
    }

    const currentFrame =
      Math.floor((currentTickTime / this.duration) * this.framesPerSec) + 1;

    if (currentFrame === this.renderedSeconds) {
      return;
    }

    this.renderedSeconds = currentFrame;

    // distribute 7 numbers evenly by 12 frames
    const renderNumber = Math.floor(
      (currentFrame / this.framesPerSec) * this.end,
    );

    this._element.innerHTML = renderNumber;
  }
}
