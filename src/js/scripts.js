import * as azFunctions from "./modules/functions.js";
azFunctions.isWebp();

const heroSwiper = new Swiper('.hero-swiper', {
  // loop: true,
  // direction: "vertical",
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  keyboard: {
    enabled: true,
    onlyInViewport: true,
    pageUpDown: true
  },
  mousewheel: {
    sensitivity: 1,
    eventsTarget: ".hero-swiper"
  }
});