// header
const header = document.querySelector('.header');
const menuToggle = document.querySelector('.menu-toggle');
const mobileMenu = document.querySelector('.mobile-menu');
mobileMenu.inert = true;

if (header && menuToggle && mobileMenu) {
    function setMenuOpen(open) {
        header.classList.toggle('is-open', open);
        function setMenuOpen(isOpen) {
            header.classList.toggle("is-open", isOpen);

            menuToggle.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Закрыть меню" : "Открыть меню"
            );

            mobileMenu.inert = !isOpen;
        }
        menuToggle.setAttribute('aria-expanded', String(open));
        menuToggle.setAttribute('aria-label', open ? 'Закрыть меню' : 'Открыть меню');
    }

    menuToggle.addEventListener('click', () => {
        setMenuOpen(menuToggle.getAttribute('aria-expanded') !== 'true');
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => setMenuOpen(false));
    });

    document.addEventListener('keydown', event => {
        if (event.key === 'Escape') setMenuOpen(false);
    });

    document.addEventListener('click', event => {
        if (!header.contains(event.target)) setMenuOpen(false);
    });
}
