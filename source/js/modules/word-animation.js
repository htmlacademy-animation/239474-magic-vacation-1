export default class WordAnimation {
  constructor(node, container) {
    this._node = node;
    this._containerNode = container;
    this._element = document.querySelector(this._node);
    this._container = document.querySelector(this._containerNode);
    this.line = '';
    this.time = 1000;
  }

  init() {
    this.lineLetterSplitting();
  }

  createClone() {
    const clone = this._element.cloneNode(true);
    clone.style.width = clone.offsetWidth + 'px';
    clone.style.position = 'absolute';
    clone.style.left = '-100%';
    clone.innerHTML = 'Clone';
    document.body.appendChild(clone);

    return clone;
  }

  random(min, max) {
    const number = 25;
    const random = Math.floor(Math.random() * (max - min) + min);
    return Math.floor(random / number) * number;
  }

  lineLetterSplitting() {
    const clone = this.createClone();
    let cloneHeight = clone.offsetHeight;

    const content = this._element.innerHTML;
    clone.innerHTML = '';

    let nextLineDelay = 0;

    this.line += '<span>';
    for (let i = 0; i < content.length; i++) {
      const elem = content[i];
      clone.innerHTML += elem;

      if (clone.offsetHeight > cloneHeight) {
        nextLineDelay += this.time / 2;
        cloneHeight = clone.offsetHeight;
        this.line += '</span><span>';
      }

      if (elem === " ") {
        this.line += `<span class="text-space">${elem}</span>`;
      } else {
        const randomDelay = this.random(0, 250) + nextLineDelay;
        let delay = randomDelay;

        if (randomDelay >= 500) {
          delay = randomDelay - 250;
        }
        
        const duration = this.time / 2 - delay + nextLineDelay;
        this.line += `<span style="transition-delay: ${delay}ms; transition-duration: ${duration}ms;">${elem}</span>`;
      }
    }
    this.line += '</span>';

    this._element.innerHTML = this.line;
    this._element.classList.add("word-animation");
    clone.remove();
  }
}
  