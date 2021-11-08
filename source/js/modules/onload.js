export default () => {
  window.addEventListener(`load`, () => {
    document.body.classList.remove(`no-animation`);
    document.body.classList.add(`animation`);
  });
};
