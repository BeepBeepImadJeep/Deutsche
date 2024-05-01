const initBannerSlider = () => {
  let bannerSlider = new Swiper(".js-banner-slider", {
    slidesPerView: "auto",
    spaceBetween: 0,
    freeMode: true,
    speed: 3000,
    autoHeight: true,
    slideClass: "item",
  });
}

const initMainScripts = () => {
  initBannerSlider();
};

document.addEventListener('DOMContentLoaded', initMainScripts,);