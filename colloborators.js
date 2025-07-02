document.addEventListener("DOMContentLoaded", function() {
  const themeSwitch = document.getElementById('theme-switch');
  themeSwitch.addEventListener('click', function() {
    document.body.classList.toggle('dark-theme');
    document.body.classList.toggle('light-theme');
  });

  const carousel = document.getElementById('collab-carousel');
  const cards = carousel.querySelectorAll('.collab-card');
  const dotsContainer = document.querySelector('.carousel-dots');
  const leftBtn = document.getElementById('carousel-left');
  const rightBtn = document.getElementById('carousel-right');
  let index = 0;
  let interval;

  function renderDots() {
    dotsContainer.innerHTML = '';
    cards.forEach((_, i) => {
      const dot = document.createElement('span');
      dot.className = 'carousel-dot' + (i === index ? ' active' : '');
      dot.addEventListener('click', () => {
        index = i;
        updateCarousel();
        resetInterval();
      });
      dotsContainer.appendChild(dot);
    });
  }

  function updateCarousel() {
    const cardWidth = cards[0].offsetWidth + 32;
    carousel.style.transition = 'transform 0.6s cubic-bezier(.77,0,.18,1)';
    carousel.style.transform = `translateX(-${index * cardWidth}px)`;
    renderDots();
  }

  function moveCarousel() {
    index = (index + 1) % cards.length;
    updateCarousel();
  }

  function resetInterval() {
    clearInterval(interval);
    interval = setInterval(moveCarousel, 2200);
  }

  leftBtn.addEventListener('click', () => {
    index = (index - 1 + cards.length) % cards.length;
    updateCarousel();
    resetInterval();
  });

  rightBtn.addEventListener('click', () => {
    index = (index + 1) % cards.length;
    updateCarousel();
    resetInterval();
  });

  renderDots();
  updateCarousel();
  interval = setInterval(moveCarousel, 2200);

  carousel.addEventListener('mouseenter', () => clearInterval(interval));
  carousel.addEventListener('mouseleave', resetInterval);

  window.addEventListener('resize', updateCarousel);
});
