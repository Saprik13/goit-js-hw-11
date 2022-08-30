(() => {
  const mobileMenu = document.querySelector("[mobile-menu]");
  const openMenuBtn = document.querySelector("[open-menu]");
  const closeMenuBtn = document.querySelector("[close-menu]");
  const closeLinkFirst = document.querySelector("[close-link-first]");
  const closeLinkSecond = document.querySelector("[close-link-second]");
  const closeLinkThird = document.querySelector("[close-link-third]");
  const closeLinkFourth = document.querySelector("[close-link-fourth]");
  const closeLinkFifth = document.querySelector("[close-link-fifth]");

  const toggleMenu = () => {
    const isMenuOpen =
      openMenuBtn.getAttribute('aria-expanded') === 'true' || false;
    openMenuBtn.setAttribute('aria-expanded', !isMenuOpen);
    mobileMenu.classList.toggle('is-open');
    document.body.classList.toggle ('overflow--is-hidden')
  };

  openMenuBtn.addEventListener('click', toggleMenu);
  closeMenuBtn.addEventListener('click', toggleMenu);
  closeLinkFirst.addEventListener('click', toggleMenu);
  closeLinkSecond.addEventListener('click', toggleMenu);
  closeLinkThird.addEventListener('click', toggleMenu);
  closeLinkFourth.addEventListener('click', toggleMenu);
  closeLinkFifth.addEventListener('click', toggleMenu);

  // Закрываем мобильное меню на более широких экранах
  // в случае изменения ориентации устройства.
  window.matchMedia('(min-width: 1280px)').addEventListener('change', e => {
    if (!e.matches) return;
    mobileMenu.classList.remove('is-open');
    openMenuBtn.setAttribute('aria-expanded', false);
    bodyScrollLock.enableBodyScroll(document.body);
  });
})();

