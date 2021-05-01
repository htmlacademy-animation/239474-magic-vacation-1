export default class WordAnimation {
  constructor(node, container) {
    this._node = node;
    this._containerNode = container;
    this._element = document.querySelector(this._node);
    this._container = document.querySelector(this._containerNode);
    this.line = '';
  }

  init() {
    this.lineLetterSplitting();
  }

  lineLetterSplitting() {
      const clone = this._element.cloneNode(true);
      clone.style.width = clone.offsetWidth + 'px';
      clone.style.position = 'absolute';
      clone.style.left = '-100%';
      clone.innerHTML = 'clone';
      document.body.appendChild(clone);
      let cloneHeight = clone.offsetHeight;

      const content = this._element.innerHTML;
      clone.innerHTML = '';

      this.line += '<span>';
      for (let i = 0; i < content.length; i++) {
          const elem = content[i];
          clone.innerHTML += elem;

          if (clone.offsetHeight > cloneHeight) {
              cloneHeight = clone.offsetHeight;
              this.line += '</span><span>';
          }
          
          if (elem === " ") {
              this.line += `<span class="text-space">${elem}</span>`;
          } else {
              this.line += `<span>${elem}</span>`;
          }
      }
      this.line += '</span>';

      this._element.innerHTML = this.line;
      this._element.classList.add("word-animation");
      clone.remove();
  }

  run() {
    this._container.classList.add("active");
  }

  stop() {
    this._container.classList.remove("active");
  }
}
  