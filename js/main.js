document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navOffcanvas = document.querySelector('.nav-offcanvas');
  const navClose = document.querySelector('.nav-offcanvas__close');

  if (!menuToggle || !navOffcanvas || !navClose) return;

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
});
