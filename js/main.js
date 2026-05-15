/* ===========================
   HERO SLIDESHOW CON KEN BURNS
=========================== */
(function () {
  const slides = Array.from(document.querySelectorAll('.hero-slide'));
  const dots   = Array.from(document.querySelectorAll('.hero-dot'));
  if (!slides.length) return;

  let current  = 0;
  let timer    = null;
  const INTERVAL = 6000; // ms entre slides

  function restartKenBurns(slide) {
    const bg = slide.querySelector('.hero-slide__bg');
    if (!bg) return;
    bg.style.animationName = 'none';
    // Forzar reflow para reiniciar la animación CSS
    void bg.offsetHeight;
    bg.style.animationName = '';
  }

  function goTo(index) {
    slides[current].classList.remove('hero-slide--active');
    dots[current].classList.remove('hero-dot--active');

    current = (index + slides.length) % slides.length;

    slides[current].classList.add('hero-slide--active');
    dots[current].classList.add('hero-dot--active');
    restartKenBurns(slides[current]);
  }

  function startTimer() {
    clearInterval(timer);
    timer = setInterval(() => goTo(current + 1), INTERVAL);
  }

  // Activar primer slide con Ken Burns desde el inicio
  restartKenBurns(slides[0]);
  startTimer();

  // Dots clickeables
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      goTo(i);
      startTimer(); // reiniciar temporizador al hacer clic
    });
  });
})();

/* ===========================
   REVEAL ON SCROLL
=========================== */
(function () {
  'use strict';

  // Mapa de selectores → configuración de animación
  // type: '' (fade-up), 'from-left', 'from-right', 'scale'
  // delay: ms fijo de retraso
  // stagger: ms adicionales por índice dentro del mismo padre
  // auto: calcula dirección según contenedor padre
  var REVEAL_MAP = [
    { sel: '.intro-split__heading' },
    { sel: '.intro-split__body',    delay: 130 },
    { sel: '.intro-split__deco',    type: 'scale', delay: 230 },
    { sel: '.feature-modern__content', auto: 'content' },
    { sel: '.feature-modern__media',   auto: 'media'   },
    { sel: '.program-card',         type: 'scale', stagger: 75 },
    { sel: '.invite-modern__title' },
    { sel: '.invite-modern__action', delay: 180 },
    { sel: '.quote-modern__content' },
    { sel: '.newsletter-section__inner' },
    { sel: '.contact-info',         type: 'from-left'  },
    { sel: '.contact-form',         type: 'from-right' },
    { sel: '.contact-data__item',   stagger: 90 },
    { sel: '.legal-hero__inner' },
    { sel: '.legal-content__inner', delay: 80 },
    { sel: '.legal-nav',            delay: 160 },
  ];

  var tagged = new WeakSet();

  REVEAL_MAP.forEach(function (cfg) {
    document.querySelectorAll(cfg.sel).forEach(function (el) {
      if (tagged.has(el)) return;
      tagged.add(el);

      // Dirección automática para secciones feature
      var type = cfg.type || '';
      if (cfg.auto) {
        var isReverse = !!el.closest('.feature-modern__container--reverse');
        if (cfg.auto === 'content') type = isReverse ? 'from-right' : 'from-left';
        if (cfg.auto === 'media')   type = isReverse ? 'from-left'  : 'from-right';
      }

      el.setAttribute('data-reveal', type);

      // Stagger: calcula índice dentro del mismo padre
      var delayMs = cfg.delay || 0;
      if (cfg.stagger) {
        var parent = el.parentElement;
        var siblings = parent
          ? Array.from(parent.querySelectorAll(cfg.sel))
          : [el];
        var idx = siblings.indexOf(el);
        delayMs += idx * cfg.stagger;
      }
      if (delayMs) el.style.transitionDelay = delayMs + 'ms';
    });
  });

  var targets = document.querySelectorAll('[data-reveal]');
  if (!targets.length) return;

  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-revealed');
        io.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -52px 0px'
  });

  targets.forEach(function (el) { io.observe(el); });
})();

const menuToggle = document.querySelector('.menu-toggle');
const navOffcanvas = document.querySelector('.nav-offcanvas');
const navClose = document.querySelector('.nav-offcanvas__close');

if (menuToggle && navOffcanvas && navClose) {
  function openMenu() {
    menuToggle.classList.add('is-open');
    navOffcanvas.classList.add('is-open');
    menuToggle.setAttribute('aria-expanded', true);
    navOffcanvas.setAttribute('aria-hidden', false);
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    menuToggle.classList.remove('is-open');
    navOffcanvas.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', false);
    navOffcanvas.setAttribute('aria-hidden', true);
    document.body.style.overflow = '';
  }

  menuToggle.addEventListener('click', () => {
    const isOpen = menuToggle.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  });

  navClose.addEventListener('click', closeMenu);

  // Cerrar menú al hacer clic en un enlace
  navOffcanvas.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Cerrar con Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navOffcanvas.classList.contains('is-open')) {
      closeMenu();
    }
  });
}
