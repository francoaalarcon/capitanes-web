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
