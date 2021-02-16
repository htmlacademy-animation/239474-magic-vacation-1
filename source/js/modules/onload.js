export default () => {
  window.addEventListener('load', (e) => {
    document.body.classList.remove("no-animation");
    document.body.classList.add("animation");
  });
};