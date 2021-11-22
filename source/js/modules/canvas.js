class Element {
  constructor(image, x, y, width, height) {
    this.image = image;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.image = new Image();
  }
}

export default class IceWhaleAnimation {
  constructor() {
    this._canvas = document.getElementById('result-canvas');
    this.ctx = this._canvas.getContext(`2d`);
    this.width = 600;
    this.height = 337;

    this._canvas.width = this.width;
    this._canvas.height = this.height;

    this.animation = null;
    this.start = 0;
    this.loadingCounter = 0;
    this.opacity = 0;

    this.diff = {
      x: this.width / 2,
      y: this.height / 2,
    };

    this.ice = new Element();
    this.whale = new Element();
    this.back = new Element();
    this.snowflake = new Element();
    this.snowflakeSm = new Element();
    this.tree = new Element();
    this.treeLarge = new Element();
    this.plane = new Element();

    this.ice.width = this.width * 0.5;
    this.ice.height = this.height * 0.4;
    this.ice.x = (this.width - this.ice.width) / 2 - this.diff.x;
    this.ice.y = (this.height - this.ice.height) * 0.9 - this.diff.y;

    this.whale.width = this.width * 0.6;
    this.whale.height = this.height * 0.9;
    this.whale.x = (this.width - this.whale.width) / 2 - this.diff.x;
    this.whale.y = this.ice.height * 0.3 - this.diff.y;

    this.snowflake.width = this.width * 0.3;
    this.snowflake.height = this.height * 0.4;
    this.snowflake.x = (this.width - this.snowflake.width) * 0.1 - this.diff.x;
    this.snowflake.y =
      (this.height - this.snowflake.height) / 1.5 - this.diff.y;

    this.snowflakeSm.width = this.width * 0.2;
    this.snowflakeSm.height = this.height * 0.3;
    this.snowflakeSm.x =
      (this.width - this.snowflakeSm.width) * 0.9 - this.diff.x;
    this.snowflakeSm.y =
      (this.height - this.snowflakeSm.height) * 0.9 - this.diff.y;

    this.plane.width = this.width * 0.2;
    this.plane.height = this.height * 0.2;
    this.plane.x = 100 - this.diff.x;
    this.plane.y = 50 - this.diff.y;

    this.ice.image.onload = () => {
      this.increaseLoadingCounter();
    };

    this.whale.image.onload = () => {
      this.increaseLoadingCounter();
    };

    this.snowflake.image.onload = () => {
      this.increaseLoadingCounter();
    };

    this.snowflakeSm.image.onload = () => {
      this.increaseLoadingCounter();
    };

    this.tree.image.onload = () => {
      this.increaseLoadingCounter();
    };

    this.treeLarge.image.onload = () => {
      this.increaseLoadingCounter();
    };

    this.plane.image.onload = () => {
      this.increaseLoadingCounter();
    };

    this.loadImages();
  }

  increaseLoadingCounter() {
    this.loadingCounter++;

    if (this.loadingCounter === 7) {
      this.draw();
    }
  }

  loadImages() {
    this.ice.image.src = `/img/module-4/win-primary-images/ice.png`;
    this.whale.image.src = `/img/module-4/win-primary-images/sea-calf-2.png`;
    this.snowflake.image.src = `/img/module-4/win-primary-images/snowflake.png`;
    this.snowflakeSm.image.src = `/img/module-4/win-primary-images/snowflake.png`;
    this.tree.image.src = `/img/module-4/win-primary-images/tree.png`;
    this.treeLarge.image.src = `/img/module-4/win-primary-images/tree 2.png`;
    this.plane.image.src = `/img/module-4/win-primary-images/airplane.png`;
  }

  init() {
    this.start = performance.now();
    this.animate();
  }

  animate() {
    return requestAnimationFrame(this.tick.bind(this));
  }

  clear() {
    cancelAnimationFrame(this.animation);
  }

  drawElement(element) {
    this.ctx.drawImage(
      element.image,
      element.x,
      element.y,
      element.width,
      element.height,
    );
  }

  drawPlane(currentTickTime) {
    this.ctx.save();
    this.ctx.globalAlpha = this.opacity;
    const currentTickOpacity = currentTickTime / 1000;

    if (currentTickTime < 1000) {
      this.opacity = currentTickOpacity;
    }

    this.ctx.fillStyle = `#acc3ff`;

    const currentTickAngle = (currentTickTime / 4000) * Math.PI * 2;

    this.ctx.beginPath();
    this.ctx.arc(
      this.diff.x,
      this.diff.y * this.opacity,
      100 * this.opacity,
      Math.PI / 2,
      (Math.PI * 3) / 2,
    );
    // this.ctx.bezierCurveTo();
    this.ctx.fill();

    this.drawElement(this.plane);
    this.ctx.restore();
  }

  drawTrees(currentTickTime) {
    this.ctx.save();

    if (currentTickTime < 1500) {
      return;
    }

    this.opacity = 1;

    this.tree.width = this.width * 0.05;
    this.tree.height = this.height * 0.25;
    this.tree.x = (this.width - this.tree.width) * 0.7;
    this.tree.y = this.back.height - this.tree.height;

    this.treeLarge.width = this.width * 0.05;
    this.treeLarge.height = this.height * 0.35;
    this.treeLarge.x = this.tree.x - this.treeLarge.width;
    this.treeLarge.y = this.back.height - this.treeLarge.height;

    this.drawElement(this.tree);
    this.drawElement(this.treeLarge);

    this.ctx.restore();
  }

  drawIce(currentTickTime) {
    this.ctx.save();
    const currentTickAngle = (currentTickTime / 4000) * Math.PI * 2;
    const angle = Math.sin(currentTickAngle * 2) / 20;
    const pathVertical = Math.cos(currentTickAngle * 2) * 10;

    this.ctx.translate(this.diff.x, this.diff.y + pathVertical);
    this.ctx.rotate(angle);

    this.drawElement(this.ice);
    this.drawElement(this.whale);

    this.ctx.restore();
  }

  drawSnowflake(currentTickTime, obj) {
    this.ctx.save();
    this.ctx.globalAlpha = this.opacity;
    const currentTickOpacity = currentTickTime / 2000;

    if (currentTickTime < 2000) {
      this.opacity = currentTickOpacity;
    }

    const currentTickAngle = (currentTickTime / 5000) * Math.PI * 2;
    const path = Math.sin(1.5 * currentTickAngle) * 10;

    this.ctx.translate(this.diff.x, this.diff.y + path);

    this.drawElement(obj);
    this.ctx.restore();
  }

  draw(currentTickTime) {
    this.ctx.clearRect(0, 0, this.width, this.height);
    this.ctx.save();

    // this.drawPlane(currentTickTime);
    this.drawTrees(currentTickTime);
    this.drawIce(currentTickTime);
    this.drawSnowflake(currentTickTime, this.snowflake);
    this.drawSnowflake(currentTickTime, this.snowflakeSm);

    this.ctx.restore();
  }

  tick() {
    this.animation = this.animate();
    const current = performance.now();
    const currentTickTime = current - this.start;

    if (currentTickTime > 10000) {
      this.clear();
      return;
    }

    this.draw(currentTickTime);
  }
}
