gsap.registerPlugin(ScrollTrigger,ScrollToPlugin,ScrollSmoother);

let smoother = ScrollSmoother.create({
  smooth: 1.3, 
  effects: true
});

ScrollTrigger.refresh();

function debounce(func, wait) {
  let timeout;
  return function() {
    const context = this, args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

window.addEventListener('resize', debounce(() => {
  ScrollTrigger.refresh();
}, 200));

window.addEventListener('load',function(){
  setTimeout(function(){
    document.querySelector('body').classList.remove("loading");
  }, 200);
});

function bodyFixPosition() {
  setTimeout( function() {
    if ( !document.body.hasAttribute('data-body-scroll-fix') ) {
      let scrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      document.body.setAttribute('data-body-scroll-fix', scrollPosition);
      document.body.style.overflow = 'hidden';
      document.body.style.position = 'fixed';
      document.body.style.top = '-' + scrollPosition + 'px';
      document.body.style.left = '0';
      document.body.style.width = '100%';
    }
  }, 15 );
}

function bodyUnfixPosition() {
  if ( document.body.hasAttribute('data-body-scroll-fix') ) {
    let scrollPosition = document.body.getAttribute('data-body-scroll-fix');
    document.body.removeAttribute('data-body-scroll-fix');
    document.body.style.overflow = '';
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.width = '';
    window.scroll(0, scrollPosition);
  }
}

const mediaWidth = window.matchMedia('(max-width: 900px)');
window.addEventListener('load',function(){
  setTimeout(function(){
    document.querySelector('body').classList.remove("loading");
  }, 200);
});

window.components = {};

window.components.faqTabs = function () {
  try {
    if (document.getElementsByClassName("js-faq-list").length) {
      let faqTab = Array.from(document.querySelectorAll(".js-faq-item .item-head"));
      faqTab.map((item) =>
        item.addEventListener("click", () => {
          closeAllAccordian(item);
        })
      ); 
      function closeAllAccordian(current_target) {
        console.log(current_target);
        faqTab.map((item) => {
          if (current_target !== item) {
            const accordianBody = item.nextElementSibling;
            const togglerBtn = item.lastElementChild;
            togglerBtn.classList.remove("active");
            accordianBody.classList.remove("active-body");
          } else {
            const accordianBody = current_target.nextElementSibling;
            const togglerBtn = item.lastElementChild;
            togglerBtn.classList.toggle("active");
            accordianBody.classList.toggle("active-body");
          }
        });
      }
    }
  } catch (error) {
    console.log("Error, at window.components.faqTabs", error.message);
  }
};

window.components.aboutMissionText = function () {
  try {
    const mediaWidth         = window.matchMedia('(min-width: 992px)');
    const aboutMissionFill   = document.querySelector(".about-mission-fill");
    const aboutMissionBorder = document.querySelector(".about-mission");
    const aboutMissionCurve  = document.querySelector(".about-mission-curve");
    const cardItems          = document.querySelector(".about-mission__card");

    if (mediaWidth.matches) {
      const master = gsap.timeline({
        scrollTrigger: {
          trigger: aboutMissionBorder,
          start: "top 22%",
          scrub: 1,
          end: "bottom 58%",
          pin: aboutMissionBorder,
          anticipatePin: 1,
        },
      });
      master.fromTo(aboutMissionCurve, 
        { y: 0 },
        { y: -250, ease: 'power1.out' },
        0
      );
      const textFill = gsap.timeline({
        scrollTrigger: {
          trigger: aboutMissionFill,
          start: "top 46%",
          scrub: 1,
          end: "bottom center",
          anticipatePin: 1,
        },
      });
      textFill.fromTo(aboutMissionFill, 
        { width: '0%' }, 
        { width: '100%', ease: 'power1.out'},
        0
      );
      const cards = gsap.timeline({
        scrollTrigger: {
          trigger: aboutMissionFill,
          start: "top 23%",
          scrub: 1,
          end: "bottom center",
          anticipatePin: 1,
        },
      });
      cards.fromTo(cardItems, 
          { y: 0 },
          { y: '-1250', ease: 'power1.out'},
          0
      );
    }

  } catch (error) {
    console.log("Error, at window.components.aboutMissionText", error.message);
  }
};

window.components.runYear = function () {
  try {
    const mediaWidth        = window.matchMedia('(min-width: 992px)');
    const runYearTrigger    = document.querySelector(".js-year-move");
    const runYearEndTrigger = document.querySelector(".js-target-element");

    if (mediaWidth.matches) {
      const circleRun = gsap.timeline({
        scrollTrigger: {
          trigger: runYearTrigger,
          start: "top center",
          end: "top center",
          endTrigger: runYearEndTrigger,
          scrub: true,
          pin: runYearTrigger,
        }
      });
    }

  } catch (error) {
    console.log("Error, at window.components.aboutMissionText", error.message);
  }
};

window.components.principlesBlock = function () {
  try {
    const mediaWidth  = window.matchMedia('(min-width: 992px)');
    const cards       = gsap.utils.toArray(".block-service__item");
    const screenWidth = window.innerWidth;
    const minSpacer   = 5;
    const maxSpacer   = 114;
    const easedSpacer = gsap.utils.interpolate(minSpacer, maxSpacer, gsap.utils.clamp(0, 1, screenWidth / 1800));
    
    if (mediaWidth.matches) {
      cards.forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card,
          start: () => {
            return `top-=${index * easedSpacer} top+=10px`;
          },
          endTrigger: ".block-service",
          end: () => {
            return `bottom top+=${310 + cards.length * easedSpacer}`;
          },
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });
      });
      ScrollTrigger.create({
        trigger: ".principles-content__text",
        start: "top 10",
        end: (self) => self.previous().end,
        pin: true,
      });
    }
  } catch (error) {
    console.log("Error, at window.components.principlesBlock", error.message);
  }
};

window.components.programsCard = function () {
  try {
    const mediaWidth  = window.matchMedia('(min-width: 992px)');
    const cards       = gsap.utils.toArray(".programs-cards .card-item");
    const screenWidth = window.innerWidth;
    const minSpacer   = 5;
    const maxSpacer   = 114;
    const easedSpacer = gsap.utils.interpolate(minSpacer, maxSpacer, gsap.utils.clamp(0, 1, screenWidth / 1800));
    
    if (mediaWidth.matches) {
      cards.forEach((card, index) => {
        ScrollTrigger.create({
          trigger: card,
          start: () => {
            return `top-=${index * easedSpacer} top+=10px`;
          },
          endTrigger: ".programs-cards__wrap",
          end: () => {
            return `bottom top+=${370 + cards.length * easedSpacer}`;
          },
          pin: true,
          pinSpacing: false,
          invalidateOnRefresh: true,
        });
      });
    }
  } catch (error) {
    console.log("Error, at window.components.programsCard", error.message);
  }
};

const initMenu = () => {
  try {

    const menu = document.getElementById("menu");
    if (menu === undefined) return;

    const menuTrigger = document.querySelector(".js-open-menu");
    const menuBtnMobile = document.querySelector('.js-submenu-open');
    const menuSub = document.querySelector('.js-menu-product');
    const menuSubClose = document.querySelector('.js-submenu-close');
    
    menuTrigger.onclick = function () {
      if (this.classList.contains("active")) {
        this.classList.remove("active");
        menu.classList.remove("active");
        menuSub.classList.remove("active");
        bodyUnfixPosition();
      } else {
        this.classList.add("active");
        menu.classList.add("active");
        bodyFixPosition();
      }
    };
  
    const mobWidth = window.matchMedia("(max-width: 991px)");

    if (mobWidth.matches) {
      menuBtnMobile.onclick = function() {
        menuSub.classList.add('active');
      }
      menuSubClose.onclick = function() {
        menuSub.classList.remove('active');
      }
    }

  } catch (err) {
    console.log("### Error at initMenu ###");
    console.log(err.message);
    console.log("#########################");
  }

};

const initAnchorLinks = () => {
  try {
    document.querySelectorAll('a[href*="#"]').forEach((link) => {
      link.addEventListener("click", function (e) {
        const href = this.getAttribute("href");
        const baseUrl = href.split('#')[0];
        const anchor = href.includes('#') ? href.substring(href.indexOf('#')) : '';
        if (baseUrl && baseUrl !== window.location.pathname) {
          localStorage.setItem('scrollToAnchor', anchor);
        } else if (anchor) {
          e.preventDefault();
          const target = document.querySelector(anchor);
          if (target) {
            bodyUnfixPosition();
            gsap.to(window, {
              duration: .2,
              scrollTo: {
                y: target,
                offsetY: 70,
              },
              ease: "power2.inOut",
            });
          }
        }
      });
    });
  } catch (error) {
    console.log("Error at window.components.initAnchorLinks:", error.message);
  }
};

const footerMobileMenu = () => {
  const footermenuTrigger = document.querySelectorAll(".list-header");

  footermenuTrigger.forEach((element) => {
    element.addEventListener("click", () => {
      element.classList.toggle('active');
    });
  })

}

window.addEventListener('scroll', function() {

  let buttonUp = document.querySelectorAll('.js-btn-up');

  buttonUp.forEach((element) => {
    if (window.pageYOffset > 200) {
      element.style.opacity = 1;
    } else {
      element.style.opacity = 0;
    }
  })
  
});

document.addEventListener('DOMContentLoaded', initMenu);
document.addEventListener('DOMContentLoaded', footerMobileMenu);
