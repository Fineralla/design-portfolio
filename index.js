const header = document.querySelector('.header');
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');

if (header && menuToggle && mobileMenu) {

  // Открытие и закрытие меню
  function setMenuOpen(isOpen) {
    header.classList.toggle('is-open', isOpen);

    menuToggle.setAttribute(
      'aria-expanded',
      String(isOpen)
    );

    menuToggle.setAttribute(
      'aria-label',
      isOpen ? 'Закрыть меню' : 'Открыть меню'
    );

    // Разрешаем взаимодействие только с открытым меню
    mobileMenu.inert = !isOpen;
  }

  // Начальное состояние
  setMenuOpen(false);

  // Клик по бургеру
  menuToggle.addEventListener('click', () => {
    const isOpen = header.classList.contains('is-open');
    setMenuOpen(!isOpen);
  });

  // Клик по ссылкам навигации
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      setMenuOpen(false);
    });
  });

  // Закрытие по Escape
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      setMenuOpen(false);
    }
  });

  // Закрытие при клике вне меню
  document.addEventListener('click', event => {
    if (!header.contains(event.target)) {
      setMenuOpen(false);
    }
  });
}
