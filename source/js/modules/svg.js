export default (container) => {
  const animationPaths = document.querySelectorAll(`${container} path`);

  if (!animationPaths || !animationPaths.length) {
    return;
  }

  const animatePath = (path) => {
    if (!path) {
      return;
    }

    const letterLength = Math.floor(path.getTotalLength());
    path.style.strokeDasharray = letterLength;
    path.style.strokeDashoffset = letterLength;
  };

  animationPaths.forEach((path) => {
    animatePath(path);
  });
};
