document.addEventListener('DOMContentLoaded', function () {
  const main = new Main();
});

class Main {
  constructor() {
    this.header = document.querySelector('.header');
    this._observers = [];
    this._init();
  }

  set observers(val) {
    this._observers.push(val);
  }

  get observers() {
    return this._observers;
  }

  _init() {
    new MobileMenu();
    this.hero = new HeroSlider('.swiper-container');
    Pace.on('done', this._paceDone.bind(this));
  }
  _paceDone() {
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
    this.observers = new ScrollObserver(
      '.nav-trigger',
      this._navAnimation.bind(this),
      {
        once: false,
      }
    );

    this.observers = new ScrollObserver('.cover-slide', this._inviewAnimation);

    this.observers = new ScrollObserver(
      '.tween-animate-title',
      this._textAnimation
    );

    this.observers = new ScrollObserver(
      '.swiper-container',
      this._toggleSlideAnimation.bind(this),
      { once: false }
    );
  }
}
