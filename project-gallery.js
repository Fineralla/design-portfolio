
document.addEventListener('DOMContentLoaded', () => {
  const galleryButtons = [
    ...document.querySelectorAll('.case-results__zoom')
  ];

  const lightbox = document.querySelector('.project-lightbox');

  if (!lightbox || galleryButtons.length === 0) return;

  const lightboxImage = lightbox.querySelector(
    '.project-lightbox__image'
  );

  const closeButton = lightbox.querySelector(
    '.project-lightbox__close'
  );

  const prevButton = lightbox.querySelector(
    '.project-lightbox__prev'
  );

  const nextButton = lightbox.querySelector(
    '.project-lightbox__next'
  );

  const counter = lightbox.querySelector(
    '.project-lightbox__counter'
  );

  let currentIndex = 0;

  
function showImage(index, direction = null) {
  currentIndex =
    (index + galleryButtons.length) % galleryButtons.length;

  const original = galleryButtons[currentIndex]
    .querySelector('img');

  // Сбрасываем увеличение
  lightboxImage.classList.remove('is-zoomed');

  // Убираем предыдущие классы анимации
  lightboxImage.classList.remove(
    'slide-next',
    'slide-prev'
  );

  // Загружаем новое изображение
  lightboxImage.src =
    original.dataset.full || original.src;

  lightboxImage.alt = original.alt;

  counter.textContent =
    `${currentIndex + 1} / ${galleryButtons.length}`;

  // Запускаем анимацию заново
  if (direction) {
    void lightboxImage.offsetWidth;

    lightboxImage.classList.add(
      direction === 'next'
        ? 'slide-next'
        : 'slide-prev'
    );
  }
}

  galleryButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      showImage(index);
      lightbox.showModal();
    });
  });

  nextButton.addEventListener('click', () => {
  showImage(currentIndex + 1, 'next');
});

  prevButton.addEventListener('click', () => {
  showImage(currentIndex - 1, 'prev');
});

  closeButton.addEventListener('click', () => {
    lightbox.close();
  });

  // Дополнительное увеличение по клику
  lightboxImage.addEventListener('click', () => {
    lightboxImage.classList.toggle('is-zoomed');
  });

  // Стрелки клавиатуры
document.addEventListener('keydown', (event) => {
  if (!lightbox.open) return;

  if (event.key === 'ArrowRight') {
    event.preventDefault();
    showImage(currentIndex + 1, 'next');
  }

  if (event.key === 'ArrowLeft') {
    event.preventDefault();
    showImage(currentIndex - 1, 'prev');
  }
});

  // Закрытие при клике вне окна
  lightbox.addEventListener('click', (event) => {
    if (event.target === lightbox) {
      lightbox.close();
    }
  });
});
