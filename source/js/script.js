// modules
import mobileHeight from './modules/mobile-height-adjust.js';
import slider from './modules/slider.js';
import menu from './modules/menu.js';
import footer from './modules/footer.js';
import chat from './modules/chat.js';
import result from './modules/result.js';
import form from './modules/form.js';
import social from './modules/social.js';
import FullPageScroll from './modules/full-page-scroll';
import onload from './modules/onload';
import WordAnimation from "./modules/word-animation";

// init modules
mobileHeight();
slider();
menu();
footer();
chat();
result();
form();
social();
onload();

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();

const wordAnimation = new WordAnimation(".intro__title", ".screen--intro");
wordAnimation.init();

const wordAnimation2 = new WordAnimation(".intro__date", ".screen--intro");
setTimeout(() => {
  wordAnimation2.init();
}, 1000);

const wordAnimation3 = new WordAnimation(".slider__item-title", ".screen--story");
wordAnimation3.init();

const wordAnimation4 = new WordAnimation(".prizes__title", ".screen--prizes");
wordAnimation4.init();