document.addEventListener('DOMContentLoaded', function () {
  const main = new Main();
});

class Main {
  constructor() {
    this.header = document.querySelector('.header');
    this._observers = [];
    this._init();
  }

  _init() {
    new MobileMenu();
    this.hero = new HeroSlider('.swiper-container');
    this._scrollInit();
  }

  _navAnimation(el, inview) {
    if (inview) {
      this.header.classList.remove('triggerd');
    } else {
      this.header.classList.add('triggerd');
    }
  }

  _inviewAnimation(el, inview) {
    if (inview) {
      el.classList.add('inview');
    } else {
      el.classList.remove('inview');
    }
  }

  _textAnimation(el, isIntersecting) {
    if (isIntersecting) {
      const ta = new TweenTextAnimation(el);
      ta.animate();
    }
  }

  _toggleSlideAnimation(el, inview) {
    if (inview) {
      this.hero.start();
    } else {
      this.hero.stop();
    }
  }

  _scrollInit() {
    this._observers.push(
      new ScrollObserver('.nav-trigger', this._navAnimation.bind(this), {
        once: false,
      })
    );

    this._observers.push(
      new ScrollObserver('.cover-slide', this._inviewAnimation)
    );

    this._observers.push(
      new ScrollObserver('.tween-animate-title', this._textAnimation)
    );

    this._observers.push(
      new ScrollObserver(
        '.swiper-container',
        this._toggleSlideAnimation.bind(this),
        { once: false }
      )
    );
  }
}
