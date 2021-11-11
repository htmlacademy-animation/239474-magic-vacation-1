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
import WordAnimation from './modules/word-animation';
import pathAnimation from './modules/svg';
import Timer from './modules/timer';
import Prize from './modules/prizes';

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

pathAnimation(`.animate-victory`);
pathAnimation(`.animate-loss`);

const fullPageScroll = new FullPageScroll();
fullPageScroll.init();

const wordAnimation = new WordAnimation(`.intro__title`);
wordAnimation.init();

const wordAnimation2 = new WordAnimation(`.intro__date`);
setTimeout(() => {
  wordAnimation2.init();
}, 1000);

const wordAnimation3 = new WordAnimation(`.slider__item-title`);
wordAnimation3.init();

const wordAnimation4 = new WordAnimation(`.prizes__title`);
wordAnimation4.init();

// Timer animation

const timer = new Timer(`.game__counter`, 5, 0);
timer.init();

// Prizes animation

const prize = new Prize(`.prizes__number-cases`, 0, 7, 1000, 7600);
prize.init();

const codes = new Prize(`.prizes__number-codes`, 11, 900, 1000, 10000);
codes.init();
